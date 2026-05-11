import { Bell } from "lucide-react";

interface NoticeCardProps {
  onDetailsClick: () => void;
}

export function NoticeCard({ onDetailsClick }: NoticeCardProps) {
  return (
    <div className="mx-3 bg-card rounded-xl p-4 shadow-card">
      <div className="flex items-center gap-2 mb-2">
        <Bell size={16} style={{ color: "#2e7d32" }} />
        <h3 className="text-foreground font-bold text-sm">গুরুত্বপূর্ণ নোটিশ</h3>
      </div>
      <p className="text-muted-foreground text-xs leading-relaxed">
        ⚡ নতুন ফিচার চালু হয়েছে! ৫% ক্যাশব্যাক অফার সম্পর্কে বিস্তারিত জানতে...
      </p>
      <button
        type="button"
        onClick={onDetailsClick}
        className="mt-2 text-xs font-semibold hover:underline transition-smooth"
        style={{ color: "#2e7d32" }}
        data-ocid="notice.details_button"
      >
        বিস্তারিত দেখুন
      </button>
    </div>
  );
}
