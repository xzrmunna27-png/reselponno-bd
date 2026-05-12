import { useResellerBalance } from "@/hooks/useQueries";
import type { ResellerSession } from "@/types";
import { useState } from "react";
import { toast } from "sonner";

const AVATAR_EMOJIS = ["👤", "🧑", "👩", "🧔", "👨", "🧑‍💼", "👩‍💼", "🧑‍🚀"];

function getAvatarEmoji(name: string) {
  const idx = name.charCodeAt(0) % AVATAR_EMOJIS.length;
  return AVATAR_EMOJIS[idx];
}

interface Props {
  reseller: ResellerSession | null;
  onLogout: () => void;
}

export function ProfilePage({ reseller, onLogout }: Props) {
  const { data: balanceData, isLoading } = useResellerBalance(
    reseller?.id ?? null,
  );
  const [showTopup, setShowTopup] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [topupAmount, setTopupAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [editName, setEditName] = useState(reseller?.name ?? "");
  const [savedName, setSavedName] = useState(reseller?.name ?? "");

  if (!reseller) {
    return (
      <div
        className="flex flex-col items-center justify-center py-16"
        data-ocid="profile.page"
      >
        <span className="text-5xl">🔒</span>
        <p className="text-foreground font-bold font-bengali mt-3">লগইন করুন</p>
      </div>
    );
  }

  const balance = balanceData?.balance ?? BigInt(0);
  const avatarEmoji = getAvatarEmoji(reseller.name);

  return (
    <div className="flex flex-col bg-background pb-4" data-ocid="profile.page">
      {/* Profile header */}
      <div className="relative gradient-primary px-4 pt-6 pb-10 flex flex-col items-center">
        <div className="text-6xl mb-2">{avatarEmoji}</div>
        <h2 className="text-primary-foreground font-bold text-lg font-bengali">
          {savedName || reseller.name}
        </h2>
        <p className="text-primary-foreground/80 text-sm font-bengali">
          📱 {reseller.phone}
        </p>
      </div>

      {/* Balance card — floating over gradient */}
      <div className="mx-4 -mt-6 bg-card rounded-2xl shadow-elevated p-4 flex items-center justify-between">
        <div>
          <p className="text-muted-foreground text-xs font-bengali">
            বর্তমান ব্যালেন্স
          </p>
          {isLoading ? (
            <div className="h-7 w-24 bg-muted rounded animate-pulse" />
          ) : (
            <p className="text-primary font-bold text-2xl">
              ৳{balance.toString()}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setShowTopup(true)}
            className="px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-bold font-bengali"
            data-ocid="profile.topup_button"
          >
            ➕ টপ আপ
          </button>
          <button
            type="button"
            onClick={() => setShowWithdraw(true)}
            className="px-3 py-1.5 border border-primary text-primary rounded-lg text-xs font-bold font-bengali"
            data-ocid="profile.withdraw_button"
          >
            🏦 উইথড্র
          </button>
        </div>
      </div>

      {/* Stats */}
      {balanceData && (
        <div className="mx-4 mt-3 grid grid-cols-2 gap-3">
          <div className="bg-card rounded-xl p-3 shadow-card">
            <p className="text-muted-foreground text-xs font-bengali">
              মোট লেনদেন
            </p>
            <p className="text-foreground font-bold text-lg">
              {balanceData.transactions.length}
            </p>
          </div>
          <div className="bg-card rounded-xl p-3 shadow-card">
            <p className="text-muted-foreground text-xs font-bengali">
              রিসেলার ID
            </p>
            <p className="text-foreground font-bold text-lg">
              #{reseller.id.toString().slice(-4)}
            </p>
          </div>
        </div>
      )}

      {/* Edit profile */}
      <div className="mx-4 mt-4 bg-card rounded-2xl p-4 shadow-card">
        <h3 className="text-foreground font-bold text-sm font-bengali mb-3">
          ✏️ প্রোফাইল সম্পাদনা
        </h3>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            placeholder="আপনার নাম"
            className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm font-bengali"
            data-ocid="profile.name_input"
          />
          <input
            type="tel"
            value={reseller.phone}
            readOnly
            className="w-full px-3 py-2 rounded-xl border border-border bg-muted text-muted-foreground text-sm font-bengali"
          />
          <button
            type="button"
            onClick={() => {
              if (!editName.trim()) {
                toast.error("নাম খালি রাখা যাবে না");
                return;
              }
              setSavedName(editName.trim());
              toast.success("প্রোফাইল সংরক্ষণ হয়েছে ✅");
            }}
            className="w-full py-2 bg-primary text-primary-foreground rounded-xl font-bold font-bengali text-sm"
            data-ocid="profile.save_button"
          >
            সংরক্ষণ করুন
          </button>
        </div>
      </div>

      {/* Transaction history */}
      {balanceData && balanceData.transactions.length > 0 && (
        <div className="mx-4 mt-4 bg-card rounded-2xl p-4 shadow-card">
          <h3 className="text-foreground font-bold text-sm font-bengali mb-3">
            💰 লেনদেনের ইতিহাস
          </h3>
          <div className="flex flex-col gap-2">
            {balanceData.transactions.slice(0, 5).map((tx) => (
              <div
                key={`tx-${tx.createdAt.toString()}-${tx.amount.toString()}`}
                className="flex items-center justify-between py-2 border-b border-border last:border-0"
              >
                <div className="min-w-0">
                  <p className="text-foreground text-xs font-semibold font-bengali truncate">
                    {tx.description}
                  </p>
                </div>
                <span
                  className="font-bold text-sm ml-2"
                  style={{
                    color: Number(tx.amount) >= 0 ? "#2e7d32" : "#c0392b",
                  }}
                >
                  {Number(tx.amount) >= 0 ? "+" : ""}৳{tx.amount.toString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Logout */}
      <div className="mx-4 mt-4">
        <button
          type="button"
          onClick={onLogout}
          className="w-full py-3 bg-destructive text-destructive-foreground rounded-xl font-bold font-bengali text-base"
          data-ocid="profile.logout_button"
        >
          🚪 লগ আউট
        </button>
      </div>

      {/* Topup modal */}
      {showTopup && (
        <SimpleModal
          title="💰 টপ আপ"
          onClose={() => setShowTopup(false)}
          ocid="profile.topup"
        >
          <p className="text-muted-foreground text-sm font-bengali mb-3">
            পরিমাণ লিখুন (টাকা)
          </p>
          <input
            type="number"
            value={topupAmount}
            onChange={(e) => setTopupAmount(e.target.value)}
            placeholder="পরিমাণ"
            className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm font-bengali"
            data-ocid="profile.topup.input"
          />
          <button
            type="button"
            onClick={() => setShowTopup(false)}
            className="mt-3 w-full py-2.5 bg-primary text-primary-foreground rounded-xl font-bold font-bengali"
            data-ocid="profile.topup.submit_button"
          >
            অনুরোধ করুন
          </button>
        </SimpleModal>
      )}

      {/* Withdraw modal */}
      {showWithdraw && (
        <SimpleModal
          title="🏦 উইথড্র"
          onClose={() => setShowWithdraw(false)}
          ocid="profile.withdraw"
        >
          <p className="text-muted-foreground text-sm font-bengali mb-3">
            উইথড্র পরিমাণ লিখুন
          </p>
          <input
            type="number"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            placeholder="পরিমাণ"
            className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm font-bengali"
            data-ocid="profile.withdraw.input"
          />
          <button
            type="button"
            onClick={() => setShowWithdraw(false)}
            className="mt-3 w-full py-2.5 bg-primary text-primary-foreground rounded-xl font-bold font-bengali"
            data-ocid="profile.withdraw.submit_button"
          >
            অনুরোধ করুন
          </button>
        </SimpleModal>
      )}
    </div>
  );
}

function SimpleModal({
  title,
  children,
  onClose,
  ocid,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  ocid: string;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ background: "rgba(0,0,0,0.45)" }}
    >
      <div
        className="bg-card w-full rounded-t-2xl shadow-elevated p-4"
        style={{ maxWidth: "480px" }}
        data-ocid={`${ocid}.dialog`}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-foreground font-bold text-base font-bengali">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground text-xl"
            data-ocid={`${ocid}.close_button`}
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
