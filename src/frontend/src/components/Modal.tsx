import type { ModalState } from "@/types";
import { ArrowUpCircle, CheckCircle, Wallet, X } from "lucide-react";

interface ModalProps {
  modal: ModalState;
  onClose: () => void;
}

export function Modal({ modal, onClose }: ModalProps) {
  if (!modal.type) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50"
      onClick={onClose}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      role="presentation"
      data-ocid="modal.backdrop"
    >
      <dialog
        open
        className="bg-card w-full rounded-t-2xl p-5 shadow-elevated animate-in slide-in-from-bottom-4 duration-300 border-0 m-0"
        style={{ maxWidth: "480px" }}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        data-ocid="modal.dialog"
      >
        {/* Close handle */}
        <div className="flex justify-center mb-4">
          <div className="w-10 h-1 rounded-full bg-muted" />
        </div>

        {modal.type === "balance" && <BalanceModalContent onClose={onClose} />}
        {modal.type === "service" && (
          <ServiceModalContent
            name={modal.serviceName ?? ""}
            onClose={onClose}
          />
        )}
        {modal.type === "order" && <OrderModalContent onClose={onClose} />}
        {modal.type === "notice" && <NoticeModalContent onClose={onClose} />}
      </dialog>
    </div>
  );
}

function BalanceModalContent({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-foreground font-bold text-lg">আপনার ব্যালেন্স</h2>
        <button
          type="button"
          onClick={onClose}
          className="p-1"
          data-ocid="modal.close_button"
        >
          <X size={20} className="text-muted-foreground" />
        </button>
      </div>
      <div className="text-center py-6">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3"
          style={{ backgroundColor: "rgba(46,125,50,0.1)" }}
        >
          <Wallet size={28} style={{ color: "#2e7d32" }} />
        </div>
        <p className="text-muted-foreground text-sm mb-1">মোট ব্যালেন্স</p>
        <p className="text-foreground font-black text-3xl">৳ ০.০০</p>
      </div>
      <div className="flex gap-3">
        <button
          type="button"
          className="flex-1 py-3 rounded-xl text-white font-bold text-sm transition-smooth hover:opacity-90 active:scale-95"
          style={{ backgroundColor: "#2e7d32" }}
          data-ocid="balance.topup_button"
        >
          টপ আপ করুন
        </button>
        <button
          type="button"
          className="flex-1 py-3 rounded-xl font-bold text-sm border-2 transition-smooth hover:bg-muted active:scale-95"
          style={{ borderColor: "#2e7d32", color: "#2e7d32" }}
          data-ocid="balance.withdraw_button"
        >
          উত্তোলন
        </button>
      </div>
    </>
  );
}

function ServiceModalContent({
  name,
  onClose,
}: { name: string; onClose: () => void }) {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-foreground font-bold text-base">{name}</h2>
        <button
          type="button"
          onClick={onClose}
          className="p-1"
          data-ocid="modal.close_button"
        >
          <X size={20} className="text-muted-foreground" />
        </button>
      </div>
      <div className="text-center py-8">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: "rgba(46,125,50,0.12)" }}
        >
          <CheckCircle size={28} style={{ color: "#2e7d32" }} />
        </div>
        <p className="text-muted-foreground text-sm">এই সেবাটি শীঘ্রই আসছে</p>
        <p className="text-xs text-muted-foreground mt-1">Coming Soon</p>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="w-full py-3 rounded-xl text-white font-bold text-sm transition-smooth hover:opacity-90"
        style={{ backgroundColor: "#2e7d32" }}
        data-ocid="modal.confirm_button"
      >
        ঠিক আছে
      </button>
    </>
  );
}

function OrderModalContent({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-foreground font-bold text-lg">অর্ডার করুন</h2>
        <button
          type="button"
          onClick={onClose}
          className="p-1"
          data-ocid="modal.close_button"
        >
          <X size={20} className="text-muted-foreground" />
        </button>
      </div>
      <div
        className="rounded-xl p-4 mb-4"
        style={{ backgroundColor: "rgba(192,57,43,0.08)" }}
      >
        <p className="font-bold text-sm mb-1" style={{ color: "#c0392b" }}>
          ৫% ক্যাশব্যাক অফার
        </p>
        <p className="text-muted-foreground text-xs leading-relaxed">
          প্রতিটি অর্ডারে আপনি ইনস্ট্যান্ট ৫% ক্যাশব্যাক পাবেন। আজই অর্ডার করুন এবং সুবিধা উপভোগ
          করুন।
        </p>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="w-full py-3 rounded-xl text-white font-bold text-sm transition-smooth hover:opacity-90"
        style={{ backgroundColor: "#2e7d32" }}
        data-ocid="order.confirm_button"
      >
        অর্ডার নিশ্চিত করুন
      </button>
    </>
  );
}

function NoticeModalContent({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-foreground font-bold text-lg">গুরুত্বপূর্ণ নোটিশ</h2>
        <button
          type="button"
          onClick={onClose}
          className="p-1"
          data-ocid="modal.close_button"
        >
          <X size={20} className="text-muted-foreground" />
        </button>
      </div>
      <div className="space-y-3">
        <p className="text-sm font-semibold" style={{ color: "#2e7d32" }}>
          ⚡ নতুন ফিচার আপডেট
        </p>
        <p className="text-muted-foreground text-sm leading-relaxed">
          আমাদের প্ল্যাটফর্মে নতুন ফিচার যুক্ত হয়েছে। এখন থেকে প্রতিটি অর্ডারে আপনি
          স্বয়ংক্রিয়ভাবে ৫% ক্যাশব্যাক পাবেন।
        </p>
        <p className="text-muted-foreground text-sm leading-relaxed">
          ক্যাশব্যাক আপনার ওয়ালেটে যোগ হবে এবং পরবর্তী অর্ডারে ব্যবহার করতে পারবেন।
        </p>
        <p className="text-muted-foreground text-sm leading-relaxed">
          যেকোনো সমস্যায় আমাদের সাপোর্ট টিমের সাথে যোগাযোগ করুন।
        </p>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="w-full mt-5 py-3 rounded-xl text-white font-bold text-sm transition-smooth hover:opacity-90"
        style={{ backgroundColor: "#2e7d32" }}
        data-ocid="notice.confirm_button"
      >
        বুঝেছি
      </button>
    </>
  );
}
