import type { ActiveTab } from "@/types";

interface BottomNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

const tabs: {
  id: ActiveTab;
  label: string;
  icon: (active: boolean) => React.ReactNode;
}[] = [
  {
    id: "home",
    label: "হোম",
    icon: (active) => (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill={active ? "#2e7d32" : "#9ca3af"}
        aria-hidden="true"
      >
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    ),
  },
  {
    id: "products",
    label: "নতুন প্রোডাক্ট",
    icon: (active) => (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill={active ? "#2e7d32" : "#9ca3af"}
        aria-hidden="true"
      >
        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
      </svg>
    ),
  },
  {
    id: "daily",
    label: "প্রতিদিন",
    icon: (active) => (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill={active ? "#2e7d32" : "#9ca3af"}
        aria-hidden="true"
      >
        <path d="M19 3h-1V1h-2v2H8V1H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 16H5V8h14v11zm-7-2a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm.5-5H11V9h2v3h1.5l-2.5 4-2.5-4H11V9h1.5v3z" />
      </svg>
    ),
  },
  {
    id: "profile",
    label: "প্রোফাইল",
    icon: (active) => (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill={active ? "#2e7d32" : "#9ca3af"}
        aria-hidden="true"
      >
        <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-4.42 0-8 1.79-8 4v1a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1c0-2.21-3.58-4-8-4z" />
      </svg>
    ),
  },
];

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border flex items-center"
      style={{ maxWidth: "480px", margin: "0 auto" }}
    >
      {tabs.map(({ id, label, icon }) => {
        const isActive = activeTab === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onTabChange(id)}
            className="flex-1 flex flex-col items-center gap-0.5 py-2 transition-smooth"
            data-ocid={`bottomnav.${id}_tab`}
          >
            {icon(isActive)}
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
