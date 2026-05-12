interface ServiceButton {
  id: number;
  label: string;
  emoji: string;
  bg: string;
  action: string;
}

const COLORS = [
  "#1b5e20",
  "#0d47a1",
  "#e65100",
  "#4a148c",
  "#b71c1c",
  "#00695c",
  "#880e4f",
];

const services: ServiceButton[] = [
  {
    id: 1,
    label:
      "\u09b0\u09bf\u09b8\u09c7\u09b2\u09bf\u0982 \u09aa\u09cd\u09b0\u09a1\u09be\u0995\u09cd\u099f",
    emoji: "\uD83D\uDED8",
    bg: COLORS[0],
    action: "resellerProducts",
  },
  {
    id: 2,
    label:
      "\u09ae\u09cb\u09ac\u09be\u0987\u09b2 \u09b0\u09bf\u099a\u09be\u09b0\u09cd\u099c",
    emoji: "\uD83D\uDCF1",
    bg: COLORS[1],
    action: "recharge",
  },
  {
    id: 3,
    label:
      "\u09a8\u09bf\u09af\u09bc\u09cb\u0997 \u09ac\u09bf\u099c\u09cd\u099e\u09aa\u09cd\u09a4\u09bf",
    emoji: "\uD83D\uDCCB",
    bg: COLORS[2],
    action: "jobNotice",
  },
  {
    id: 4,
    label: "\u099f\u09be\u0995\u09be \u09aa\u09be\u09a0\u09be\u09a8",
    emoji: "\uD83D\uDCB8",
    bg: COLORS[3],
    action: "service",
  },
  {
    id: 5,
    label: "\u09ac\u09bf\u09b2 \u09aa\u09c7\u09ae\u09c7\u09a8\u09cd\u099f",
    emoji: "\uD83D\uDCA1",
    bg: COLORS[4],
    action: "service",
  },
  {
    id: 6,
    label: "\u0995\u09c7\u09a8\u09be\u0995\u09be\u099f\u09be",
    emoji: "\uD83D\uDED2",
    bg: COLORS[5],
    action: "resellerProducts",
  },
  {
    id: 7,
    label:
      "\u0985\u09b0\u09cd\u09a1\u09be\u09b0 \u099f\u09cd\u09b0\u09cd\u09af\u09be\u0995",
    emoji: "\uD83D\uDCE6",
    bg: COLORS[6],
    action: "order",
  },
  {
    id: 8,
    label:
      "\u09ac\u09cd\u09af\u09be\u09b2\u09c7\u09a8\u09cd\u09b8 \u099a\u09c7\u0995",
    emoji: "\uD83D\uDCB0",
    bg: COLORS[0],
    action: "balance",
  },
  {
    id: 9,
    label: "\u09b0\u09bf\u09b8\u09c7\u09b2\u09be\u09b0 \u09b9\u09cb\u09a8",
    emoji: "\uD83D\uDC64",
    bg: COLORS[1],
    action: "reseller",
  },
  {
    id: 10,
    label: "\u0986\u09ae\u09be\u09b0 \u0985\u09b0\u09cd\u09a1\u09be\u09b0",
    emoji: "\uD83D\uDCCB",
    bg: COLORS[2],
    action: "order",
  },
  {
    id: 11,
    label: "\u09ab\u09cd\u09af\u09be\u09b6\u09a8",
    emoji: "\uD83D\uDC57",
    bg: COLORS[3],
    action: "resellerProducts",
  },
  {
    id: 12,
    label:
      "\u0987\u09b2\u09c7\u0995\u099f\u09cd\u09b0\u09a8\u09bf\u0995\u09cd\u09b8",
    emoji: "\uD83D\uDCDF",
    bg: COLORS[4],
    action: "resellerProducts",
  },
  {
    id: 13,
    label: "\u099f\u09bf-\u09b6\u09be\u09b0\u09cd\u099f",
    emoji: "\uD83D\uDC55",
    bg: COLORS[5],
    action: "resellerProducts",
  },
  {
    id: 14,
    label: "\u09ae\u09cb\u09ac\u09be\u0987\u09b2 \u09ab\u09cb\u09a8",
    emoji: "\uD83D\uDCF2",
    bg: COLORS[6],
    action: "resellerProducts",
  },
  {
    id: 15,
    label: "\u09b9\u09c7\u09a1\u09ab\u09cb\u09a8",
    emoji: "\uD83C\uDFA7",
    bg: COLORS[0],
    action: "resellerProducts",
  },
  {
    id: 16,
    label: "\u098f\u0995\u09b8\u09c7\u09b8\u09b0\u09bf\u099c",
    emoji: "\uD83D\uDD0C",
    bg: COLORS[1],
    action: "resellerProducts",
  },
  {
    id: 17,
    label: "\u09ab\u09c7\u09b8\u09ac\u09c1\u0995 \u09b2\u09bf\u0982\u0995",
    emoji: "\uD83D\uDCD8",
    bg: COLORS[2],
    action: "facebook",
  },
  {
    id: 18,
    label: "\u0987\u0989\u099f\u09bf\u0989\u09ac",
    emoji: "\uD83C\uDFAC",
    bg: COLORS[3],
    action: "youtube",
  },
  {
    id: 19,
    label: "\u099f\u09c7\u09b2\u09c7\u0997\u09cd\u09b0\u09be\u09ae",
    emoji: "\u2708\uFE0F",
    bg: COLORS[4],
    action: "telegram",
  },
  {
    id: 20,
    label: "\u09b8\u09be\u09aa\u09cb\u09b0\u09cd\u099f",
    emoji: "\uD83C\uDFAF",
    bg: COLORS[5],
    action: "service",
  },
  {
    id: 21,
    label:
      "\u09a8\u09a4\u09c1\u09a8 \u09aa\u09cd\u09b0\u09a1\u09be\u0995\u09cd\u099f",
    emoji: "\uD83C\uDD95",
    bg: COLORS[6],
    action: "resellerProducts",
  },
  {
    id: 22,
    label: "\u0985\u09ab\u09be\u09b0",
    emoji: "\uD83C\uDFF7\uFE0F",
    bg: COLORS[0],
    action: "service",
  },
  {
    id: 23,
    label: "\u0989\u0987\u09a5\u09a1\u09cd\u09b0",
    emoji: "\uD83C\uDFE6",
    bg: COLORS[1],
    action: "service",
  },
  {
    id: 24,
    label: "\u099f\u09aa \u0986\u09aa",
    emoji: "\u2795",
    bg: COLORS[2],
    action: "service",
  },
  {
    id: 25,
    label: "\u09b0\u09c7\u09ab\u09be\u09b0 \u0995\u09b0\u09c1\u09a8",
    emoji: "\uD83E\uDD1D",
    bg: COLORS[3],
    action: "service",
  },
  {
    id: 26,
    label:
      "\u09a1\u09c7\u09b2\u09bf\u09ad\u09be\u09b0\u09bf \u099f\u09cd\u09b0\u09cd\u09af\u09be\u0995",
    emoji: "\uD83D\uDE9A",
    bg: COLORS[4],
    action: "order",
  },
  {
    id: 27,
    label:
      "\u09b0\u09bf\u099f\u09be\u09b0\u09cd\u09a8 \u09aa\u09b2\u09bf\u09b8\u09bf",
    emoji: "\uD83D\uDCC4",
    bg: COLORS[5],
    action: "service",
  },
  {
    id: 28,
    label:
      "\u09aa\u09c7\u09ae\u09c7\u09a8\u09cd\u099f \u09aa\u09a6\u09cd\u09a7\u09a4\u09bf",
    emoji: "\uD83D\uDCB3",
    bg: COLORS[6],
    action: "service",
  },
  {
    id: 29,
    label:
      "\u0986\u09ae\u09be\u09a6\u09c7\u09b0 \u09b8\u09ae\u09cd\u09aa\u09b0\u09cd\u0995\u09c7",
    emoji: "\u2139\uFE0F",
    bg: COLORS[0],
    action: "service",
  },
  {
    id: 30,
    label: "\u09b2\u0997 \u0986\u0989\u099f",
    emoji: "\uD83D\uDEAA",
    bg: COLORS[1],
    action: "logout",
  },
];

interface ServiceGridProps {
  onServiceClick: (name: string) => void;
  resellerId: bigint | null;
  onLogout?: () => void;
}

export function ServiceGrid({ onServiceClick, onLogout }: ServiceGridProps) {
  const handleClick = (service: ServiceButton) => {
    if (service.action === "logout") {
      onLogout?.();
      return;
    }
    if (service.action === "facebook") {
      window.open("https://www.facebook.com", "_blank");
      return;
    }
    if (service.action === "youtube") {
      window.open("https://www.youtube.com", "_blank");
      return;
    }
    if (service.action === "telegram") {
      window.open("https://t.me", "_blank");
      return;
    }
    onServiceClick(
      service.action !== "service" ? service.action : service.label,
    );
  };

  return (
    <div className="mx-3 bg-card rounded-xl p-3 shadow-card">
      <h3 className="text-foreground font-bold text-sm mb-3 font-bengali">
        আমাদের সেবাসমূহ
      </h3>
      <div className="grid grid-cols-5 gap-2">
        {services.map((service) => (
          <button
            key={`svc-${service.id}`}
            type="button"
            onClick={() => handleClick(service)}
            className="flex flex-col items-center gap-1 p-2 bg-background rounded-xl shadow-card hover:shadow-elevated transition-smooth active:scale-95 group"
            data-ocid={`service.item.${service.id}`}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-smooth group-hover:scale-110"
              style={{ backgroundColor: `${service.bg}22` }}
            >
              <span
                className="text-xl leading-none"
                style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.2))" }}
              >
                {service.emoji}
              </span>
            </div>
            <span
              className="text-foreground text-center leading-tight font-semibold font-bengali w-full"
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
