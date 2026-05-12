import {
  Percent,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Truck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Slide {
  gradient: string;
  headline: string;
  sub: string;
  tag: string;
  emoji: string;
  cta: string;
  Icon: LucideIcon;
}

const SLIDES: Slide[] = [
  {
    gradient: "linear-gradient(135deg, #c0392b 0%, #e74c3c 100%)",
    tag: "বিশেষ অফার",
    headline: "প্রতিটি অর্ডারে ৫% ক্যাশব্যাক",
    sub: "আজই অর্ডার করুন এবং ইনস্ট্যান্ট ক্যাশব্যাক পান",
    emoji: "💰",
    cta: "এখনই অর্ডার করুন",
    Icon: Percent,
  },
  {
    gradient: "linear-gradient(135deg, #1a5e1f 0%, #2e7d32 100%)",
    tag: "হাজারো পণ্য",
    headline: "রিসেলিং প্রডাক্ট",
    sub: "ফ্যাশন, ইলেকট্রনিক্স সহ সব ধরনের পণ্য",
    emoji: "🛒",
    cta: "পণ্য দেখুন",
    Icon: ShoppingBag,
  },
  {
    gradient: "linear-gradient(135deg, #c0b86b 0%, #a08030 100%)",
    tag: "দ্রুত ডেলিভারি",
    headline: "৪৮ ঘণ্টায় সারাদেশে ডেলিভারি",
    sub: "বিশ্বস্ত ডেলিভারি সার্ভিস, সময়মতো পৌঁছানো নিশ্চিত",
    emoji: "🚚",
    cta: "আরও জানুন",
    Icon: Truck,
  },
  {
    gradient: "linear-gradient(135deg, #006064 0%, #00838f 100%)",
    tag: "মোবাইল সেবা",
    headline: "সব অপারেটরে রিচার্জ করুন",
    sub: "গ্রামীণফোন, রবি, বাংলালিংক, এয়ারটেল, টেলিটক",
    emoji: "📱",
    cta: "রিচার্জ করুন",
    Icon: Smartphone,
  },
  {
    gradient: "linear-gradient(135deg, #4527a0 0%, #7b1fa2 100%)",
    tag: "নতুন ফিচার",
    headline: "নিয়োগ বিজ্ঞপ্তি ও জব আপডেট",
    sub: "সেরা কোম্পানিতে চাকরির সুযোগ খুঁজুন",
    emoji: "💼",
    cta: "বিজ্ঞপ্তি দেখুন",
    Icon: Sparkles,
  },
];

interface PromoBannerProps {
  onOrderClick: () => void;
}

export function PromoBanner({ onOrderClick }: PromoBannerProps) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(
      () => setCurrent((c) => (c + 1) % SLIDES.length),
      4500,
    );
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const slide = SLIDES[current];

  return (
    <div
      className="mx-3 rounded-xl overflow-hidden relative"
      style={{ background: slide.gradient, minHeight: 140 }}
      data-ocid="promo.banner"
    >
      {/* Slide content */}
      <div className="p-4 flex items-start justify-between">
        <div className="flex-1 min-w-0 pr-2">
          <div className="flex items-center gap-1.5 mb-1">
            <slide.Icon size={14} color="rgba(255,255,255,0.9)" />
            <span className="text-white/80 text-xs font-medium">
              {slide.tag}
            </span>
          </div>
          <h2 className="text-white text-base font-black leading-snug">
            {slide.headline}
          </h2>
          <p className="text-white/75 text-xs mt-1 leading-relaxed">
            {slide.sub}
          </p>
          <button
            type="button"
            onClick={onOrderClick}
            className="mt-3 px-3 py-1.5 rounded-lg text-white text-xs font-bold hover:opacity-90 active:scale-95 transition-smooth flex items-center gap-1"
            style={{
              backgroundColor: "rgba(0,0,0,0.25)",
              border: "1px solid rgba(255,255,255,0.35)",
            }}
            data-ocid="promo.order_button"
          >
            {slide.cta}
          </button>
        </div>
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
        >
          <span className="text-3xl">{slide.emoji}</span>
        </div>
      </div>

      {/* Dot nav */}
      <div className="flex gap-1.5 pb-3 justify-center">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.headline}
            type="button"
            onClick={() => setCurrent(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === current ? 20 : 7,
              height: 7,
              backgroundColor:
                i === current ? "white" : "rgba(255,255,255,0.4)",
            }}
            aria-label={`স্লাইড ${i + 1}`}
            data-ocid={`promo.dot.${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
