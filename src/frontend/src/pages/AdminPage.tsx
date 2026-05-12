import { createActor } from "@/backend";
import {
  CategoryFilter,
  type JobNotice,
  type MobileRecharge,
  type Order,
  OrderStatus,
  type Product,
  ProductCategory,
  type Reseller,
  type backendInterface,
} from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Briefcase,
  LogOut,
  Package,
  ShoppingCart,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { ReselponnoLogo } from "./LandingPage";

const ADMIN_PW = "MUNNA12061";

type AdminTab = "products" | "orders" | "resellers" | "jobs";

interface AdminPageProps {
  onLogout: () => void;
}

export function AdminPage({ onLogout }: AdminPageProps) {
  const [tab, setTab] = useState<AdminTab>("products");
  const { actor, isFetching } = useActor(createActor);
  const qc = useQueryClient();

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["admin", "products"],
    queryFn: async () => (actor ? actor.getProducts(CategoryFilter.all) : []),
    enabled: !!actor && !isFetching,
  });

  const { data: orders = [] } = useQuery<Order[]>({
    queryKey: ["admin", "orders"],
    queryFn: async () => (actor ? actor.adminGetAllOrders(ADMIN_PW) : []),
    enabled: !!actor && !isFetching,
  });

  const { data: resellers = [] } = useQuery<Reseller[]>({
    queryKey: ["admin", "resellers"],
    queryFn: async () => (actor ? actor.adminGetAllResellers(ADMIN_PW) : []),
    enabled: !!actor && !isFetching,
  });

  const { data: jobs = [] } = useQuery<JobNotice[]>({
    queryKey: ["admin", "jobs"],
    queryFn: async () => (actor ? actor.getJobNotices() : []),
    enabled: !!actor && !isFetching,
  });

  const { data: recharges = [] } = useQuery<MobileRecharge[]>({
    queryKey: ["admin", "recharges"],
    queryFn: async () => (actor ? actor.adminGetAllRecharges(ADMIN_PW) : []),
    enabled: !!actor && !isFetching,
  });

  const updateOrderStatus = useMutation({
    mutationFn: async ({ id, status }: { id: bigint; status: OrderStatus }) =>
      actor?.adminUpdateOrderStatus(ADMIN_PW, id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "orders"] }),
  });

  const deleteProduct = useMutation({
    mutationFn: async (id: bigint) => actor?.adminDeleteProduct(ADMIN_PW, id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "products"] }),
  });

  const tabs: { id: AdminTab; label: string; Icon: typeof Package }[] = [
    { id: "products", label: "পণ্য", Icon: Package },
    { id: "orders", label: "অর্ডার", Icon: ShoppingCart },
    { id: "resellers", label: "রিসেলার", Icon: Users },
    { id: "jobs", label: "নিয়োগ", Icon: Briefcase },
  ];

  return (
    <div className="min-h-screen bg-muted" data-ocid="admin.page">
      <div
        className="mx-auto bg-background min-h-screen flex flex-col"
        style={{ maxWidth: 480 }}
      >
        {/* Admin Header */}
        <header
          className="flex items-center justify-between px-3 py-2.5 border-b border-border"
          style={{ backgroundColor: "#1b5e20" }}
        >
          <div className="flex items-center gap-2">
            <ReselponnoLogo size={28} />
            <span className="text-white font-bold text-xs">অ্যাডমিন প্যানেল</span>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="flex items-center gap-1 text-white/80 hover:text-white text-xs"
            data-ocid="admin.logout_button"
          >
            <LogOut size={14} />
            <span>লগআউট</span>
          </button>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 p-3">
          <StatCard label="পণ্য" value={products.length} color="#2e7d32" />
          <StatCard label="অর্ডার" value={orders.length} color="#c0392b" />
          <StatCard label="রিসেলার" value={resellers.length} color="#c0b86b" />
        </div>

        {/* Tab Nav */}
        <div className="flex border-b border-border bg-card">
          {tabs.map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2 text-xs font-semibold transition-smooth ${
                tab === id ? "border-b-2 text-primary" : "text-muted-foreground"
              }`}
              style={{
                borderBottomColor: tab === id ? "#2e7d32" : "transparent",
              }}
              data-ocid={`admin.${id}_tab`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-3">
          {tab === "products" && (
            <ProductsTab
              products={products}
              onDelete={(id) => deleteProduct.mutate(id)}
              qc={qc}
              actor={actor}
            />
          )}
          {tab === "orders" && (
            <OrdersTab
              orders={orders}
              onStatusChange={(id, status) =>
                updateOrderStatus.mutate({ id, status })
              }
            />
          )}
          {tab === "resellers" && <ResellersTab resellers={resellers} />}
          {tab === "jobs" && (
            <JobsTab jobs={jobs} recharges={recharges} actor={actor} qc={qc} />
          )}
        </main>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
}: { label: string; value: number; color: string }) {
  return (
    <div className="card-bordered p-3 rounded-xl text-center">
      <p className="font-black text-xl" style={{ color }}>
        {value}
      </p>
      <p className="text-muted-foreground text-xs">{label}</p>
    </div>
  );
}

function ProductsTab({
  products,
  onDelete,
  qc,
  actor,
}: {
  products: Product[];
  onDelete: (id: bigint) => void;
  qc: ReturnType<typeof useQueryClient>;
  actor: backendInterface | null;
}) {
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "fashion",
    originalPrice: "",
    resellerPrice: "",
    sizes: "",
    stock: "",
    description: "",
    imageEmoji: "👗",
  });

  const addProduct = useMutation({
    mutationFn: async () => {
      if (!actor) return;
      return actor.adminAddProduct(
        ADMIN_PW,
        form.name,
        form.category === "fashion"
          ? ProductCategory.fashion
          : ProductCategory.electronics,
        BigInt(form.originalPrice || 0),
        BigInt(form.resellerPrice || 0),
        form.sizes
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        BigInt(form.stock || 0),
        form.description,
        form.imageEmoji,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "products"] });
      setShowAdd(false);
      setForm({
        name: "",
        category: "fashion",
        originalPrice: "",
        resellerPrice: "",
        sizes: "",
        stock: "",
        description: "",
        imageEmoji: "👗",
      });
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-sm text-foreground">
          পণ্য ব্যবস্থাপনা ({products.length})
        </h3>
        <button
          type="button"
          onClick={() => setShowAdd(true)}
          className="btn-primary text-xs px-3 py-1.5 rounded-lg"
          data-ocid="admin.add_product_button"
        >
          + যোগ করুন
        </button>
      </div>

      {showAdd && (
        <div className="card-bordered p-3 rounded-xl mb-3">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-bold text-xs">নতুন পণ্য যোগ</h4>
            <button
              type="button"
              onClick={() => setShowAdd(false)}
              data-ocid="admin.close_add_product"
            >
              <X size={14} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input
              className="col-span-2 px-2 py-1.5 text-xs rounded border border-input"
              placeholder="পণ্যের নাম"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              data-ocid="admin.product_name_input"
            />
            <select
              className="px-2 py-1.5 text-xs rounded border border-input bg-background"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              data-ocid="admin.product_category_select"
            >
              <option value="fashion">ফ্যাশন</option>
              <option value="electronics">ইলেকট্রনিক্স</option>
            </select>
            <input
              className="px-2 py-1.5 text-xs rounded border border-input"
              placeholder="আইকন (ইমোজি)"
              value={form.imageEmoji}
              onChange={(e) => setForm({ ...form, imageEmoji: e.target.value })}
            />
            <input
              className="px-2 py-1.5 text-xs rounded border border-input"
              placeholder="আসল দাম (৳)"
              type="number"
              value={form.originalPrice}
              onChange={(e) =>
                setForm({ ...form, originalPrice: e.target.value })
              }
              data-ocid="admin.product_price_input"
            />
            <input
              className="px-2 py-1.5 text-xs rounded border border-input"
              placeholder="রিসেলার দাম (৳)"
              type="number"
              value={form.resellerPrice}
              onChange={(e) =>
                setForm({ ...form, resellerPrice: e.target.value })
              }
            />
            <input
              className="px-2 py-1.5 text-xs rounded border border-input"
              placeholder="স্টক"
              type="number"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
            />
            <input
              className="px-2 py-1.5 text-xs rounded border border-input"
              placeholder="সাইজ (S,M,L,XL)"
              value={form.sizes}
              onChange={(e) => setForm({ ...form, sizes: e.target.value })}
            />
            <textarea
              className="col-span-2 px-2 py-1.5 text-xs rounded border border-input resize-none"
              rows={2}
              placeholder="বিবরণ"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>
          <button
            type="button"
            onClick={() => addProduct.mutate()}
            className="btn-primary w-full mt-2 py-2 text-xs rounded-lg"
            data-ocid="admin.save_product_button"
          >
            সংরক্ষণ করুন
          </button>
        </div>
      )}

      <div className="space-y-2">
        {products.length === 0 && (
          <EmptyState text="কোনো পণ্য নেই" ocid="admin.products_empty_state" />
        )}
        {products.map((p, i) => (
          <div
            key={String(p.id)}
            className="card-bordered p-3 rounded-xl flex items-center gap-2"
            data-ocid={`admin.product.item.${i + 1}`}
          >
            <span className="text-2xl">{p.imageEmoji}</span>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-xs text-foreground truncate">
                {p.name}
              </p>
              <p className="text-muted-foreground" style={{ fontSize: 10 }}>
                ৳{String(p.resellerPrice)} · স্টক: {String(p.stock)}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onDelete(p.id)}
              className="badge-warning text-xs px-2 py-1 rounded"
              data-ocid={`admin.delete_product.${i + 1}`}
            >
              মুছুন
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrdersTab({
  orders,
  onStatusChange,
}: {
  orders: Order[];
  onStatusChange: (id: bigint, status: OrderStatus) => void;
}) {
  const statusLabels: Record<string, string> = {
    pending: "অপেক্ষমান",
    confirmed: "নিশ্চিত",
    shipped: "পাঠানো হয়েছে",
    delivered: "ডেলিভারি",
    cancelled: "বাতিল",
  };

  return (
    <div>
      <h3 className="font-bold text-sm text-foreground mb-3">
        অর্ডার ব্যবস্থাপনা ({orders.length})
      </h3>
      {orders.length === 0 && (
        <EmptyState text="কোনো অর্ডার নেই" ocid="admin.orders_empty_state" />
      )}
      <div className="space-y-2">
        {orders.map((o, i) => (
          <div
            key={String(o.id)}
            className="card-bordered p-3 rounded-xl"
            data-ocid={`admin.order.item.${i + 1}`}
          >
            <div className="flex justify-between items-start mb-1.5">
              <div>
                <p className="font-semibold text-xs text-foreground">
                  {o.customerName}
                </p>
                <p className="text-muted-foreground" style={{ fontSize: 10 }}>
                  {o.customerPhone} · {o.location}
                </p>
              </div>
              <span className="font-bold text-xs" style={{ color: "#2e7d32" }}>
                ৳{String(o.totalPrice)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <select
                className="flex-1 px-2 py-1 text-xs rounded border border-input bg-background"
                value={o.status}
                onChange={(e) =>
                  onStatusChange(o.id, e.target.value as OrderStatus)
                }
                data-ocid={`admin.order_status.${i + 1}`}
              >
                {Object.values(OrderStatus).map((s) => (
                  <option key={s} value={s}>
                    {statusLabels[s] || s}
                  </option>
                ))}
              </select>
              <span className="badge-success" style={{ fontSize: 9 }}>
                {statusLabels[o.status] || o.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResellersTab({ resellers }: { resellers: Reseller[] }) {
  return (
    <div>
      <h3 className="font-bold text-sm text-foreground mb-3">
        রিসেলার তালিকা ({resellers.length})
      </h3>
      {resellers.length === 0 && (
        <EmptyState text="কোনো রিসেলার নেই" ocid="admin.resellers_empty_state" />
      )}
      <div className="space-y-2">
        {resellers.map((r, i) => (
          <div
            key={String(r.id)}
            className="card-bordered p-3 rounded-xl"
            data-ocid={`admin.reseller.item.${i + 1}`}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: "#2e7d32" }}
              >
                {r.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-xs text-foreground truncate">
                  {r.name}
                </p>
                <p className="text-muted-foreground" style={{ fontSize: 10 }}>
                  {r.phone} · মোট অর্ডার: {String(r.totalOrders)}
                </p>
              </div>
              <span
                className={r.isActive ? "badge-success" : "badge-warning"}
                style={{ fontSize: 9 }}
              >
                {r.isActive ? "সক্রিয়" : "নিষ্ক্রিয়"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function JobsTab({
  jobs,
  recharges,
  actor,
  qc,
}: {
  jobs: JobNotice[];
  recharges: MobileRecharge[];
  actor: backendInterface | null;
  qc: ReturnType<typeof useQueryClient>;
}) {
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({
    title: "",
    company: "",
    description: "",
    deadline: "",
    salary: "",
    location: "",
  });

  const addJob = useMutation({
    mutationFn: async () => {
      if (!actor) return;
      return actor.adminAddJobNotice(
        ADMIN_PW,
        form.title,
        form.company,
        form.description,
        form.deadline,
        form.salary,
        form.location,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "jobs"] });
      setShowAdd(false);
    },
  });

  const deactivateJob = useMutation({
    mutationFn: async (id: bigint) =>
      actor?.adminDeactivateJobNotice(ADMIN_PW, id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "jobs"] }),
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-sm text-foreground">
          নিয়োগ বিজ্ঞপ্তি ({jobs.length})
        </h3>
        <button
          type="button"
          onClick={() => setShowAdd(!showAdd)}
          className="btn-primary text-xs px-3 py-1.5 rounded-lg"
          data-ocid="admin.add_job_button"
        >
          + যোগ
        </button>
      </div>

      {showAdd && (
        <div className="card-bordered p-3 rounded-xl mb-3">
          <div className="grid grid-cols-2 gap-2">
            <input
              className="col-span-2 px-2 py-1.5 text-xs rounded border border-input"
              placeholder="পদের নাম"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              data-ocid="admin.job_title_input"
            />
            <input
              className="px-2 py-1.5 text-xs rounded border border-input"
              placeholder="কোম্পানি"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
            />
            <input
              className="px-2 py-1.5 text-xs rounded border border-input"
              placeholder="বেতন"
              value={form.salary}
              onChange={(e) => setForm({ ...form, salary: e.target.value })}
            />
            <input
              className="px-2 py-1.5 text-xs rounded border border-input"
              placeholder="শেষ তারিখ"
              value={form.deadline}
              onChange={(e) => setForm({ ...form, deadline: e.target.value })}
            />
            <input
              className="px-2 py-1.5 text-xs rounded border border-input"
              placeholder="লোকেশন"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
            <textarea
              className="col-span-2 px-2 py-1.5 text-xs rounded border border-input resize-none"
              rows={2}
              placeholder="বিবরণ"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>
          <button
            type="button"
            onClick={() => addJob.mutate()}
            className="btn-primary w-full mt-2 py-1.5 text-xs rounded-lg"
            data-ocid="admin.save_job_button"
          >
            সংরক্ষণ
          </button>
        </div>
      )}

      <div className="space-y-2">
        {jobs.length === 0 && (
          <EmptyState text="কোনো বিজ্ঞপ্তি নেই" ocid="admin.jobs_empty_state" />
        )}
        {jobs.map((j, i) => (
          <div
            key={String(j.id)}
            className="card-bordered p-3 rounded-xl"
            data-ocid={`admin.job.item.${i + 1}`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0 pr-2">
                <p className="font-semibold text-xs text-foreground truncate">
                  {j.title}
                </p>
                <p className="text-muted-foreground" style={{ fontSize: 10 }}>
                  {j.company} · {j.location} · {j.salary}
                </p>
              </div>
              {j.isActive && (
                <button
                  type="button"
                  onClick={() => deactivateJob.mutate(j.id)}
                  className="badge-warning text-xs px-2 py-0.5 rounded"
                  data-ocid={`admin.deactivate_job.${i + 1}`}
                >
                  বন্ধ
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Recharges */}
      <div className="mt-5">
        <h3 className="font-bold text-sm text-foreground mb-3">
          রিচার্জ অনুরোধ ({recharges.length})
        </h3>
        {recharges.length === 0 && (
          <EmptyState
            text="কোনো রিচার্জ অনুরোধ নেই"
            ocid="admin.recharges_empty_state"
          />
        )}
        <div className="space-y-2">
          {recharges.map((r, i) => (
            <div
              key={String(r.id)}
              className="card-bordered p-3 rounded-xl flex items-center gap-2"
              data-ocid={`admin.recharge.item.${i + 1}`}
            >
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-xs text-foreground">
                  {r.phone}
                </p>
                <p className="text-muted-foreground" style={{ fontSize: 10 }}>
                  {r.operator} · ৳{String(r.amount)}
                </p>
              </div>
              <span
                className={
                  r.status === "completed" ? "badge-success" : "badge-warning"
                }
                style={{ fontSize: 9 }}
              >
                {r.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EmptyState({ text, ocid }: { text: string; ocid: string }) {
  return (
    <div
      className="text-center py-8 text-muted-foreground text-sm"
      data-ocid={ocid}
    >
      {text}
    </div>
  );
}
