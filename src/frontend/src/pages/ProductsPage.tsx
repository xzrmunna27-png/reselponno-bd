import { CategoryFilter, type Product } from "@/backend";
import {
  usePlaceOrder,
  useProducts,
  useSearchProducts,
} from "@/hooks/useQueries";
import type { ResellerSession } from "@/types";
import { useCallback, useState } from "react";

const CATEGORY_TABS = [
  { id: CategoryFilter.all, label: "সব" },
  { id: CategoryFilter.fashion, label: "ফ্যাশন" },
  { id: CategoryFilter.electronics, label: "ইলেকট্রনিক্স" },
];

const STATUS_MAP: Record<string, string> = {
  fashion: "ফ্যাশন",
  electronics: "ইলেকট্রনিক্স",
};

interface Props {
  reseller: ResellerSession | null;
}

export function ProductsPage({ reseller }: Props) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<CategoryFilter>(CategoryFilter.all);
  const [selected, setSelected] = useState<Product | null>(null);

  const { data: allProducts = [], isLoading: loadingAll } =
    useProducts(category);
  const { data: searchResults = [], isLoading: loadingSearch } =
    useSearchProducts(search);

  const products = search.trim().length > 0 ? searchResults : allProducts;
  const isLoading = search.trim().length > 0 ? loadingSearch : loadingAll;

  return (
    <div
      className="flex flex-col h-full bg-background"
      data-ocid="products.page"
    >
      {/* Search bar */}
      <div className="sticky top-0 z-10 bg-card px-3 pt-3 pb-2 border-b border-border shadow-subtle">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base">
            🔍
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="প্রডাক্ট খুঁজুন..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-border bg-background text-foreground text-sm font-bengali"
            data-ocid="products.search_input"
          />
        </div>
        {/* Category tabs */}
        <div className="flex gap-2 mt-2">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setCategory(tab.id);
                setSearch("");
              }}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold font-bengali transition-smooth ${
                category === tab.id
                  ? "bg-primary text-primary-foreground shadow-card"
                  : "bg-muted text-muted-foreground"
              }`}
              data-ocid={`products.category_tab.${tab.id}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product grid */}
      <div className="flex-1 overflow-y-auto px-3 py-3">
        {isLoading && (
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={`skel-${n}`}
                className="bg-card rounded-xl p-3 animate-pulse h-44"
              />
            ))}
          </div>
        )}
        {!isLoading && products.length === 0 && (
          <div
            className="flex flex-col items-center justify-center py-16 text-center"
            data-ocid="products.empty_state"
          >
            <span className="text-5xl mb-3">📦</span>
            <p className="text-foreground font-bold font-bengali text-base">
              কোনো প্রডাক্ট পাওয়া যায়নি
            </p>
            <p className="text-muted-foreground text-sm font-bengali mt-1">
              অন্য কিছু খুঁজে দেখুন
            </p>
          </div>
        )}
        {!isLoading && products.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {products.map((product, idx) => (
              <ProductCard
                key={`product-${product.id}`}
                product={product}
                index={idx + 1}
                onSelect={setSelected}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product detail modal */}
      {selected && (
        <ProductModal
          product={selected}
          reseller={reseller}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}

function ProductCard({
  product,
  index,
  onSelect,
}: {
  product: Product;
  index: number;
  onSelect: (p: Product) => void;
}) {
  const catLabel = STATUS_MAP[product.category] ?? product.category;
  return (
    <button
      type="button"
      onClick={() => onSelect(product)}
      className="bg-card rounded-xl shadow-card p-3 flex flex-col items-start gap-1.5 text-left hover:shadow-elevated transition-smooth active:scale-98 w-full"
      data-ocid={`products.item.${index}`}
    >
      <div className="w-full flex justify-center py-2 bg-muted rounded-lg">
        <span className="text-4xl">{product.imageEmoji}</span>
      </div>
      <span className="text-xs font-semibold text-primary font-bengali bg-primary/10 px-2 py-0.5 rounded-full">
        {catLabel}
      </span>
      <p className="text-foreground font-bold text-sm font-bengali line-clamp-2 min-w-0">
        {product.name}
      </p>
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground line-through text-xs">
          ৳{product.originalPrice.toString()}
        </span>
        <span className="text-primary font-bold text-sm">
          ৳{product.resellerPrice.toString()}
        </span>
      </div>
      {product.sizes.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {product.sizes.slice(0, 3).map((s) => (
            <span
              key={`size-${s}`}
              className="text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded"
            >
              {s}
            </span>
          ))}
        </div>
      )}
      <div className="w-full py-1.5 mt-1 rounded-lg bg-primary text-primary-foreground text-xs font-bold text-center font-bengali">
        অর্ডার করুন
      </div>
    </button>
  );
}

function ProductModal({
  product,
  reseller,
  onClose,
}: {
  product: Product;
  reseller: ResellerSession | null;
  onClose: () => void;
}) {
  const [size, setSize] = useState(product.sizes[0] ?? "");
  const [qty, setQty] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [location, setLocation] = useState("");
  const [success, setSuccess] = useState(false);
  const { mutate: placeOrder, isPending } = usePlaceOrder();

  const handleOrder = useCallback(() => {
    if (!reseller) return;
    placeOrder(
      {
        customerName,
        customerPhone,
        customerAddress,
        location,
        productId: product.id,
        size,
        quantity: BigInt(qty),
        resellerId: reseller.id,
      },
      { onSuccess: () => setSuccess(true) },
    );
  }, [
    reseller,
    customerName,
    customerPhone,
    customerAddress,
    location,
    product.id,
    size,
    qty,
    placeOrder,
  ]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div
        className="bg-card w-full rounded-t-2xl shadow-elevated"
        style={{ maxWidth: "480px", maxHeight: "90vh", overflowY: "auto" }}
        data-ocid="products.dialog"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <h2 className="text-foreground font-bold text-base font-bengali">
            {product.name}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground text-xl leading-none"
            data-ocid="products.close_button"
          >
            ✕
          </button>
        </div>

        {success ? (
          <div
            className="flex flex-col items-center py-10 px-4"
            data-ocid="products.success_state"
          >
            <span className="text-5xl mb-3">✅</span>
            <p className="text-foreground font-bold font-bengali text-lg">
              অর্ডার সফল হয়েছে!
            </p>
            <p className="text-muted-foreground text-sm font-bengali mt-1">
              আপনার অর্ডার গ্রহণ করা হয়েছে।
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 px-8 py-2 bg-primary text-primary-foreground rounded-xl font-bold font-bengali"
            >
              ঠিক আছে
            </button>
          </div>
        ) : (
          <div className="px-4 pb-6 flex flex-col gap-3">
            {/* Product info */}
            <div className="flex items-center gap-3 bg-muted rounded-xl p-3">
              <span className="text-4xl">{product.imageEmoji}</span>
              <div>
                <p className="text-muted-foreground text-xs line-through">
                  পূর্বমূল্য: ৳{product.originalPrice.toString()}
                </p>
                <p className="text-primary font-bold text-lg">
                  ৳{product.resellerPrice.toString()}
                </p>
                <p className="text-muted-foreground text-xs font-bengali">
                  {product.description}
                </p>
              </div>
            </div>

            {/* Size selector */}
            {product.sizes.length > 0 && (
              <div>
                <p className="text-foreground font-semibold text-sm font-bengali mb-1">
                  সাইজ বেছে নিন
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={`sizeopt-${s}`}
                      type="button"
                      onClick={() => setSize(s)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-smooth ${
                        size === s
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                      data-ocid={`products.size_button.${s}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity stepper */}
            <div className="flex items-center gap-3">
              <p className="text-foreground font-semibold text-sm font-bengali">
                পরিমাণ
              </p>
              <div className="flex items-center gap-2 bg-muted rounded-lg px-2 py-1">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-7 h-7 flex items-center justify-center rounded-lg bg-background text-foreground font-bold text-base"
                  data-ocid="products.qty_minus"
                >
                  −
                </button>
                <span className="text-foreground font-bold text-base w-6 text-center">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  className="w-7 h-7 flex items-center justify-center rounded-lg bg-background text-foreground font-bold text-base"
                  data-ocid="products.qty_plus"
                >
                  +
                </button>
              </div>
            </div>

            {/* Order form */}
            <p className="text-foreground font-bold text-sm font-bengali mt-1">
              কাস্টমারের তথ্য
            </p>
            <input
              type="text"
              placeholder="গ্রাহকের নাম *"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm font-bengali"
              data-ocid="products.customer_name_input"
            />
            <input
              type="tel"
              placeholder="মোবাইল নম্বর *"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm font-bengali"
              data-ocid="products.customer_phone_input"
            />
            <input
              type="text"
              placeholder="ঠিকানা *"
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm font-bengali"
              data-ocid="products.customer_address_input"
            />
            <input
              type="text"
              placeholder="এলাকা / জেলা *"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm font-bengali"
              data-ocid="products.customer_location_input"
            />

            <div className="flex items-center justify-between bg-muted rounded-xl px-3 py-2">
              <span className="text-foreground font-bold text-sm font-bengali">
                মোট মূল্য:
              </span>
              <span className="text-primary font-bold text-lg">
                ৳{(Number(product.resellerPrice) * qty).toLocaleString()}
              </span>
            </div>

            <button
              type="button"
              onClick={handleOrder}
              disabled={
                isPending ||
                !customerName ||
                !customerPhone ||
                !customerAddress ||
                !location ||
                !reseller
              }
              className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-bold font-bengali text-base disabled:opacity-50 transition-smooth"
              data-ocid="products.submit_button"
            >
              {isPending ? "অর্ডার দেওয়া হচ্ছে..." : "অর্ডার দিন ✅"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
