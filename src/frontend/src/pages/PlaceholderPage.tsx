import type { LucideIcon } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  Icon: LucideIcon;
  description: string;
}

export function PlaceholderPage({
  title,
  Icon,
  description,
}: PlaceholderPageProps) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-6 py-16 text-center">
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5"
        style={{ backgroundColor: "rgba(46,125,50,0.1)" }}
      >
        <Icon size={36} style={{ color: "#2e7d32" }} />
      </div>
      <h2 className="text-foreground font-bold text-xl mb-2">{title}</h2>
      <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
        {description}
      </p>
    </div>
  );
}
