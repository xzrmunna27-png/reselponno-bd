import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { ReselponnoLogo } from "./LandingPage";

interface CreateAccountPageProps {
  onSuccess: (phone: string, name: string) => void;
  onBack: () => void;
}

export function CreateAccountPage({
  onSuccess,
  onBack,
}: CreateAccountPageProps) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [error, setError] = useState("");
  const { actor, isFetching } = useActor(createActor);

  const createAccount = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Backend not ready");
      return actor.createResellerAccount(
        form.name,
        form.phone,
        form.email,
        form.address,
      );
    },
    onSuccess: () => onSuccess(form.phone, form.name),
    onError: () => setError("অ্যাকাউন্ট তৈরি ব্যর্থ হয়েছে, আবার চেষ্টা করুন"),
  });

  const handleSubmit = () => {
    if (!form.name.trim() || !form.phone.trim()) {
      setError("নাম ও ফোন নম্বর আবশ্যক");
      return;
    }
    setError("");
    createAccount.mutate();
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8"
      style={{
        background:
          "linear-gradient(160deg, #1b5e20 0%, #2e7d32 40%, #4caf50 100%)",
      }}
      data-ocid="create_account.page"
    >
      <div className="w-full" style={{ maxWidth: 400 }}>
        <div className="flex flex-col items-center mb-8">
          <ReselponnoLogo size={56} />
          <h1 className="text-white font-black text-xl mt-3">
            রিসেলার অ্যাকাউন্ট তৈরি
          </h1>
          <p className="text-white/70 text-sm mt-1">রিসেলপন্নো বিডিতে যোগ দিন</p>
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-elevated">
          <div className="space-y-4">
            <div>
              <label
                className="block text-foreground font-semibold text-sm mb-1.5"
                htmlFor="reg-name"
              >
                পূর্ণ নাম *
              </label>
              <input
                id="reg-name"
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="আপনার পূর্ণ নাম"
                className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                data-ocid="create_account.name_input"
              />
            </div>
            <div>
              <label
                className="block text-foreground font-semibold text-sm mb-1.5"
                htmlFor="reg-phone"
              >
                মোবাইল নম্বর *
              </label>
              <input
                id="reg-phone"
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="01XXXXXXXXX"
                className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                data-ocid="create_account.phone_input"
              />
            </div>
            <div>
              <label
                className="block text-foreground font-semibold text-sm mb-1.5"
                htmlFor="reg-email"
              >
                ইমেইল (ঐচ্ছিক)
              </label>
              <input
                id="reg-email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="example@email.com"
                className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                data-ocid="create_account.email_input"
              />
            </div>
            <div>
              <label
                className="block text-foreground font-semibold text-sm mb-1.5"
                htmlFor="reg-address"
              >
                ঠিকানা
              </label>
              <input
                id="reg-address"
                type="text"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="আপনার ঠিকানা"
                className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                data-ocid="create_account.address_input"
              />
            </div>
          </div>

          {error && (
            <p
              className="text-destructive text-xs mt-3"
              data-ocid="create_account.error_state"
            >
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={createAccount.isPending || isFetching}
            className="btn-primary w-full mt-4 py-3 text-sm rounded-xl font-bold disabled:opacity-60"
            data-ocid="create_account.submit_button"
          >
            {createAccount.isPending ? "তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
          </button>

          <button
            type="button"
            onClick={onBack}
            className="w-full mt-3 text-center text-xs text-muted-foreground hover:text-foreground transition-smooth"
            data-ocid="create_account.back_button"
          >
            ← লগইন পাতায় ফিরুন
          </button>
        </div>
      </div>
    </div>
  );
}
