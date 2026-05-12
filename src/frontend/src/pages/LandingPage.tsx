import { useEffect, useRef, useState } from "react";

const slides = [
  {
    gradient: "linear-gradient(135deg, #1a5e1f 0%, #2e7d32 50%, #388e3c 100%)",
    headline: "বাংলাদেশের সেরা রিসেলিং প্ল্যাটফর্ম",
    sub: "হাজারো প্রোডাক্ট রিসেল করুন, ঘরে বসে আয় করুন",
    emoji: "🛒",
  },
  {
    gradient: "linear-gradient(135deg, #c0392b 0%, #e74c3c 50%, #c0392b 100%)",
    headline: "প্রতিটি অর্ডারে ৫% ক্যাশব্যাক",
    sub: "আজই শুরু করুন এবং প্রতিদিন আয় করুন",
    emoji: "💰",
  },
  {
    gradient: "linear-gradient(135deg, #7b4f12 0%, #c0b86b 50%, #a08030 100%)",
    headline: "ফ্যাশন ও ইলেকট্রনিক্স প্রোডাক্ট",
    sub: "সর্বোচ্চ মানের পণ্য সবচেয়ে কম দামে",
    emoji: "👗",
  },
  {
    gradient: "linear-gradient(135deg, #006064 0%, #00838f 50%, #00acc1 100%)",
    headline: "দ্রুত ও নিরাপদ ডেলিভারি",
    sub: "সারা বাংলাদেশে দ্রুততম ডেলিভারি সার্ভিস",
    emoji: "🚚",
  },
  {
    gradient: "linear-gradient(135deg, #4527a0 0%, #7b1fa2 50%, #ab47bc 100%)",
    headline: "নিয়োগ বিজ্ঞপ্তি ও ক্যারিয়ার",
    sub: "সেরা কোম্পানিতে চাকরির সুযোগ খুঁজুন",
    emoji: "💼",
  },
];

const features = [
  {
    emoji: "📦",
    title: "রিসেলিং প্রোডাক্ট",
    desc: "হাজারো পণ্য রিসেল করুন, প্রতিটি বিক্রয়ে মুনাফা অর্জন করুন",
  },
  {
    emoji: "🚀",
    title: "দ্রুত ডেলিভারি",
    desc: "৪৮ ঘণ্টার মধ্যে সারা বাংলাদেশে ডেলিভারি নিশ্চিত",
  },
  {
    emoji: "🛡️",
    title: "বিশ্বস্ত সেবা",
    desc: "১০০% নিরাপদ লেনদেন ও যাচাইকৃত প্রোডাক্টের গ্যারান্টি",
  },
];

const reviews = [
  {
    name: "মোঃ রাহিম উদ্দিন",
    location: "ঢাকা",
    text: "অসাধারণ প্ল্যাটফর্ম! মাত্র এক মাসে ১৫,০০০ টাকা আয় করেছি।",
    stars: 5,
  },
  {
    name: "নাসরিন বেগম",
    location: "চট্টগ্রাম",
    text: "খুব সহজে অর্ডার করা যায়, ডেলিভারিও দ্রুত। সত্যিই চমৎকার সেবা!",
    stars: 5,
  },
  {
    name: "কামরুল হাসান",
    location: "সিলেট",
    text: "ক্যাশব্যাক অফার দারুণ কাজে লাগছে। প্রতিদিন ভালো আয় হচ্ছে।",
    stars: 4,
  },
];

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 4000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background" data-ocid="landing.page">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-card">
        <div
          className="mx-auto flex items-center justify-between px-4 py-3"
          style={{ maxWidth: 480 }}
        >
          <div className="flex items-center gap-2">
            <ReselponnoLogo size={32} />
            <span className="font-bold text-sm" style={{ color: "#2e7d32" }}>
              রিসেলপন্নো বিডি
            </span>
          </div>
          <button
            type="button"
            onClick={onGetStarted}
            className="btn-primary text-xs px-3 py-1.5 rounded-lg"
            data-ocid="landing.login_button"
          >
            লগইন করুন
          </button>
        </div>
      </header>

      <div className="mx-auto flex flex-col" style={{ maxWidth: 480 }}>
        {/* Hero Carousel */}
        <div className="relative overflow-hidden" style={{ height: 260 }}>
          {slides.map((slide) => (
            <div
              key={slide.headline}
              className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center transition-opacity duration-700"
              style={{
                background: slide.gradient,
                opacity: slide === slides[current] ? 1 : 0,
                pointerEvents: slide === slides[current] ? "auto" : "none",
              }}
            >
              <div className="text-5xl mb-3">{slide.emoji}</div>
              <h1 className="text-white font-black text-xl leading-tight mb-2">
                {slide.headline}
              </h1>
              <p className="text-white/85 text-sm">{slide.sub}</p>
            </div>
          ))}
          {/* Dots */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
            {slides.map((slide, i) => (
              <button
                key={slide.headline}
                type="button"
                onClick={() => setCurrent(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === current ? 20 : 8,
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

        {/* Hero image */}
        <div className="mx-3 -mt-4 rounded-xl overflow-hidden shadow-elevated">
          <img
            src="/assets/generated/hero-banner.dim_800x400.jpg"
            alt="Reselponno BD Hero"
            className="w-full object-cover"
            style={{ height: 160 }}
          />
        </div>

        {/* Features */}
        <section className="px-3 py-5">
          <h2 className="font-black text-lg mb-3" style={{ color: "#2e7d32" }}>
            কেন রিসেলপন্নো বিডি?
          </h2>
          <div className="flex flex-col gap-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="card-bordered p-4 flex items-start gap-3 rounded-xl"
              >
                <span className="text-2xl">{f.emoji}</span>
                <div>
                  <h3 className="font-bold text-sm text-foreground">
                    {f.title}
                  </h3>
                  <p className="text-muted-foreground text-xs mt-0.5 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section className="px-3 py-4 bg-muted/30 mx-0">
          <h2 className="font-black text-lg mb-3" style={{ color: "#2e7d32" }}>
            গ্রাহকদের মতামত
          </h2>
          <div className="flex flex-col gap-3">
            {reviews.map((r) => (
              <div key={r.name} className="card-bordered p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs"
                    style={{ backgroundColor: "#2e7d32" }}
                  >
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-xs text-foreground">
                      {r.name}
                    </p>
                    <p
                      className="text-muted-foreground"
                      style={{ fontSize: 10 }}
                    >
                      {r.location}
                    </p>
                  </div>
                  <div className="ml-auto flex">
                    {Array.from({ length: r.stars }).map((_, si) => (
                      <span
                        key={`star-${r.name}-${si}`}
                        className="text-yellow-500"
                        style={{ fontSize: 12 }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-foreground text-xs leading-relaxed">
                  {r.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-3 py-6 text-center">
          <h2 className="font-black text-xl mb-2 text-foreground">
            আজই শুরু করুন!
          </h2>
          <p className="text-muted-foreground text-sm mb-4">
            হাজারো রিসেলারের সাথে যোগ দিন এবং আয় শুরু করুন
          </p>
          <button
            type="button"
            onClick={onGetStarted}
            className="btn-primary w-full py-3 text-base rounded-xl font-black"
            data-ocid="landing.cta_button"
          >
            এখনই শুরু করুন 🚀
          </button>
        </section>

        {/* Footer */}
        <footer
          className="px-4 py-5 border-t border-border"
          style={{ backgroundColor: "#2e7d32" }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <ReselponnoLogo size={24} />
            <span className="text-white font-bold text-sm">রিসেলপন্নো বিডি</span>
          </div>
          <p className="text-white/70 text-center text-xs">
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noreferrer"
              className="underline text-white/90"
            >
              caffeine.ai
            </a>
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
