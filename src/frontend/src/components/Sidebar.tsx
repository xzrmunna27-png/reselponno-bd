import type { ResellerSession } from "@/types";
import {
  Bell,
  HelpCircle,
  Home,
  LogOut,
  Package,
  Settings,
  ShoppingCart,
  User,
  Wallet,
  X,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  reseller: ResellerSession | null;
}

const menuItems = [
  { label: "হোম", Icon: Home },
  { label: "আমার প্রডাক্ট", Icon: Package },
  { label: "আমার ওয়ালেট", Icon: Wallet },
  { label: "আমার অর্ডার", Icon: ShoppingCart },
  { label: "আমার প্রোফাইল", Icon: User },
  { label: "নোটিফিকেশন", Icon: Bell },
  { label: "সেটিংস", Icon: Settings },
  { label: "সাহায্য", Icon: HelpCircle },
];

export function Sidebar({ isOpen, onClose, onLogout, reseller }: SidebarProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 transition-smooth ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-card shadow-elevated flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        data-ocid="sidebar.panel"
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{ backgroundColor: "#2e7d32" }}
        >
          <div className="flex items-center gap-2">
            <svg
              width="22"
              height="22"
              viewBox="0 0 36 36"
              fill="none"
              role="img"
              aria-label="লোগো"
            >
              <title>রিসেলপন্নো বিডি লোগো</title>
              <rect width="36" height="36" rx="8" fill="#1b5e20" />
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
                fontFamily="Arial,sans-serif"
              >
                R
              </text>
            </svg>
            <span className="text-white font-bold text-xs">রিসেলপন্নো বিডি</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 transition-smooth"
            aria-label="সাইডবার বন্ধ করুন"
            data-ocid="sidebar.close_button"
          >
            <X size={20} color="white" />
          </button>
        </div>

        {/* User info */}
        <div className="px-4 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: "#2e7d32" }}
            >
              {reseller ? reseller.name[0].toUpperCase() : "R"}
            </div>
            <div>
              <p className="text-foreground font-semibold text-sm">
                {reseller ? reseller.name : "রিসেলার ব্যবহারকারী"}
              </p>
              <p className="text-muted-foreground text-xs">
                {reseller ? reseller.phone : "ব্যালেন্স: ৳ ০.০০"}
              </p>
            </div>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto py-2">
          {menuItems.map(({ label, Icon }) => (
            <button
              key={label}
              type="button"
              onClick={onClose}
              className="w-full flex items-center gap-3 px-4 py-3 text-foreground text-sm hover:bg-muted transition-smooth"
              data-ocid="sidebar.menu_item"
            >
              <Icon size={18} style={{ color: "#2e7d32" }} />
              <span>{label}</span>
            </button>
          ))}
          <button
            type="button"
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-muted transition-smooth"
            data-ocid="sidebar.logout_button"
          >
            <LogOut size={18} style={{ color: "#c0392b" }} />
            <span style={{ color: "#c0392b" }}>লগ আউট</span>
          </button>
        </nav>
      </aside>
    </>
  );
}
