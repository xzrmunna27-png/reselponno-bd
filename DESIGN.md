# Design Brief — Reselponno BD Major Upgrade

## Direction

Professional Bengali-language reseller marketplace with vibrant hero carousel, login form, admin dashboard. Green primary + gold accents = premium B2B trust. Mobile-first 480px, high-contrast Bengali typography.

## Tone

Vibrant professional — decisive, trustworthy, optimized for Bengali script readability. Hero carousel showcases products with energy; login and admin remain clean and focused.

## Differentiation

Green + gold duality signals premium reseller ecosystem. Carousel transitions, high-contrast inputs, integrated logo create immediate brand recognition for South Asian B2B marketplace dominance.

## Color Palette

| Token | OKLCH | Hex | Role |
| --- | --- | --- | --- |
| primary | 0.52 0.18 145 | #2e7d32 | Trusted green, primary actions |
| secondary | 0.65 0.18 55 | #c0b86b | Premium gold, highlights & accents |
| accent | 0.48 0.22 20 | #c0392b | Urgent red, alerts & warnings |
| background | 0.99 0.002 0 | #ffffff | Pure white, content surface |
| foreground | 0.12 0.01 180 | #1a1a1a | Deep charcoal, high contrast text |
| card | 1.0 0 0 | #ffffff | Elevated white surfaces |
| input | 0.96 0.003 0 | #f5f5f5 | Light grey, form fields |
| muted | 0.93 0.003 0 | #eeeeee | Secondary surfaces |

## Typography

Display: Space Grotesk (bold, h1 `text-4xl md:text-6xl`, h2 `text-2xl md:text-3xl`) | Body: Satoshi (clear Bengali rendering, `text-base`) | Mono: JetBrains Mono (admin dashboards) | High-contrast rule: all text minimum `text-foreground` (#1a1a1a)

## Elevation & Depth

Subtle shadow system: `shadow-card` (2px/8px) for cards, `shadow-elevated` (4px/16px) for modals, `shadow-card-hover` (4px/12px) on hover. No glassmorphism or complex layering.

## Structural Zones

| Zone | Background | Border | Notes |
| --- | --- | --- | --- |
| Header | Primary green (0.52 0.18 145) | None | Logo, title, white text, full-width |
| Carousel | White (0.99 0.002 0) | None | 5-6 auto-rotating slides, dot indicators |
| Login Form | White (0.99 0.002 0) | `border-border` | Centered card, logo above, high-contrast inputs |
| Product Cards | White (1.0 0 0) | 1px `--border` | `shadow-card`, 12px radius, gold accent strip |
| Admin Sidebar | Light green (0.96 0.005 145) | `border-r` | Logo, nav, gold on active states |
| Footer | Primary green (0.52 0.18 145) | `border-t` | White text, navigation, copyright |

## Component Patterns

`.btn-primary` (green, white text) | `.btn-accent` (red) | `.btn-secondary` (green outline). All 12px radius, `px-4 py-2`, `transition-smooth`. `.card-bordered` white bg, `shadow-card`, 1px border. Input: light grey bg, dark text, green focus ring (3px). `.badge-success` (green) | `.badge-warning` (red), rounded-full, `text-xs`.

## Motion & Interaction

Carousel: auto-rotate every 5s, dot nav, 0.5s smooth transitions. Buttons: `hover:opacity-90`, `active:scale-95`. Cards: `hover:shadow-card-hover`. All sections: `animation-fade-in` (0.3s) on load. No decorative animations — all motion serves UX clarity.

## Constraints

Mobile-first: 480px max-width on desktop, full-width on mobile. All UI text in Bangla script. High-contrast: no grey text on white. No background gradients (gradients only on buttons/text via `.gradient-primary`). Carousel auto-advances; users tap dots to jump slides.

## Signature Details

1. **Integrated logo**: Reselponno BD (green + gold) in header and above login
2. **Carousel indicators**: Visible dots, smooth 0.5s transitions, auto-advance every 5s
3. **Green + gold duality**: Trust (green) + premium tier (gold) signals professional B2B
4. **High-contrast inputs**: Dark placeholders on light grey, green focus ring
