import { Menu, Wallet } from "lucide-react";

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

      {/* Logo + Name */}
      <div className="flex items-center gap-1.5">
        <svg
          width="26"
          height="26"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="রিসেলপন্নো বিডি লোগো"
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
        <div className="flex flex-col leading-none">
          <span className="text-white font-black" style={{ fontSize: 11 }}>
            রিসেলপন্নো বিডি
          </span>
          <span className="text-white/60" style={{ fontSize: 8 }}>
            RESELLER BD
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onBalanceClick}
        className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-white text-xs font-semibold border border-white/40 hover:bg-white/10 transition-smooth"
        data-ocid="header.balance_button"
      >
        <Wallet size={12} />
        <span>ব্যালেন্স</span>
      </button>
    </header>
  );
}
