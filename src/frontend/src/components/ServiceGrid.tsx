import {
  ArrowUpCircle,
  Banknote,
  BarChart2,
  CalendarDays,
  CheckCircle,
  CreditCard,
  FileText,
  Globe,
  Heart,
  Home,
  LayoutDashboard,
  Mail,
  MapPin,
  Megaphone,
  Monitor,
  MousePointerClick,
  Package,
  Percent,
  Receipt,
  Search,
  Shield,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Tag,
  TrendingUp,
  UserPlus,
  Users,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ServiceButton {
  id: number;
  label: string;
  Icon: LucideIcon;
}

const services: ServiceButton[] = [
  { id: 1, label: "রিসেলিং প্রডাক্ট", Icon: Package },
  { id: 2, label: "প্রডাক্ট সার্চ", Icon: Search },
  { id: 3, label: "রিসেলারের ঘর", Icon: Home },
  { id: 4, label: "ই-কমার্স", Icon: ShoppingBag },
  { id: 5, label: "নাচিড রেজিস্টার", Icon: UserPlus },
  { id: 6, label: "ভেরিফাইড প্রডাক্ট", Icon: CheckCircle },
  { id: 7, label: "মোবাইল রিচার্জ", Icon: Smartphone },
  { id: 8, label: "নিয়োগ বিজ্ঞপ্তি", Icon: FileText },
  { id: 9, label: "যাচাই", Icon: Shield },
  { id: 10, label: "জিমেইল মার্কেটিং", Icon: Mail },
  { id: 11, label: "নতুন প্রডাক্ট", Icon: Sparkles },
  { id: 12, label: "ওয়ালেট", Icon: Wallet },
  { id: 13, label: "ফেভরিট প্রডাক্ট", Icon: Heart },
  { id: 14, label: "লাভের নিশ্চয়তা", Icon: TrendingUp },
  { id: 15, label: "উত্তোলন", Icon: ArrowUpCircle },
  { id: 16, label: "৫% ক্যাশব্যাক", Icon: Percent },
  { id: 17, label: "মাইডেজার", Icon: LayoutDashboard },
  { id: 18, label: "জব লোকেশন", Icon: MapPin },
  { id: 19, label: "বিনিয়োগ", Icon: BarChart2 },
  { id: 20, label: "প্রডাক্ট বিক্রি করুন", Icon: Tag },
  { id: 21, label: "লোন", Icon: Banknote },
  { id: 22, label: "ডিজিটাল সেল", Icon: Monitor },
  { id: 23, label: "পার্টনারশিপ", Icon: Users },
  { id: 24, label: "অনলাইন শপিং", Icon: ShoppingCart },
  { id: 25, label: "এক ক্লিকে সাইন", Icon: MousePointerClick },
  { id: 26, label: "ক্যাশব্যাক অর্ডার সেল", Icon: Receipt },
  { id: 27, label: "আর্থিক প্রডাক্ট", Icon: CreditCard },
  { id: 28, label: "মার্কেটিং প্রডাক্ট", Icon: Megaphone },
  { id: 29, label: "দৈনিক ইনকাম", Icon: CalendarDays },
  { id: 30, label: "অনলাইন নাচিড", Icon: Globe },
];

interface ServiceGridProps {
  onServiceClick: (name: string) => void;
}

export function ServiceGrid({ onServiceClick }: ServiceGridProps) {
  return (
    <div className="mx-3 bg-card rounded-xl p-3 shadow-card">
      <h3 className="text-foreground font-bold text-sm mb-3">আমাদের সেবাসমূহ</h3>
      <div className="grid grid-cols-5 gap-2">
        {services.map((service) => (
          <button
            key={service.id}
            type="button"
            onClick={() => onServiceClick(service.label)}
            className="flex flex-col items-center gap-1 p-2 bg-background rounded-xl shadow-card hover:shadow-elevated transition-smooth active:scale-95 group"
            data-ocid={`service.item.${service.id}`}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-smooth group-hover:scale-110"
              style={{ backgroundColor: "rgba(46,125,50,0.1)" }}
            >
              <service.Icon size={18} style={{ color: "#2e7d32" }} />
            </div>
            <span
              className="text-foreground text-center leading-tight font-medium"
              style={{ fontSize: "9px" }}
            >
              {service.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
