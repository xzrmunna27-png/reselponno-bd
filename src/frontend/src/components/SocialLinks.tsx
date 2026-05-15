const socialLinks = [
  {
    id: "facebook",
    bg: "#1877F2",
    label: "ফেসবুক",
    href: "https://www.facebook.com",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="white"
        aria-hidden="true"
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    id: "youtube",
    bg: "#FF0000",
    label: "ইউটিউব",
    href: "https://www.youtube.com",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="white"
        aria-hidden="true"
      >
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
      </svg>
    ),
  },
  {
    id: "telegram1",
    bg: "#0088CC",
    label: "টেলিগ্রাম ১",
    href: "https://t.me",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="white"
        aria-hidden="true"
      >
        <path d="M21.95 5.005l-3.306 15.594s-.475 1.188-1.781.619l-7.069-5.29-2.569 1.228-.332-4.444 9.613-8.303s.432-.353-.144-.139L5.787 13.55l-3.4-1.053s-1.184-.406-.13-1.225L20.13 4.24s1.087-.59 1.82.765z" />
      </svg>
    ),
  },
  {
    id: "telegram2",
    bg: "#006BA6",
    label: "টেলিগ্রাম ২",
    href: "https://t.me",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="white"
        aria-hidden="true"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8l-1.69 7.96c-.12.58-.46.72-.93.45l-2.58-1.9-1.24 1.2c-.14.14-.25.25-.5.25l.18-2.57 4.65-4.2c.2-.18-.04-.28-.31-.1l-5.74 3.61-2.47-.77c-.54-.17-.55-.54.11-.8l9.65-3.72c.45-.16.84.11.67.79z" />
      </svg>
    ),
  },
];

export function SocialLinks() {
  return (
    <div className="mx-3 bg-card rounded-xl p-4 shadow-card">
      <h3 className="text-foreground font-bold text-sm mb-3 font-bengali">
        সোশ্যাল লিংক
      </h3>
      <div className="flex gap-4">
        {socialLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 hover:opacity-85 transition-smooth active:scale-95"
            data-ocid={`social.${link.id}_link`}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: link.bg }}
            >
              {link.icon}
            </div>
            <span
              className="font-semibold font-bengali"
              style={{ fontSize: "10px", color: "#212121" }}
            >
              {link.label}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
