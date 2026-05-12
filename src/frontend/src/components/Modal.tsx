import { createActor } from "@/backend";
import { RechargeOperator } from "@/backend";
import { CategoryFilter, type Product } from "@/backend";
import type { ModalState } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowUpCircle,
  BadgePercent,
  Briefcase,
  Building2,
  CreditCard,
  Gift,
  HeadphonesIcon,
  Info,
  Package,
  Phone,
  RotateCcw,
  Search,
  TrendingUp,
  Wallet,
  X,
} from "lucide-react";
import { useState } from "react";

interface ModalProps {
  modal: ModalState;
  onClose: () => void;
  resellerId: bigint | null;
}

export function Modal({ modal, onClose, resellerId }: ModalProps) {
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
        <div className="flex justify-center mb-4">
          <div className="w-10 h-1 rounded-full bg-muted" />
        </div>

        {modal.type === "balance" && (
          <BalanceModalContent onClose={onClose} resellerId={resellerId} />
        )}
        {modal.type === "service" && (
          <ServiceModalContent
            name={modal.serviceName ?? ""}
            onClose={onClose}
            resellerId={resellerId}
          />
        )}
        {modal.type === "order" && (
          <OrderModalContent onClose={onClose} resellerId={resellerId} />
        )}
        {modal.type === "notice" && <NoticeModalContent onClose={onClose} />}
        {modal.type === "resellerProducts" && (
          <ResellerProductsContent onClose={onClose} />
        )}
        {modal.type === "jobNotice" && <JobNoticeContent onClose={onClose} />}
        {modal.type === "recharge" && <RechargeContent onClose={onClose} />}
        {modal.type === "reseller" && <ResellerContent onClose={onClose} />}
      </dialog>
    </div>
  );
}

function BalanceModalContent({
  onClose,
  resellerId,
}: { onClose: () => void; resellerId: bigint | null }) {
  const { actor, isFetching } = useActor(createActor);
  const { data: balance } = useQuery({
    queryKey: ["balance", String(resellerId)],
    queryFn: async () =>
      actor && resellerId !== null
        ? actor.getResellerBalance(resellerId)
        : null,
    enabled: !!actor && !isFetching && resellerId !== null,
  });

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
        <p className="text-foreground font-black text-3xl">
          ৳ {balance ? String(balance.balance) : "০.০০"}
        </p>
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
  resellerId,
}: { name: string; onClose: () => void; resellerId: bigint | null }) {
  // Map service name to the correct modal content
  const isRecharge = name === "মোবাইল রিচার্জ";
  const isJob = name === "নিয়োগ বিজ্ঞপ্তি" || name === "জব লোকেশন";
  const isProducts =
    name === "রিসেলিং প্রডাক্ট" ||
    name === "প্রডাক্ট সার্চ" ||
    name === "ভেরিফাইড প্রডাক্ট" ||
    name === "নতুন প্রডাক্ট" ||
    name === "প্রডাক্ট বিক্রি করুন";
  const isOrder =
    name === "ডিজিটাল সেল" ||
    name === "অনলাইন শপিং" ||
    name === "ক্যাসব্যাক অর্ডার সেল";
  const isBalance = name === "ওয়ালেট";
  const isTopup = name === "টপ আপ";
  const isWithdraw = name === "উইথড্র";
  const isSupport = name === "সাপোর্ট";
  const isOffer = name === "অফার";
  const isRefer = name === "রেফার করুন";
  const isReturn = name === "রিটার্ন পলিসি";
  const isPayment = name === "পেমেন্ট পদ্ধতি";
  const isAbout = name === "আমাদের সম্পর্কে";

  if (isRecharge) return <RechargeContent onClose={onClose} />;
  if (isJob) return <JobNoticeContent onClose={onClose} />;
  if (isProducts) return <ResellerProductsContent onClose={onClose} />;
  if (isOrder)
    return <OrderModalContent onClose={onClose} resellerId={resellerId} />;
  if (isBalance || isTopup || isWithdraw)
    return <BalanceModalContent onClose={onClose} resellerId={resellerId} />;
  if (isSupport) return <SupportContent onClose={onClose} />;
  if (isOffer) return <OfferContent onClose={onClose} />;
  if (isRefer) return <ReferContent onClose={onClose} />;
  if (isReturn) return <ReturnPolicyContent onClose={onClose} />;
  if (isPayment) return <PaymentMethodContent onClose={onClose} />;
  if (isAbout) return <AboutContent onClose={onClose} />;

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
          <Package size={28} style={{ color: "#2e7d32" }} />
        </div>
        <p className="text-foreground font-semibold text-sm mb-1">{name}</p>
        <p className="text-muted-foreground text-xs">এই সেবাটি শীঘ্রই আসছে</p>
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

function SupportContent({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-foreground font-bold text-base">📞 সাপোর্ট</h2>
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
        <div className="flex items-center gap-3 p-3 rounded-xl border border-border">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "rgba(46,125,50,0.12)" }}
          >
            <HeadphonesIcon size={20} style={{ color: "#2e7d32" }} />
          </div>
          <div>
            <p className="text-foreground font-semibold text-sm">হেল্পলাইন</p>
            <p className="text-primary font-bold text-base">01700-123456</p>
            <p className="text-muted-foreground text-xs">সকাল ৯টা — রাত ১০টা</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-xl border border-border">
          <span className="text-2xl">💬</span>
          <div>
            <p className="text-foreground font-semibold text-sm">ফেসবুক পেজ</p>
            <p className="text-primary text-sm">facebook.com/ReselponnoHelp</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-xl border border-border">
          <span className="text-2xl">✉️</span>
          <div>
            <p className="text-foreground font-semibold text-sm">ইমেইল</p>
            <p className="text-primary text-sm">support@reselponnobd.com</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-xl border border-border">
          <span className="text-2xl">📲</span>
          <div>
            <p className="text-foreground font-semibold text-sm">টেলিগ্রাম গ্রুপ</p>
            <p className="text-primary text-sm">t.me/ReselponnoGroup</p>
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="w-full mt-4 py-3 rounded-xl text-white font-bold text-sm"
        style={{ backgroundColor: "#2e7d32" }}
        data-ocid="support.close_button"
      >
        বন্ধ করুন
      </button>
    </>
  );
}

function OfferContent({ onClose }: { onClose: () => void }) {
  const offers = [
    {
      emoji: "🎁",
      title: "স্বাগত বোনাস",
      desc: "নতুন রিসেলার নিবন্ধন করলে ৳১০০ বোনাস",
      badge: "নতুন",
    },
    {
      emoji: "💸",
      title: "ক্যাশব্যাক অফার",
      desc: "প্রতিটি অর্ডারে ৫% ক্যাশব্যাক ওয়ালেটে যোগ হবে",
      badge: "চলমান",
    },
    {
      emoji: "🏆",
      title: "রেফারেল বোনাস",
      desc: "প্রতি সফল রেফারেলে ৳৫০ পুরস্কার",
      badge: "চলমান",
    },
    {
      emoji: "🛍️",
      title: "বাল্ক ডিসকাউন্ট",
      desc: "১০+ পিস অর্ডারে ১০% ছাড়",
      badge: "সীমিত",
    },
    {
      emoji: "🌟",
      title: "মাসিক বোনাস",
      desc: "মাসে ৫০+ অর্ডারে ৳৫০০ বিশেষ পুরস্কার",
      badge: "এক্সক্লুসিভ",
    },
  ];
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-foreground font-bold text-base">🎯 সক্রিয় অফার</h2>
        <button
          type="button"
          onClick={onClose}
          className="p-1"
          data-ocid="modal.close_button"
        >
          <X size={20} className="text-muted-foreground" />
        </button>
      </div>
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {offers.map((o) => (
          <div
            key={o.title}
            className="flex items-start gap-3 p-3 rounded-xl border border-border"
          >
            <span className="text-2xl">{o.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-foreground font-semibold text-sm">
                  {o.title}
                </p>
                <span
                  className="text-xs px-1.5 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: "#2e7d32", fontSize: 10 }}
                >
                  {o.badge}
                </span>
              </div>
              <p className="text-muted-foreground text-xs mt-0.5">{o.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={onClose}
        className="w-full mt-4 py-3 rounded-xl text-white font-bold text-sm"
        style={{ backgroundColor: "#2e7d32" }}
        data-ocid="offer.close_button"
      >
        বন্ধ করুন
      </button>
    </>
  );
}

function ReferContent({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-foreground font-bold text-base">🤝 রেফার করুন</h2>
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
        <div
          className="p-4 rounded-xl text-center"
          style={{ backgroundColor: "rgba(46,125,50,0.08)" }}
        >
          <Gift
            size={32}
            className="mx-auto mb-2"
            style={{ color: "#2e7d32" }}
          />
          <p className="text-foreground font-bold text-sm">প্রতিটি রেফারেলে পান</p>
          <p className="font-black text-3xl" style={{ color: "#2e7d32" }}>
            ৳৫০
          </p>
          <p className="text-muted-foreground text-xs mt-1">
            রিসেলার অ্যাকাউন্ট সক্রিয় হলে বোনাস প্রদান হবে
          </p>
        </div>
        <div className="p-3 rounded-xl border border-border">
          <p className="text-foreground font-semibold text-xs mb-1">
            📋 রেফারেল প্রোগ্রামের নিয়ম
          </p>
          <ul className="text-muted-foreground text-xs space-y-1">
            <li>• বন্ধুকে Reselponno BD-তে রেজিস্ট্রেশন করান</li>
            <li>• তাদের প্রথম অর্ডার সম্পন্ন হলে বোনাস পাবেন</li>
            <li>• একাধিক রেফারেলে একাধিক বোনাস পাবেন</li>
            <li>• বোনাস ওয়ালেটে ২৪ ঘণ্টার মধ্যে যোগ হবে</li>
          </ul>
        </div>
        <div className="p-3 rounded-xl border border-border">
          <p className="text-foreground font-semibold text-xs mb-2">
            🔗 আপনার রেফারেল লিংক
          </p>
          <div className="flex items-center gap-2">
            <p className="flex-1 text-xs text-muted-foreground bg-muted px-2 py-1.5 rounded-lg truncate">
              reselponnobd.com/ref/USER123
            </p>
            <button
              type="button"
              className="text-xs font-bold px-2 py-1.5 rounded-lg text-white"
              style={{ backgroundColor: "#2e7d32" }}
              data-ocid="refer.copy_button"
            >
              কপি
            </button>
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="w-full mt-4 py-3 rounded-xl text-white font-bold text-sm"
        style={{ backgroundColor: "#2e7d32" }}
        data-ocid="refer.close_button"
      >
        বন্ধ করুন
      </button>
    </>
  );
}

function ReturnPolicyContent({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-foreground font-bold text-base">↩️ রিটার্ন পলিসি</h2>
        <button
          type="button"
          onClick={onClose}
          className="p-1"
          data-ocid="modal.close_button"
        >
          <X size={20} className="text-muted-foreground" />
        </button>
      </div>
      <div className="space-y-3 max-h-80 overflow-y-auto">
        <div
          className="flex items-center gap-2 p-3 rounded-xl"
          style={{ backgroundColor: "rgba(46,125,50,0.08)" }}
        >
          <RotateCcw size={18} style={{ color: "#2e7d32" }} />
          <p className="text-foreground font-semibold text-sm">
            ৭ দিনের রিটার্ন গ্যারান্টি
          </p>
        </div>
        {[
          {
            q: "কখন রিটার্ন করা যাবে?",
            a: "পণ্য পাওয়ার ৭ দিনের মধ্যে রিটার্ন অনুরোধ করতে হবে।",
          },
          {
            q: "কোন পণ্য রিটার্ন যোগ্য?",
            a: "ত্রুটিপূর্ণ, ভুল বা ক্ষতিগ্রস্ত পণ্য রিটার্ন করা যাবে। ব্যবহৃত পণ্য রিটার্ন হবে না।",
          },
          {
            q: "রিটার্ন কিভাবে করবেন?",
            a: "সাপোর্টে যোগাযোগ করুন। অর্ডার নম্বর ও ছবি পাঠান। ডেলিভারি ম্যান পণ্য নিয়ে যাবেন।",
          },
          {
            q: "রিফান্ড কতদিনে পাবেন?",
            a: "রিটার্ন গ্রহণের ৩-৫ কার্যদিবসের মধ্যে ওয়ালেটে ফেরত আসবে।",
          },
        ].map((item) => (
          <div key={item.q} className="p-3 rounded-xl border border-border">
            <p className="text-foreground font-semibold text-xs mb-1">
              ❓ {item.q}
            </p>
            <p className="text-muted-foreground text-xs leading-relaxed">
              {item.a}
            </p>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={onClose}
        className="w-full mt-4 py-3 rounded-xl text-white font-bold text-sm"
        style={{ backgroundColor: "#2e7d32" }}
        data-ocid="returnpolicy.close_button"
      >
        বুঝেছি
      </button>
    </>
  );
}

function PaymentMethodContent({ onClose }: { onClose: () => void }) {
  const methods = [
    { emoji: "📱", name: "বিকাশ", number: "01700-123456", type: "মোবাইল ব্যাংকিং" },
    { emoji: "💜", name: "নগদ", number: "01800-123456", type: "মোবাইল ব্যাংকিং" },
    { emoji: "🟠", name: "রকেট", number: "01900-123456", type: "মোবাইল ব্যাংকিং" },
    {
      emoji: "🏦",
      name: "ডাচ-বাংলা ব্যাংক",
      number: "Acc: 2181234567890",
      type: "ব্যাংক ট্রান্সফার",
    },
    {
      emoji: "💳",
      name: "ইসলামী ব্যাংক",
      number: "Acc: 2051234567890",
      type: "ব্যাংক ট্রান্সফার",
    },
  ];
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-foreground font-bold text-base">💳 পেমেন্ট পদ্ধতি</h2>
        <button
          type="button"
          onClick={onClose}
          className="p-1"
          data-ocid="modal.close_button"
        >
          <X size={20} className="text-muted-foreground" />
        </button>
      </div>
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {methods.map((m) => (
          <div
            key={m.name}
            className="flex items-center gap-3 p-3 rounded-xl border border-border"
          >
            <span className="text-2xl">{m.emoji}</span>
            <div className="flex-1">
              <p className="text-foreground font-semibold text-sm">{m.name}</p>
              <p className="text-primary text-xs font-mono">{m.number}</p>
              <p className="text-muted-foreground" style={{ fontSize: 10 }}>
                {m.type}
              </p>
            </div>
            <CreditCard size={16} className="text-muted-foreground" />
          </div>
        ))}
        <div
          className="p-3 rounded-xl"
          style={{ backgroundColor: "rgba(46,125,50,0.08)" }}
        >
          <p className="text-foreground font-semibold text-xs mb-1">
            ⚠️ গুরুত্বপূর্ণ নোট
          </p>
          <p className="text-muted-foreground text-xs">
            পেমেন্টের পর স্ক্রিনশট সাপোর্টে পাঠান। যাচাইয়ের পর ওয়ালেটে যোগ হবে।
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="w-full mt-4 py-3 rounded-xl text-white font-bold text-sm"
        style={{ backgroundColor: "#2e7d32" }}
        data-ocid="payment.close_button"
      >
        বন্ধ করুন
      </button>
    </>
  );
}

function AboutContent({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-foreground font-bold text-base">ℹ️ আমাদের সম্পর্কে</h2>
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
        <div
          className="text-center p-4 rounded-xl"
          style={{ backgroundColor: "rgba(46,125,50,0.08)" }}
        >
          <Building2
            size={36}
            className="mx-auto mb-2"
            style={{ color: "#2e7d32" }}
          />
          <p className="text-foreground font-black text-lg">Reselponno BD</p>
          <p className="text-muted-foreground text-xs mt-1">
            বাংলাদেশের সেরা রিসেলিং প্ল্যাটফর্ম
          </p>
        </div>
        <div className="p-3 rounded-xl border border-border space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">প্রতিষ্ঠা</span>
            <span className="text-foreground font-semibold">২০২৪ সাল</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">মোট রিসেলার</span>
            <span className="text-foreground font-semibold">৫,০০০+ জন</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">সফল অর্ডার</span>
            <span className="text-foreground font-semibold">৫০,০০০+</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">সদর দপ্তর</span>
            <span className="text-foreground font-semibold">ঢাকা, বাংলাদেশ</span>
          </div>
        </div>
        <div className="p-3 rounded-xl border border-border">
          <p className="text-foreground font-semibold text-xs mb-1">
            🎯 আমাদের লক্ষ্য
          </p>
          <p className="text-muted-foreground text-xs leading-relaxed">
            বাংলাদেশের প্রতিটি রিসেলারকে সহজ ও লাভজনক ব্যবসার সুযোগ দেওয়া। আমরা বিশ্বাসযোগ্য
            পণ্য, দ্রুত ডেলিভারি এবং সর্বোত্তম সাপোর্ট নিশ্চিত করি।
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="w-full mt-4 py-3 rounded-xl text-white font-bold text-sm"
        style={{ backgroundColor: "#2e7d32" }}
        data-ocid="about.close_button"
      >
        বন্ধ করুন
      </button>
    </>
  );
}

function OrderModalContent({
  onClose,
  resellerId,
}: { onClose: () => void; resellerId: bigint | null }) {
  const { actor, isFetching } = useActor(createActor);
  const qc = useQueryClient();
  const [form, setForm] = useState({
    customerName: "",
    customerPhone: "",
    customerAddress: "",
    location: "",
    size: "",
    qty: "1",
  });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [success, setSuccess] = useState(false);

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["products", "all"],
    queryFn: async () => (actor ? actor.getProducts(CategoryFilter.all) : []),
    enabled: !!actor && !isFetching,
  });

  const placeOrder = useMutation({
    mutationFn: async () => {
      if (!actor || !selectedProduct || resellerId === null) return;
      return actor.placeOrder(
        form.customerName,
        form.customerPhone,
        form.customerAddress,
        form.location,
        selectedProduct.id,
        form.size,
        BigInt(form.qty),
        resellerId,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["orders"] });
      setSuccess(true);
    },
  });

  if (success)
    return (
      <>
        <div className="text-center py-6">
          <div className="text-4xl mb-3">✅</div>
          <h2 className="font-bold text-lg text-foreground">অর্ডার সফলহয়েছে!</h2>
          <p className="text-muted-foreground text-sm mt-1">
            আপনার অর্ডার গ্রহণ করা হয়েছে
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-full py-3 rounded-xl text-white font-bold text-sm"
          style={{ backgroundColor: "#2e7d32" }}
          data-ocid="order.success_state"
        >
          ঠিক আছে
        </button>
      </>
    );

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
      <div className="space-y-3 max-h-80 overflow-y-auto">
        <div>
          <label
            htmlFor="order-product"
            className="text-xs font-semibold text-foreground"
          >
            পণ্য বেছুন
          </label>
          <select
            id="order-product"
            className="w-full mt-1 px-2 py-2 text-sm rounded-lg border border-input bg-background"
            onChange={(e) => {
              const p = products.find((x) => String(x.id) === e.target.value);
              setSelectedProduct(p ?? null);
            }}
            data-ocid="order.product_select"
          >
            <option value="">পণ্য বেছুন...</option>
            {products.map((p) => (
              <option key={String(p.id)} value={String(p.id)}>
                {p.imageEmoji} {p.name} — ৳{String(p.resellerPrice)}
              </option>
            ))}
          </select>
        </div>
        {selectedProduct && selectedProduct.sizes.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-foreground mb-1">সাইজ</p>
            <div className="flex gap-2 mt-1 flex-wrap">
              {selectedProduct.sizes.map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => setForm({ ...form, size: s })}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-smooth ${form.size === s ? "border-primary text-primary" : "border-border text-muted-foreground"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        <input
          className="w-full px-3 py-2 text-sm rounded-lg border border-input bg-background"
          placeholder="গ্রাহকের নাম"
          value={form.customerName}
          onChange={(e) => setForm({ ...form, customerName: e.target.value })}
          data-ocid="order.customer_name_input"
        />
        <input
          className="w-full px-3 py-2 text-sm rounded-lg border border-input bg-background"
          placeholder="ফোন নম্বর"
          type="tel"
          value={form.customerPhone}
          onChange={(e) => setForm({ ...form, customerPhone: e.target.value })}
          data-ocid="order.customer_phone_input"
        />
        <input
          className="w-full px-3 py-2 text-sm rounded-lg border border-input bg-background"
          placeholder="ঠিকানা"
          value={form.customerAddress}
          onChange={(e) =>
            setForm({ ...form, customerAddress: e.target.value })
          }
          data-ocid="order.address_input"
        />
        <input
          className="w-full px-3 py-2 text-sm rounded-lg border border-input bg-background"
          placeholder="লোকেশন (জেলা/থানা)"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          data-ocid="order.location_input"
        />
        <input
          className="w-full px-3 py-2 text-sm rounded-lg border border-input bg-background"
          placeholder="পরিমাণ"
          type="number"
          min="1"
          value={form.qty}
          onChange={(e) => setForm({ ...form, qty: e.target.value })}
          data-ocid="order.quantity_input"
        />
      </div>
      <button
        type="button"
        onClick={() => placeOrder.mutate()}
        disabled={
          !selectedProduct ||
          !form.customerName ||
          !form.customerPhone ||
          resellerId === null
        }
        className="w-full mt-4 py-3 rounded-xl text-white font-bold text-sm transition-smooth hover:opacity-90 disabled:opacity-50"
        style={{ backgroundColor: "#2e7d32" }}
        data-ocid="order.submit_button"
      >
        {placeOrder.isPending ? "প্রাক্রিয়া হচ্ছে..." : "অর্ডার দিন"}
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
        <p className="text-foreground text-sm leading-relaxed">
          আমাদের প্ল্যাটফর্মে নতুন ফিচার যুক্ত হয়েছে। এখন থেকে প্রতিটি অর্ডারে আপনি
          স্বয়ংক্রিয়ভাবে ৫% ক্যাশব্যাক পাবেন।
        </p>
        <p className="text-muted-foreground text-sm leading-relaxed">
          ক্যাশব্যাক আপনার ওয়ালেটে যোগ হবে এবং পরবর্তী অর্ডারে ব্যবহার করতে পারবেন।
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

function ResellerProductsContent({ onClose }: { onClose: () => void }) {
  const { actor, isFetching } = useActor(createActor);
  const [search, setSearch] = useState("");
  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["products", "all"],
    queryFn: async () => (actor ? actor.getProducts(CategoryFilter.all) : []),
    enabled: !!actor && !isFetching,
  });
  const { data: searched = [] } = useQuery<Product[]>({
    queryKey: ["products", "search", search],
    queryFn: async () =>
      actor && search.trim() ? actor.searchProducts(search) : products,
    enabled: !!actor && !isFetching,
  });
  const list = search.trim() ? searched : products;

  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-foreground font-bold text-base">রিসেলিং প্রোডাক্ট</h2>
        <button
          type="button"
          onClick={onClose}
          className="p-1"
          data-ocid="modal.close_button"
        >
          <X size={20} className="text-muted-foreground" />
        </button>
      </div>
      <div className="relative mb-3">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          className="w-full pl-8 pr-3 py-2 text-sm rounded-lg border border-input bg-background"
          placeholder="প্রোডাক্ট সার্চ করুন..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          data-ocid="products.search_input"
        />
      </div>
      <div
        className="space-y-2 max-h-80 overflow-y-auto"
        data-ocid="products.list"
      >
        {list.length === 0 && (
          <p
            className="text-center text-muted-foreground text-sm py-4"
            data-ocid="products.empty_state"
          >
            কোনো পণ্য পাওয়া যায়নি
          </p>
        )}
        {list.map((p, i) => (
          <div
            key={String(p.id)}
            className="flex items-center gap-3 p-2 rounded-lg border border-border"
            data-ocid={`products.item.${i + 1}`}
          >
            <span className="text-2xl">{p.imageEmoji}</span>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-xs text-foreground truncate">
                {p.name}
              </p>
              <p className="text-muted-foreground" style={{ fontSize: 10 }}>
                আসল: ৳{String(p.originalPrice)} | রিসেলার: ৳
                {String(p.resellerPrice)}
              </p>
              {p.sizes.length > 0 && (
                <p className="text-muted-foreground" style={{ fontSize: 10 }}>
                  সাইজ: {p.sizes.join(", ")}
                </p>
              )}
            </div>
            <span className="badge-success text-xs">
              স্টক: {String(p.stock)}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

function JobNoticeContent({ onClose }: { onClose: () => void }) {
  const { actor, isFetching } = useActor(createActor);
  const { data: jobs = [] } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => (actor ? actor.getJobNotices() : []),
    enabled: !!actor && !isFetching,
  });

  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-foreground font-bold text-base">নিয়োগ বিজ্ঞপ্তি</h2>
        <button
          type="button"
          onClick={onClose}
          className="p-1"
          data-ocid="modal.close_button"
        >
          <X size={20} className="text-muted-foreground" />
        </button>
      </div>
      <div className="space-y-2 max-h-80 overflow-y-auto" data-ocid="jobs.list">
        {jobs.length === 0 && (
          <div className="text-center py-6" data-ocid="jobs.empty_state">
            <Briefcase
              size={32}
              className="mx-auto mb-2 text-muted-foreground"
            />
            <p className="text-muted-foreground text-sm">
              এখনো কোনো নিয়োগ বিজ্ঞপ্তি নেই
            </p>
          </div>
        )}
        {jobs
          .filter((j) => j.isActive)
          .map((j, i) => (
            <div
              key={String(j.id)}
              className="p-3 rounded-xl border border-border"
              data-ocid={`jobs.item.${i + 1}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-xs text-foreground">
                    {j.title}
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: 10 }}>
                    {j.company} — {j.location}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "#2e7d32" }}>
                    বেতন: {j.salary}
                  </p>
                </div>
                <span className="badge-warning" style={{ fontSize: 9 }}>
                  শেষ তা: {j.deadline}
                </span>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

function RechargeContent({ onClose }: { onClose: () => void }) {
  const { actor, isFetching } = useActor(createActor);
  const [phone, setPhone] = useState("");
  const [operator, setOperator] = useState<RechargeOperator>(
    RechargeOperator.grameenphone,
  );
  const [amount, setAmount] = useState("");
  const [done, setDone] = useState(false);

  const submitRecharge = useMutation({
    mutationFn: async () => {
      if (!actor) return;
      return actor.submitRecharge(phone, operator, BigInt(amount));
    },
    onSuccess: () => setDone(true),
  });

  if (done)
    return (
      <>
        <div className="text-center py-6">
          <div className="text-4xl mb-3">✅</div>
          <h2 className="font-bold text-lg text-foreground">
            রিচার্জ অনুরোধ সফল!
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-full py-3 rounded-xl text-white font-bold text-sm"
          style={{ backgroundColor: "#2e7d32" }}
          data-ocid="recharge.success_state"
        >
          ঠিক আছে
        </button>
      </>
    );

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-foreground font-bold text-base">মোবাইল রিচার্জ</h2>
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
        <div>
          <label
            htmlFor="recharge-operator"
            className="text-xs font-semibold text-foreground"
          >
            অপারেটর
          </label>
          <select
            id="recharge-operator"
            className="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-input bg-background"
            value={operator}
            onChange={(e) => setOperator(e.target.value as RechargeOperator)}
            data-ocid="recharge.operator_select"
          >
            <option value={RechargeOperator.grameenphone}>গ্রামীণফোন</option>
            <option value={RechargeOperator.robi}>রবি</option>
            <option value={RechargeOperator.banglalink}>বাংলালিংক</option>
            <option value={RechargeOperator.airtel}>এয়ারটেল</option>
            <option value={RechargeOperator.teletalk}>টেলিটক</option>
          </select>
        </div>
        <div className="relative">
          <Phone
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            className="w-full pl-8 pr-3 py-2 text-sm rounded-lg border border-input bg-background"
            placeholder="01XXXXXXXXX"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            data-ocid="recharge.phone_input"
          />
        </div>
        <input
          className="w-full px-3 py-2 text-sm rounded-lg border border-input bg-background"
          placeholder="রিচার্জ পরিমাণ (৳)"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          data-ocid="recharge.amount_input"
        />
      </div>
      <button
        type="button"
        onClick={() => submitRecharge.mutate()}
        disabled={!phone || !amount || !actor || isFetching}
        className="w-full mt-4 py-3 rounded-xl text-white font-bold text-sm transition-smooth hover:opacity-90 disabled:opacity-50"
        style={{ backgroundColor: "#2e7d32" }}
        data-ocid="recharge.submit_button"
      >
        {submitRecharge.isPending ? "প্রাক্রিয়া হচ্ছে..." : "রিচার্জ করুন"}
      </button>
    </>
  );
}

function ResellerContent({ onClose }: { onClose: () => void }) {
  const { actor, isFetching } = useActor(createActor);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [done, setDone] = useState(false);

  const createReseller = useMutation({
    mutationFn: async () => {
      if (!actor) return;
      return actor.createResellerAccount(
        form.name,
        form.phone,
        form.email,
        form.address,
      );
    },
    onSuccess: () => setDone(true),
  });

  if (done)
    return (
      <>
        <div className="text-center py-6">
          <div className="text-4xl mb-3">🎉</div>
          <h2 className="font-bold text-lg text-foreground">
            রিসেলার অ্যাকাউন্ট তৈরি!
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-full py-3 rounded-xl text-white font-bold text-sm"
          style={{ backgroundColor: "#2e7d32" }}
          data-ocid="reseller.success_state"
        >
          ঠিক আছে
        </button>
      </>
    );

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-foreground font-bold text-base">রিসেলার অ্যাকাউন্ট</h2>
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
        <input
          className="w-full px-3 py-2 text-sm rounded-lg border border-input bg-background"
          placeholder="পূর্ণ নাম"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          data-ocid="reseller.name_input"
        />
        <input
          className="w-full px-3 py-2 text-sm rounded-lg border border-input bg-background"
          placeholder="ফোন নম্বর"
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          data-ocid="reseller.phone_input"
        />
        <input
          className="w-full px-3 py-2 text-sm rounded-lg border border-input bg-background"
          placeholder="ইমেইল"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          data-ocid="reseller.email_input"
        />
        <input
          className="w-full px-3 py-2 text-sm rounded-lg border border-input bg-background"
          placeholder="ঠিকানা"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          data-ocid="reseller.address_input"
        />
      </div>
      <button
        type="button"
        onClick={() => createReseller.mutate()}
        disabled={!form.name || !form.phone || !actor || isFetching}
        className="w-full mt-4 py-3 rounded-xl text-white font-bold text-sm transition-smooth hover:opacity-90 disabled:opacity-50"
        style={{ backgroundColor: "#2e7d32" }}
        data-ocid="reseller.submit_button"
      >
        {createReseller.isPending ? "প্রাক্রিয়া..." : "অ্যাকাউন্ট তৈরি করুন"}
      </button>
    </>
  );
}
