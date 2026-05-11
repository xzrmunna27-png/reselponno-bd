import type { ActiveTab } from "@/types";
import { Calendar, Home, Package, User } from "lucide-react";

interface BottomNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

const tabs: { id: ActiveTab; label: string; Icon: typeof Home }[] = [
  { id: "home", label: "হোম", Icon: Home },
  { id: "products", label: "নতুন প্রডাক্ট", Icon: Package },
  { id: "daily", label: "প্রতিদিন", Icon: Calendar },
  { id: "profile", label: "প্রোফাইল", Icon: User },
];

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border flex items-center"
      style={{ maxWidth: "480px", margin: "0 auto" }}
    >
      {tabs.map(({ id, label, Icon }) => {
        const isActive = activeTab === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onTabChange(id)}
            className="flex-1 flex flex-col items-center gap-0.5 py-2 transition-smooth"
            data-ocid={`bottomnav.${id}_tab`}
          >
            <Icon
              size={20}
              style={{ color: isActive ? "#2e7d32" : "#9ca3af" }}
            />
            <span
              className="font-semibold"
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
