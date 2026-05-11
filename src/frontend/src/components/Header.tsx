import { Menu, ShoppingCart } from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
  onBalanceClick: () => void;
}

export function Header({ onMenuClick, onBalanceClick }: HeaderProps) {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-3 py-2.5"
      style={{
        backgroundColor: "#2e7d32",
        maxWidth: "480px",
        margin: "0 auto",
      }}
    >
      <button
        type="button"
        onClick={onMenuClick}
        className="p-1.5 rounded-lg hover:bg-white/10 transition-smooth"
        aria-label="মেনু খুলুন"
        data-ocid="header.menu_button"
      >
        <Menu size={22} color="white" />
      </button>

      <div className="flex items-center gap-1.5">
        <ShoppingCart size={16} color="white" />
        <span className="text-white font-bold text-xs tracking-wide">
          RESELPONNO / RESELLER BD
        </span>
      </div>

      <button
        type="button"
        onClick={onBalanceClick}
        className="px-2.5 py-1 rounded-lg text-white text-xs font-semibold border border-white/40 hover:bg-white/10 transition-smooth"
        data-ocid="header.balance_button"
      >
        ব্যালেন্স দেখুন
      </button>
    </header>
  );
}
