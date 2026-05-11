# Design Brief

## Direction

RESELPONNO (রিসেলার BD) — A professional Bengali-language reseller marketplace portal designed for B2B efficiency and trust. Clean, functional, and distinctly Indian-market focused.

## Tone

Professional minimalism with decisive action affordances. No decorative elements, pure functionality optimized for Bengali script readability and mobile commerce.

## Differentiation

Bengali-first interface with high-contrast green and red branding creates immediate trust for South Asian resellers; uncluttered card-based layout prioritizes clarity over decoration.

## Color Palette

| Token | OKLCH | Role |
| --- | --- | --- |
| background | 0.99 0.002 0 | Pure white, optimal for text clarity |
| foreground | 0.15 0.008 0 | Deep charcoal, high contrast on white |
| card | 1.0 0 0 | Elevated white surfaces |
| primary | 0.52 0.18 145 | Trusted green (#2e7d32), primary actions |
| accent | 0.48 0.22 20 | Urgent red (#c0392b), alerts & CTAs |
| muted | 0.94 0.005 0 | Light grey, secondary surfaces |
| border | 0.92 0.004 0 | Subtle dividers |

## Typography

- Display: Space Grotesk — modern sans, strong headlines and UI labels (পণ্য = boldness)
- Body: Satoshi — clear and legible body copy, forms, and Bengali text (content readability)
- Scale: hero `text-4xl md:text-6xl font-bold`, h2 `text-2xl md:text-3xl font-bold`, label `text-xs font-semibold uppercase`, body `text-base`

## Elevation & Depth

Subtle shadow hierarchy: cards receive `shadow-card` (2px/8px blur), modals and elevated surfaces receive `shadow-elevated` (4px/16px blur). No complex layering—depth communicates priority.

## Structural Zones

| Zone | Background | Border | Notes |
| --- | --- | --- | --- |
| Header (banner) | Primary green (0.52 0.18 145) | None | White text, Bengali logo/title, full-width |
| Content (main) | White background (0.99 0.002 0) | None | Mobile-first 480px max on desktop, alternating card sections |
| Card sections | White with `shadow-card` | `border-border` (1px) | 12px border-radius, padding `p-4 md:p-6` |
| Footer | Green (0.52 0.18 145) | `border-t border-primary/30` | White text, navigation links, copyright |

## Spacing & Rhythm

Mobile-first spacing: 1rem gaps between sections, 0.75rem between card groups. 12px border-radius on all cards. Consistent 16px padding on cards across mobile/desktop breakpoint (480px max-width on desktop).

## Component Patterns

- **Buttons**: Primary (green bg, white text), Destructive (red bg), Secondary (white bg with green border, green text). Radius 12px, padding `px-4 py-2`.
- **Cards**: White background with `shadow-card`, 12px radius, 1px border in `--border`, content padding `p-4 md:p-6`.
- **Badges**: Green background for status, red for warnings. Rounded pill shape, inline text.
- **Inputs**: Light grey background (`--input`), dark text, 12px radius, focus ring in green.

## Motion

- **Entrance**: Buttons and cards fade in on load via `transition-smooth` (0.3s ease-out).
- **Hover**: Buttons darken slightly, cards gain `shadow-elevated`.
- **Decorative**: None — pure functional transitions for accessibility and performance.

## Constraints

- Mobile-first: 480px max-width on desktop, full-width on mobile.
- Bengali typography must maintain clarity at all sizes; Space Grotesk renders numerals and symbols consistently.
- No gradients, animations, or glassmorphism — high-trust, professional aesthetic.
- All text strings must be Bengali (Bangla script) — no English UI text in primary interface.

## Signature Detail

Green and red duality (trust + urgency) creates visual shorthand for marketplace actions; the banner header in green with white text establishes immediate brand authority for reseller-focused B2B commerce in South Asia.
