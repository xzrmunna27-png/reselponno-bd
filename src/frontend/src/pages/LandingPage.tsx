import { useEffect, useRef, useState } from "react";

const slides = [
  {
    gradient: "linear-gradient(135deg, #1a5e1f 0%, #2e7d32 60%, #43a047 100%)",
    headline: "বাংলাদেশের সেরা রিসেলিং প্ল্যাটফর্ম",
    sub: "হাজারো প্রোডাক্ট রিসেল করুন, ঘরে বসে আয় করুন",
    emoji: "🛒",
    tag: "স্বাগতম",
  },
  {
    gradient: "linear-gradient(135deg, #b71c1c 0%, #e53935 60%, #ef5350 100%)",
    headline: "প্রতিটি অর্ডারে ৫% ক্যাশব্যাক",
    sub: "আজই শুরু করুন এবং প্রতিদিন আয় করুন",
    emoji: "💰",
    tag: "বিশেষ অফার",
  },
  {
    gradient: "linear-gradient(135deg, #0d47a1 0%, #1565c0 60%, #1e88e5 100%)",
    headline: "ফ্যাশন ও ইলেকট্রনিক্স প্রোডাক্ট",
    sub: "সর্বোচ্চ মানের পণ্য সবচেয়ে কম দামে",
    emoji: "👗",
    tag: "হাজারো পণ্য",
  },
  {
    gradient: "linear-gradient(135deg, #004d40 0%, #00695c 60%, #00897b 100%)",
    headline: "দ্রুত ও নিরাপদ ডেলিভারি",
    sub: "সারা বাংলাদেশে দ্রুততম ডেলিভারি সার্ভিস",
    emoji: "🚚",
    tag: "দ্রুত সেবা",
  },
  {
    gradient: "linear-gradient(135deg, #4a148c 0%, #7b1fa2 60%, #ab47bc 100%)",
    headline: "নিয়োগ বিজ্ঞপ্তি ও ক্যারিয়ার",
    sub: "সেরা কোম্পানিতে চাকরির সুযোগ খুঁজুন",
    emoji: "💼",
    tag: "নতুন সুযোগ",
  },
];

const features = [
  {
    emoji: "📦",
    title: "রিসেলিং প্রোডাক্ট",
    desc: "হাজারো পণ্য রিসেল করুন, প্রতিটি বিক্রয়ে মুনাফা অর্জন করুন",
    color: "#1b5e20",
    bg: "#e8f5e9",
  },
  {
    emoji: "🚀",
    title: "দ্রুত ডেলিভারি",
    desc: "৪৮ ঘণ্টার মধ্যে সারা বাংলাদেশে ডেলিভারি নিশ্চিত",
    color: "#0d47a1",
    bg: "#e3f2fd",
  },
  {
    emoji: "🛡️",
    title: "বিশ্বস্ত সেবা",
    desc: "১০০% নিরাপদ লেনদেন ও যাচাইকৃত প্রোডাক্টের গ্যারান্টি",
    color: "#6a1b9a",
    bg: "#f3e5f5",
  },
];

const whyUs = [
  {
    emoji: "👥",
    value: "৫০০+",
    label: "সক্রিয় রিসেলার",
    color: "#c62828",
    bg: "#ffebee",
  },
  {
    emoji: "📦",
    value: "১০০০+",
    label: "প্রিমিয়াম প্রোডাক্ট",
    color: "#1565c0",
    bg: "#e3f2fd",
  },
  {
    emoji: "🎧",
    value: "২৪/৭",
    label: "কাস্টমার সাপোর্ট",
    color: "#6a1b9a",
    bg: "#f3e5f5",
  },
  {
    emoji: "⚡",
    value: "৪৮ ঘন্টা",
    label: "দ্রুত ডেলিভারি",
    color: "#e65100",
    bg: "#fff3e0",
  },
];

const reviews = [
  {
    name: "মোঃ রাহিম উদ্দিন",
    location: "ঢাকা",
    text: "অসাধারণ প্ল্যাটফর্ম! মাত্র এক মাসে ১৫,০০০ টাকা আয় করেছি।",
    stars: 5,
    avatarColor: "#c62828",
  },
  {
    name: "নাসরিন বেগম",
    location: "চট্টগ্রাম",
    text: "খুব সহজে অর্ডার করা যায়, ডেলিভারিও দ্রুত। সত্যিই চমৎকার সেবা!",
    stars: 5,
    avatarColor: "#1565c0",
  },
  {
    name: "কামরুল হাসান",
    location: "সিলেট",
    text: "ক্যাশব্যাক অফার দারুণ কাজে লাগছে। প্রতিদিন ভালো আয় হচ্ছে।",
    stars: 4,
    avatarColor: "#6a1b9a",
  },
];

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 4500);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const slide = slides[current];

  return (
    <div className="min-h-screen bg-background" data-ocid="landing.page">
      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b shadow-sm"
        style={{ backgroundColor: "#2e7d32", borderColor: "#1b5e20" }}
      >
        <div
          className="mx-auto flex items-center justify-between px-4 py-3"
          style={{ maxWidth: 480 }}
        >
          <div className="flex items-center gap-2">
            <ReselponnoLogo size={32} />
            <span className="font-black text-sm text-white tracking-wide">
              রিসেলপন্নো বিডি
            </span>
          </div>
          <button
            type="button"
            onClick={onGetStarted}
            className="text-xs px-4 py-2 rounded-lg font-bold transition-all active:scale-95"
            style={{
              backgroundColor: "rgba(255,255,255,0.15)",
              color: "white",
              border: "1.5px solid rgba(255,255,255,0.5)",
            }}
            data-ocid="landing.login_button"
          >
            লগইন করুন
          </button>
        </div>
      </header>

      <div className="mx-auto flex flex-col" style={{ maxWidth: 480 }}>
        {/* Hero Carousel — single active slide rendered, no stacking */}
        <div
          className="relative overflow-hidden"
          style={{ height: 270 }}
          data-ocid="landing.hero_carousel"
        >
          <div
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
            style={{ background: slide.gradient }}
          >
            {/* Tag pill */}
            <div
              className="px-3 py-1 rounded-full text-xs font-bold mb-3 tracking-wide"
              style={{
                backgroundColor: "rgba(255,255,255,0.2)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.35)",
              }}
            >
              {slide.tag}
            </div>
            {/* Icon bubble */}
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3 shadow-lg"
              style={{ backgroundColor: "rgba(255,255,255,0.18)" }}
            >
              <span className="text-4xl">{slide.emoji}</span>
            </div>
            <h1 className="text-white font-black text-xl leading-tight mb-2">
              {slide.headline}
            </h1>
            <p className="text-white/85 text-sm max-w-xs leading-relaxed">
              {slide.sub}
            </p>
          </div>

          {/* Dot nav */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
            {slides.map((s, i) => (
              <button
                key={s.headline}
                type="button"
                onClick={() => {
                  setCurrent(i);
                  if (timerRef.current) clearInterval(timerRef.current);
                  timerRef.current = setInterval(() => {
                    setCurrent((c) => (c + 1) % slides.length);
                  }, 4500);
                }}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === current ? 22 : 8,
                  height: 8,
                  backgroundColor:
                    i === current ? "white" : "rgba(255,255,255,0.45)",
                }}
                aria-label={`স্লাইড ${i + 1}`}
                data-ocid={`landing.slide_dot.${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <div
          className="py-3 border-b"
          style={{
            background:
              "linear-gradient(90deg, #1b5e20 0%, #2e7d32 50%, #1b5e20 100%)",
            borderColor: "#1b5e20",
          }}
        >
          <div className="grid grid-cols-4 divide-x divide-white/20">
            {[
              { emoji: "👥", value: "৫০০+", label: "রিসেলার" },
              { emoji: "📦", value: "১০০০+", label: "প্রোডাক্ট" },
              { emoji: "🎧", value: "২৪/৭", label: "সাপোর্ট" },
              { emoji: "⚡", value: "দ্রুত", label: "ডেলিভারি" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center py-1 px-1"
              >
                <span className="text-lg leading-none mb-0.5">
                  {stat.emoji}
                </span>
                <span className="text-white font-black text-sm leading-tight">
                  {stat.value}
                </span>
                <span
                  className="text-xs leading-tight"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <section className="px-3 py-5 bg-background">
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-1 h-6 rounded-full"
              style={{ backgroundColor: "#2e7d32" }}
            />
            <h2 className="font-black text-lg" style={{ color: "#1b5e20" }}>
              কেন রিসেলপন্নো বিডি?
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="flex items-start gap-3 rounded-2xl p-4"
                style={{
                  backgroundColor: f.bg,
                  border: `1.5px solid ${f.color}30`,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${f.color}18` }}
                >
                  <span className="text-xl">{f.emoji}</span>
                </div>
                <div className="min-w-0">
                  <h3
                    className="font-black text-sm mb-0.5"
                    style={{ color: f.color }}
                  >
                    {f.title}
                  </h3>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: `${f.color}cc` }}
                  >
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why choose us */}
        <section
          className="px-3 py-5"
          style={{
            background: "linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 100%)",
            borderTop: "2px solid #c8e6c9",
            borderBottom: "2px solid #c8e6c9",
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-1 h-6 rounded-full"
              style={{ backgroundColor: "#2e7d32" }}
            />
            <h2 className="font-black text-lg" style={{ color: "#1b5e20" }}>
              কেন আমাদের বেছে নেবেন?
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {whyUs.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl p-3 text-center"
                style={{
                  backgroundColor: item.bg,
                  border: `1.5px solid ${item.color}30`,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
                }}
              >
                <div className="text-2xl mb-1">{item.emoji}</div>
                <div
                  className="font-black text-lg leading-tight"
                  style={{ color: item.color }}
                >
                  {item.value}
                </div>
                <div
                  className="text-xs mt-0.5"
                  style={{ color: `${item.color}aa` }}
                >
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section className="px-3 py-5 bg-background">
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-1 h-6 rounded-full"
              style={{ backgroundColor: "#2e7d32" }}
            />
            <h2 className="font-black text-lg" style={{ color: "#1b5e20" }}>
              গ্রাহকদের মতামত
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {reviews.map((r) => (
              <div
                key={r.name}
                className="rounded-2xl p-4"
                style={{
                  backgroundColor: "#ffffff",
                  border: "1.5px solid #e8e8e8",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-base flex-shrink-0"
                    style={{ backgroundColor: r.avatarColor }}
                  >
                    {r.name[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className="font-bold text-sm leading-tight"
                      style={{ color: "#212121" }}
                    >
                      {r.name}
                    </p>
                    <p className="text-xs" style={{ color: "#757575" }}>
                      {r.location}
                    </p>
                  </div>
                  <div className="flex gap-0.5 flex-shrink-0">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <span
                        key={`star-${r.name}-${si}`}
                        style={{
                          fontSize: 14,
                          color: si < r.stars ? "#f9a825" : "#e0e0e0",
                        }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <div className="relative pl-3">
                  <div
                    className="absolute left-0 top-0 font-black text-2xl leading-none"
                    style={{ color: "#c8e6c9" }}
                  >
                    “
                  </div>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "#424242" }}
                  >
                    {r.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section
          className="px-3 py-8 text-center"
          style={{
            background:
              "linear-gradient(135deg, #1b5e20 0%, #2e7d32 50%, #1b5e20 100%)",
          }}
        >
          <div className="text-4xl mb-3">🚀</div>
          <h2 className="font-black text-xl mb-2 text-white">আজই শুরু করুন!</h2>
          <p
            className="text-sm mb-6 leading-relaxed"
            style={{ color: "rgba(255,255,255,0.8)" }}
          >
            হাজারো রিসেলারের সাথে যোগ দিন এবং আয় শুরু করুন
          </p>
          <button
            type="button"
            onClick={onGetStarted}
            className="w-full py-3.5 text-base rounded-2xl font-black active:scale-95 transition-all"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #f1f8e9 100%)",
              color: "#1b5e20",
              boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
            }}
            data-ocid="landing.cta_button"
          >
            এখনই শুরু করুন →
          </button>
          <p
            className="text-xs mt-3"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            ফ্রি রেজিস্ট্রেশন · কোনো লুকানো চার্জ নেই
          </p>
        </section>

        {/* Footer */}
        <footer
          className="px-4 py-5"
          style={{
            backgroundColor: "#1b5e20",
            borderTop: "2px solid #2e7d32",
          }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <ReselponnoLogo size={28} />
            <span className="text-white font-black text-sm tracking-wide">
              রিসেলপন্নো বিডি
            </span>
          </div>
          <div className="flex justify-center gap-4 mb-3">
            {["সম্পর্কে", "যোগাযোগ", "নিয়মাবলী"].map((link) => (
              <span
                key={link}
                className="text-xs cursor-pointer transition-colors"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                {link}
              </span>
            ))}
          </div>
          <p
            className="text-center text-xs"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            © {new Date().getFullYear()} RESELPONNO BD — সর্বস্বত্ব সংরক্ষিত
          </p>
        </footer>
      </div>
    </div>
  );
}

export function ReselponnoLogo({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="রিসেলপন্নো বিডি লোগো"
    >
      <title>রিসেলপন্নো বিডি লোগো</title>
      <rect width="36" height="36" rx="8" fill="#2e7d32" />
      <path
        d="M18 4L30 9V18C30 24.627 24.627 30 18 32C11.373 30 6 24.627 6 18V9L18 4Z"
        fill="#1b5e20"
        stroke="#c0b86b"
        strokeWidth="1.5"
      />
      <text
        x="18"
        y="23"
        textAnchor="middle"
        fill="#c0b86b"
        fontSize="14"
        fontWeight="900"
        fontFamily="Arial, sans-serif"
      >
        R
      </text>
    </svg>
  );
}
