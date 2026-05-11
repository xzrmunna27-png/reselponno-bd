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
  { label: "লগ আউট", Icon: LogOut },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
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
          <span className="text-white font-bold text-sm">RESELPONNO</span>
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
              R
            </div>
            <div>
              <p className="text-foreground font-semibold text-sm">
                রিসেলার ব্যবহারকারী
              </p>
              <p className="text-muted-foreground text-xs">ব্যালেন্স: ৳ ০.০০</p>
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
        </nav>
      </aside>
    </>
  );
}
