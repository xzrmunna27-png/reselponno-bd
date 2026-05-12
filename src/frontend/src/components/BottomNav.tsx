import type { ActiveTab } from "@/types";

interface BottomNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

const tabs: {
  id: ActiveTab;
  label: string;
  emoji: string;
  activeEmoji: string;
}[] = [
  { id: "home", label: "হোম", emoji: "🏠", activeEmoji: "🏠" },
  { id: "products", label: "পণ্য", emoji: "🛒", activeEmoji: "🛒" },
  { id: "daily", label: "অর্ডার", emoji: "📦", activeEmoji: "📦" },
  { id: "profile", label: "প্রোফাইল", emoji: "👤", activeEmoji: "👤" },
];

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border flex items-center"
      style={{ maxWidth: "480px", margin: "0 auto" }}
    >
      {tabs.map(({ id, label, emoji }) => {
        const isActive = activeTab === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onTabChange(id)}
            className="flex-1 flex flex-col items-center gap-0.5 py-2 transition-smooth"
            data-ocid={`bottomnav.${id}_tab`}
          >
            <span
              className="text-xl"
              style={{
                filter: isActive
                  ? "drop-shadow(0 0 4px rgba(46,125,50,0.6))"
                  : "grayscale(0.4) opacity(0.6)",
              }}
            >
              {emoji}
            </span>
            <span
              className="font-semibold font-bengali"
              style={{
                fontSize: "10px",
                color: isActive ? "#2e7d32" : "#9ca3af",
              }}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
