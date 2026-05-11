import { Send } from "lucide-react";

const socialLinks = [
  {
    id: "facebook",
    bg: "#1877f2",
    label: "Facebook",
    href: "#",
    content: "f",
    isText: true,
  },
  {
    id: "youtube",
    bg: "#ff0000",
    label: "YouTube",
    href: "#",
    content: "▶",
    isText: true,
  },
  {
    id: "telegram",
    bg: "#0088cc",
    label: "Telegram",
    href: "#",
    content: null,
    isText: false,
  },
  {
    id: "share",
    bg: "#2563eb",
    label: "শেয়ার",
    href: "#",
    content: null,
    isText: false,
  },
];

export function SocialLinks() {
  return (
    <div className="mx-3 bg-card rounded-xl p-4 shadow-card">
      <h3 className="text-foreground font-bold text-sm mb-3">সোশ্যাল লিংক</h3>
      <div className="flex gap-3">
        {socialLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-full flex items-center justify-center hover:opacity-85 transition-smooth active:scale-95 flex-shrink-0"
            style={{ backgroundColor: link.bg }}
            aria-label={link.label}
            data-ocid={`social.${link.id}_link`}
          >
            {link.isText ? (
              <span className="text-white font-bold text-base">
                {link.content}
              </span>
            ) : (
              <Send size={18} color="white" />
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
