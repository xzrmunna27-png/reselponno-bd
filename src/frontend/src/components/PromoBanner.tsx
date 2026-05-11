import { useState } from "react";

interface PromoBannerProps {
  onOrderClick: () => void;
}

export function PromoBanner({ onOrderClick }: PromoBannerProps) {
  const [activeDot, setActiveDot] = useState(0);

  return (
    <div
      className="mx-3 rounded-xl p-4 relative overflow-hidden"
      style={{ backgroundColor: "#c0392b" }}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h2 className="text-white text-xl font-extrabold leading-tight">
            ৫% ক্যাশব্যাক অফার
          </h2>
          <p className="text-white/80 text-xs mt-1 leading-relaxed">
            প্রতিটি অর্ডারে ইনস্ট্যান্ট ক্যাশব্যাক উপভোগ করুন
          </p>
          <button
            type="button"
            onClick={onOrderClick}
            className="mt-3 px-4 py-1.5 rounded-lg text-white text-xs font-bold transition-smooth hover:opacity-90 active:scale-95"
            style={{ backgroundColor: "#2e7d32" }}
            data-ocid="promo.order_button"
          >
            এখনই অর্ডার করুন
          </button>
        </div>

        <div
          className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 ml-3"
          style={{ backgroundColor: "#2e7d32" }}
        >
          <span className="text-white text-2xl font-black">R</span>
        </div>
      </div>

      <div className="flex gap-1.5 mt-3 justify-center">
        {[0, 1, 2].map((dot) => (
          <button
            key={dot}
            type="button"
            onClick={() => setActiveDot(dot)}
            className="rounded-full transition-smooth"
            style={{
              width: activeDot === dot ? "20px" : "8px",
              height: "8px",
              backgroundColor:
                activeDot === dot ? "white" : "rgba(255,255,255,0.4)",
            }}
            aria-label={`স্লাইড ${dot + 1}`}
            data-ocid={`promo.dot.${dot + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
