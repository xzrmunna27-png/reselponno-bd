interface ServiceButton {
  id: number;
  label: string;
  color: string;
  iconPath: string;
  action: string;
}

const services: ServiceButton[] = [
  {
    id: 1,
    label: "রিসেলিং প্রোডাক্ট",
    color: "#4CAF50",
    iconPath:
      "M6 2h12a1 1 0 0 1 1 1v1a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V3a1 1 0 0 1 1-1zm-2 7h16v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9zm9-3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 9l2-2 2 2 4-4-1.41-1.41L14 13.17l-2-2-3.41 3.42z",
    action: "resellerProducts",
  },
  {
    id: 2,
    label: "প্রোডাক্ট সার্চ",
    color: "#2196F3",
    iconPath:
      "M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
    action: "productSearch",
  },
  {
    id: 3,
    label: "রিসেলারের গোল",
    color: "#FF9800",
    iconPath:
      "M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8zm0-12a4 4 0 1 0 4 4 4 4 0 0 0-4-4zm0 6a2 2 0 1 1 2-2 2 2 0 0 1-2 2zm0-2.5a.5.5 0 1 1-.5.5.5.5 0 0 1 .5-.5z",
    action: "resellerGoal",
  },
  {
    id: 4,
    label: "ই-কমার্স",
    color: "#E91E63",
    iconPath:
      "M7 18a2 2 0 1 0 2 2 2 2 0 0 0-2-2zm0 0h10a2 2 0 0 0 1.95-1.54L21 7H6L4.27 2H1v2h2l3.6 7.59L5.25 14a2 2 0 0 0 2 2.41h12v-2H7.42l1-2zm10 0a2 2 0 1 0 2 2 2 2 0 0 0-2-2z",
    action: "ecommerce",
  },
  {
    id: 5,
    label: "নাভিদ রেজিস্টার",
    color: "#00BCD4",
    iconPath:
      "M15 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0-6a2 2 0 1 1-2 2 2 2 0 0 1 2-2zm-9 8c0-2.21 3.58-4 8-4 .34 0 .68.01 1.01.04A6 6 0 0 1 21 17v1H6v-4zm-2 0v4H1v-2c0-2.14 2.56-3.91 6-4.45A9.45 9.45 0 0 0 4 14z",
    action: "navidRegister",
  },
  {
    id: 6,
    label: "ভেরিফাইড প্রোডাক্ট",
    color: "#9C27B0",
    iconPath:
      "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z",
    action: "verifiedProducts",
  },
  {
    id: 7,
    label: "মোবাইল রিচার্জ",
    color: "#FF5722",
    iconPath:
      "M17 1H7a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm-5 20a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3.25-5H6.75V4h10.5v12zM13 9h2l-4 6V11H9l4-6v4z",
    action: "mobileRecharge",
  },
  {
    id: 8,
    label: "নিয়োগপ্রাপ্তি",
    color: "#3F51B5",
    iconPath:
      "M20 6h-2.18c.07-.44.18-.88.18-1.35C18 2.99 16.01 1 13.65 1c-1.3 0-2.48.56-3.33 1.44L10 2.76l-.32-.32A4.64 4.64 0 0 0 6.35 1C3.99 1 2 2.99 2 5.35c0 .47.1.9.18 1.35H0v13a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zM11 19H4v-9h7v9zm7 0h-5v-9h5v9z",
    action: "jobHiring",
  },
  {
    id: 9,
    label: "যাচাই",
    color: "#009688",
    iconPath:
      "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17zM19 3H5a2 2 0 0 0-2 2v3h2V5h14v14H5v-3H3v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z",
    action: "verification",
  },
  {
    id: 10,
    label: "জিমেইল মার্কেটিং",
    color: "#F44336",
    iconPath:
      "M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z",
    action: "gmailMarketing",
  },
  {
    id: 11,
    label: "নতুন প্রোডাক্ট",
    color: "#FFC107",
    iconPath:
      "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z",
    action: "newProducts",
  },
  {
    id: 12,
    label: "ওয়ালেট",
    color: "#4CAF50",
    iconPath:
      "M21 18v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v1h-9a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9zm-9-2h10V8H12v8zm4-2.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z",
    action: "wallet",
  },
  {
    id: 13,
    label: "ফেভারিট প্রোডাক্ট",
    color: "#E91E63",
    iconPath:
      "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A6.065 6.065 0 0 1 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
    action: "favoriteProducts",
  },
  {
    id: 14,
    label: "লাভের নিশ্চয়তা",
    color: "#2E7D32",
    iconPath:
      "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm4 8H8v-1c0-2 4-3 4-3s4 1 4 3v1z",
    action: "profitGuarantee",
  },
  {
    id: 15,
    label: "উত্তোলন",
    color: "#673AB7",
    iconPath:
      "M12 2l-5 9h3v9a1 1 0 0 0 2 0v-9h3l-3-9zM19 13v2h2v-2h-2zm0 4v2h2v-2h-2zM3 13v2h2v-2H3zm0 4v2h2v-2H3zm7-9v2a3 3 0 0 0 4 0v-2a3 3 0 0 0-4 0z",
    action: "withdrawal",
  },
  {
    id: 16,
    label: "৫% ক্যাশব্যাক",
    color: "#FF9800",
    iconPath:
      "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.41 14.09v1.3a.5.5 0 0 1-1 0v-1.32c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4.6a.5.5 0 0 1 1 0v1.95c1.86.45 2.79 1.86 2.85 3.39h-1.95c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c0 1.83-1.38 2.83-3.13 3.16z",
    action: "cashback5percent",
  },
  {
    id: 17,
    label: "মাইভোজার",
    color: "#00ACC1",
    iconPath:
      "M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1h2zm-7-5h-4l1 5h2l1-5z",
    action: "myVoucher",
  },
  {
    id: 18,
    label: "জব লোকেশন",
    color: "#795548",
    iconPath:
      "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5zM9.5 9H8V7h1.5V5.5H11V7h1.5v2H11v1.5H9.5V9z",
    action: "jobLocation",
  },
  {
    id: 19,
    label: "বিনিয়োগ",
    color: "#1976D2",
    iconPath:
      "M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99l1.5 1.5zM21 18h-2v2h2v-2zm-4 0h-2v2h2v-2zm-4 0h-2v2h2v-2z",
    action: "investment",
  },
  {
    id: 20,
    label: "প্রোডাক্ট বিক্রি করুন",
    color: "#43A047",
    iconPath:
      "M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01A2 2 0 0 0 3 7v10a2 2 0 0 0 2 2h11c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zm-1.63 9.16H5V7h11l3.55 5-3.55 5z",
    action: "sellProduct",
  },
  {
    id: 21,
    label: "লোন",
    color: "#8D6E63",
    iconPath:
      "M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z",
    action: "loan",
  },
  {
    id: 22,
    label: "ডিজিটাল সেল",
    color: "#F4511E",
    iconPath: "M7 2v11h3v9l7-12h-4l4-8z",
    action: "digitalSale",
  },
  {
    id: 23,
    label: "পার্টনারশিপ",
    color: "#5C6BC0",
    iconPath:
      "M16 11a3 3 0 1 0-6 0 3 3 0 0 0 6 0zm4 2l-3.27-3.27A6.97 6.97 0 0 1 19 13c0 3.31-2.27 6.09-5.35 6.82L12 21l-1.65-1.18A6.99 6.99 0 0 1 5 13a7 7 0 0 1 7-7 6.97 6.97 0 0 1 2.27.37L17.5 4l1.5.5L17 7l3.27 3.27A4.96 4.96 0 0 0 21 13c0-.33-.03-.66-.08-.98L20 11l.92.97A5.002 5.002 0 0 1 20 13zM2 13a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 3 10 10 0 0 0 2 13zm2 0a8 8 0 0 1 8-8 8 8 0 0 1 8 8 8 8 0 0 1-8 8 8 8 0 0 1-8-8z",
    action: "partnership",
  },
  {
    id: 24,
    label: "অনলাইন শপিং",
    color: "#0288D1",
    iconPath:
      "M7 18a2 2 0 1 0 2 2 2 2 0 0 0-2-2zm10 0a2 2 0 1 0 2 2 2 2 0 0 0-2-2zM1 2v2h2l3.6 7.59L5.25 14A2 2 0 0 0 7 16h12v-2H7.42a.25.25 0 0 1-.25-.25l.03-.12.9-1.63H18a2 2 0 0 0 1.75-1.04l3.58-6.49A1 1 0 0 0 22.46 3H5.21L4.27 1H1zm18 0a3 3 0 0 0-3 3c0 .34.07.66.17.97L14.5 7H13a5 5 0 0 0-4.9 4h2.05A3 3 0 0 1 13 9h3.5l-1.93 3.5a.5.5 0 0 0 .43.5H19a3 3 0 1 0 0-6 3 3 0 0 0 0-6zm0 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0 4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z",
    action: "onlineShopping",
  },
  {
    id: 25,
    label: "এক ক্লিক জয়েন",
    color: "#7B1FA2",
    iconPath:
      "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm-1 0a2 2 0 1 0-4 0 2 2 0 0 0 4 0zm-2-10v2a8 8 0 0 1 8 8h2a10 10 0 0 0-10-10zm0 4v2a4 4 0 0 1 4 4h2a6 6 0 0 0-6-6zm1 6h2v2h-2v-2zm0 4h2v2h-2v-2z",
    action: "oneClickJoin",
  },
  {
    id: 26,
    label: "ক্যাশব্যাক অর্ডার সেল",
    color: "#00838F",
    iconPath:
      "M12 4V1L8 5l4 4V6a6 6 0 0 1 6 6 6 6 0 0 1-6 6 6 6 0 0 1-6-6H4a8 8 0 0 0 8 8 8 8 0 0 0 8-8 8 8 0 0 0-8-8zm-1 5v4l3.25 1.95-.75 1.22-4-2.42V9h1.5z",
    action: "cashbackOrderSale",
  },
  {
    id: 27,
    label: "যত আর্থিক প্রোডাক্ট",
    color: "#EF6C00",
    iconPath:
      "M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z",
    action: "financialProducts",
  },
  {
    id: 28,
    label: "মার্কেটিং নিয়ম",
    color: "#546E7A",
    iconPath:
      "M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM9 17H7v-5h2v5zm4 0h-2V7h2v10zm4 0h-2v-3h2v3z",
    action: "marketingRules",
  },
  {
    id: 29,
    label: "দৈনিক ইনকাম",
    color: "#2E7D32",
    iconPath:
      "M19 3h-1V1h-2v2H8V1H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 16H5V8h14v11zm-4-4h-2v2h-2v-2H9v-2h2v-2h2v2h2v2zm-4-6V7h2v2h2v2h-2v-1h-2V9z",
    action: "dailyIncome",
  },
  {
    id: 30,
    label: "অনলাইন নাভিদ প্রো",
    color: "#F57F17",
    iconPath:
      "M12 1l3.09 6.26L22 8.27l-5 4.87 1.18 6.88L12 16.77l-6.18 3.25L7 13.14 2 8.27l6.91-1.01L12 1zm0 2.2L9.47 8.46 3.72 9.27l4.14 4.04-.98 5.7L12 16.28l5.12 2.73-.98-5.7 4.14-4.04-5.75-.81L12 3.2z",
    action: "onlineNavidPro",
  },
];

interface ServiceGridProps {
  onServiceClick: (name: string) => void;
  resellerId: bigint | null;
  onLogout?: () => void;
}

export function ServiceGrid({ onServiceClick }: ServiceGridProps) {
  const handleClick = (service: ServiceButton) => {
    onServiceClick(
      service.action !== "service" ? service.action : service.label,
    );
  };

  return (
    <div className="mx-3 bg-card rounded-xl p-3 shadow-card">
      <h3 className="text-foreground font-bold text-sm mb-3 font-bengali">
        আমাদের সার্ভিস
      </h3>
      <div className="grid grid-cols-5 gap-2">
        {services.map((service) => (
          <button
            key={`svc-${service.id}`}
            type="button"
            onClick={() => handleClick(service)}
            className="flex flex-col items-center gap-1 p-2 bg-white rounded-xl hover:shadow-elevated transition-smooth active:scale-95 group"
            style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.10)" }}
            data-ocid={`service.item.${service.id}`}
          >
            <div
              className="w-13 h-13 rounded-full flex items-center justify-center transition-smooth group-hover:scale-110 flex-shrink-0"
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                backgroundColor: `${service.color}33`,
              }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill={service.color}
                aria-hidden="true"
              >
                <path d={service.iconPath} />
              </svg>
            </div>
            <span
              className="text-center leading-tight font-semibold font-bengali w-full"
              style={{ fontSize: "9px", color: "#212121" }}
            >
              {service.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
