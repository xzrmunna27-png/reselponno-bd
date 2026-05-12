import { CategoryFilter, OrderStatus } from "@/backend";
import { useOrdersByReseller, useProducts } from "@/hooks/useQueries";
import type { ResellerSession } from "@/types";

const STATUS_CONFIG: Record<
  string,
  { label: string; bg: string; text: string }
> = {
  [OrderStatus.pending]: { label: "অপেক্ষমান", bg: "#FFF9C4", text: "#7c5c00" },
  [OrderStatus.confirmed]: { label: "নিশ্চিত", bg: "#E3F2FD", text: "#0d47a1" },
  [OrderStatus.shipped]: { label: "শিপড", bg: "#E8F5E9", text: "#1b5e20" },
  [OrderStatus.delivered]: { label: "ডেলিভারড", bg: "#DCEDC8", text: "#33691e" },
  [OrderStatus.cancelled]: { label: "বাতিল", bg: "#FFEBEE", text: "#b71c1c" },
};

function formatDate(ts: bigint) {
  const ms = Number(ts) / 1_000_000;
  return new Date(ms).toLocaleDateString("bn-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

interface Props {
  reseller: ResellerSession | null;
}

export function OrdersPage({ reseller }: Props) {
  const { data: orders = [], isLoading } = useOrdersByReseller(
    reseller?.id ?? null,
  );
  const { data: products = [] } = useProducts(CategoryFilter.all);
  const productMap = new Map(products.map((p) => [String(p.id), p.name]));

  return (
    <div className="flex flex-col h-full bg-background" data-ocid="orders.page">
      <div className="px-3 pt-4 pb-2 bg-card border-b border-border">
        <h2 className="text-foreground font-bold text-base font-bengali">
          📋 আমার অর্ডার
        </h2>
        <p className="text-muted-foreground text-xs font-bengali">
          মোট {orders.length}টি অর্ডার
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-3">
        {isLoading && (
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((n) => (
              <div
                key={`skel-order-${n}`}
                className="bg-card rounded-xl p-3 animate-pulse h-24"
              />
            ))}
          </div>
        )}

        {!isLoading && orders.length === 0 && (
          <div
            className="flex flex-col items-center justify-center py-16 text-center"
            data-ocid="orders.empty_state"
          >
            <span className="text-5xl mb-3">📭</span>
            <p className="text-foreground font-bold font-bengali text-base">
              কোনো অর্ডার নেই
            </p>
            <p className="text-muted-foreground text-sm font-bengali mt-1">
              প্রডাক্ট পেজ থেকে অর্ডার করুন
            </p>
          </div>
        )}

        {!isLoading && orders.length > 0 && (
          <div className="flex flex-col gap-3">
            {orders.map((order, idx) => {
              const statusCfg =
                STATUS_CONFIG[order.status as string] ??
                STATUS_CONFIG[OrderStatus.pending];
              return (
                <div
                  key={`order-${order.id}`}
                  className="bg-card rounded-xl shadow-card p-3 flex flex-col gap-2"
                  data-ocid={`orders.item.${idx + 1}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-foreground font-bold text-sm font-bengali">
                      অর্ডার #{order.id.toString()}
                    </span>
                    <span
                      className="text-xs font-bold font-bengali px-2 py-1 rounded-full"
                      style={{
                        background: statusCfg.bg,
                        color: statusCfg.text,
                      }}
                    >
                      {statusCfg.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">📦</span>
                    <div className="min-w-0">
                      <p className="text-foreground text-sm font-semibold font-bengali truncate">
                        {productMap.get(String(order.productId)) ??
                          `প্রডাক্ট #${order.productId.toString()}`}
                      </p>
                      <p className="text-muted-foreground text-xs font-bengali">
                        গ্রাহক: {order.customerName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-border pt-2">
                    <span className="text-muted-foreground text-xs font-bengali">
                      {formatDate(order.createdAt)}
                    </span>
                    <span className="text-primary font-bold text-sm">
                      ৳{order.totalPrice.toString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
