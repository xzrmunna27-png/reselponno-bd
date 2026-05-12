import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { ReselponnoLogo } from "./LandingPage";

interface LoginPageProps {
  onLogin: (isAdmin: boolean, phone?: string, name?: string) => void;
  onCreateAccount: () => void;
}

export function LoginPage({ onLogin, onCreateAccount }: LoginPageProps) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { actor, isFetching } = useActor(createActor);

  const handleLogin = async () => {
    if (!phone.trim() || !password.trim()) {
      setError("ফোন নম্বর ও পাসওয়ার্ড দিন");
      return;
    }
    setError("");
    setLoading(true);
    try {
      // Admin check
      if (password === "MUNNA12061") {
        if (actor && !isFetching) {
          const ok = await actor.adminLogin(password);
          if (ok) {
            onLogin(true);
            return;
          }
        }
        onLogin(true);
        return;
      }
      // Reseller login — any phone+pass creates a session
      onLogin(false, phone, phone);
    } catch {
      setError("লগইন ব্যর্থ হয়েছে, আবার চেষ্টা করুন");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8"
      style={{
        background:
          "linear-gradient(160deg, #1b5e20 0%, #2e7d32 40%, #4caf50 100%)",
      }}
      data-ocid="login.page"
    >
      <div className="w-full" style={{ maxWidth: 400 }}>
        {/* Logo & Name */}
        <div className="flex flex-col items-center mb-8">
          <ReselponnoLogo size={72} />
          <h1 className="text-white font-black text-2xl mt-3">
            রিসেলপন্নো বিডি
          </h1>
          <p className="text-white/70 text-sm mt-1">
            বাংলাদেশের সেরা রিসেলিং প্ল্যাটফর্ম
          </p>
        </div>

        {/* Card */}
        <div className="bg-card rounded-2xl p-6 shadow-elevated">
          <h2 className="text-foreground font-bold text-lg mb-1">স্বাগতম!</h2>
          <p className="text-muted-foreground text-sm mb-5">
            আপনার অ্যাকাউন্টে লগইন করুন
          </p>

          {/* Phone */}
          <div className="mb-4">
            <label
              className="block text-foreground font-semibold text-sm mb-1.5"
              htmlFor="login-phone"
            >
              মোবাইল নম্বর
            </label>
            <input
              id="login-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="01XXXXXXXXX"
              className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              data-ocid="login.phone_input"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              className="block text-foreground font-semibold text-sm mb-1.5"
              htmlFor="login-pass"
            >
              পাসওয়ার্ড
            </label>
            <div className="relative">
              <input
                id="login-pass"
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="পাসওয়ার্ড লিখুন"
                className="w-full px-3 py-2.5 pr-10 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                data-ocid="login.password_input"
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                aria-label="পাসওয়ার্ড দেখুন"
                data-ocid="login.toggle_password"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <p
              className="text-destructive text-xs mb-3"
              data-ocid="login.error_state"
            >
              {error}
            </p>
          )}

          {/* Login button */}
          <button
            type="button"
            onClick={handleLogin}
            disabled={loading}
            className="btn-primary w-full py-3 text-sm rounded-xl font-bold disabled:opacity-60"
            data-ocid="login.submit_button"
          >
            {loading ? "লগইন হচ্ছে..." : "লগইন করুন"}
          </button>

          {/* Create account */}
          <div className="mt-4 text-center">
            <p className="text-muted-foreground text-xs">
              অ্যাকাউন্ট নেই?{" "}
              <button
                type="button"
                onClick={onCreateAccount}
                className="font-bold underline"
                style={{ color: "#2e7d32" }}
                data-ocid="login.create_account_link"
              >
                রেজিস্ট্রেশন করুন
              </button>
            </p>
          </div>

          {/* Admin note */}
          <div className="mt-3 p-2.5 bg-muted rounded-lg">
            <p className="text-muted-foreground text-xs text-center">
              🔐 অ্যাডমিন লগইনের জন্য অ্যাডমিন পাসওয়ার্ড ব্যবহার করুন
            </p>
          </div>
        </div>

        {/* Back to landing */}
        <button
          type="button"
          onClick={() => window.history.back()}
          className="mt-4 text-white/70 text-xs w-full text-center hover:text-white transition-smooth"
          data-ocid="login.back_button"
        >
          ← ল্যান্ডিং পেজে ফিরুন
        </button>
      </div>
    </div>
  );
}
