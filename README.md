# Grilli – Restaurant Website (Next.js + TypeScript + Tailwind CSS)

Single-page restaurant demo site, converted from plain HTML/CSS/JS to Next.js (App Router), TypeScript
and Tailwind CSS v4, and built on the Grilli brand kit: colour, typography, spacing and radius, iconography.

> This is a **demo**: all content is dummy text and the forms never send anything.

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
npm run typecheck
npm run lint
npm run build
npm run format       # Prettier (also sorts Tailwind classes)
```

## Structure

```
src/
  app/
    globals.css     MAIN STYLESHEET: every design token (@theme), type roles, base styles, keyframes
    layout.tsx      fonts, metadata, page frame (preloader, header, footer, back-to-top)
    page.tsx        the home page (sections in order)
    robots.ts, sitemap.ts, icon.svg
  styles/
    components.css  the reusable classes that need pseudo-elements / hover choreography
                    (.btn, .section-subtitle, .hover-underline, .hover-shine, .input-field, ...)
  components/
    ui/             Button, Icon, Separator, FormStatus
    layout/         Preloader, Topbar, OpenStatus, Header, Navbar, Footer, NewsletterForm, BackToTop
    sections/       Hero, Service, About(+Banner), SpecialDish, Menu, Chefs, Testimonial,
                    Reservation(+Form), Features, Events
  data/             all site content (contact details, menu, events, nav, ...)
  hooks/            header scroll, hero slider, parallax, scroll position, active nav section, open status
  lib/              form validation, date helper, opening-hours logic, demo request helper
docs/brand-kit/     the four brand kit pages (colour, typography, spacing and radius, iconography)
docs/design-tokens.json   every token in one file (generated, do not edit)
docs/kit-audit.md   what was checked against each kit and what was fixed
public/images/      all image assets
```

## The brand kit in the code

There is no CSS file per component. Styling lives in three places: Tailwind utility classes in the TSX
files, the tokens and type roles in `src/app/globals.css`, and the reusable classes in `src/styles/components.css`.
The four kit pages in `docs/brand-kit/` are the specification; this section maps them to code.

### Colour (`--color-*`)

| Use             | Tokens                                                                                                                                                              | Utility examples                     |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| Surfaces        | `surface-0` ink (sections, footer, drawer), `surface-1` base (page), `surface-2` raised (inputs, solid header), `surface-3` hover and disabled, `surface-4` pressed | `bg-surface-0`                       |
| Lines           | `line-subtle` (dividers), `line-ui` (input borders, 3:1)                                                                                                            | `border-line-subtle`                 |
| Text            | `fg-strong` (headings), `fg-body`, `fg-muted`, `fg-faint` (placeholders, old prices)                                                                                | `text-fg-muted`                      |
| Brand           | `gold-50` to `gold-950` (gold-400 is the brand gold)                                                                                                                | `text-gold-400`, `hover:bg-gold-300` |
| Secondary       | `claret-50` to `claret-950` (fills and tags only, up to 2% of a page)                                                                                               | `bg-claret-600`                      |
| Status          | `success`, `warning`, `error`, `info`, each `-tint`, `-border`, `-solid`, `-text`                                                                                   | `bg-error-tint text-error-text`      |
| Light colourway | `paper`, `ink`, `warm-50` to `warm-950` (print, menus, profile)                                                                                                     |                                      |
| Scrims          | `scrim-light`, `scrim-default`, `scrim-heavy` (ink at 40, 60, 80%)                                                                                                  | `bg-scrim-heavy`                     |

Old token names were replaced: `smoky-black-*` and `eerie-black-*` became the surfaces, `quick-silver` became
`fg-muted`, `davys-grey` became `fg-faint`, `white-a10/a20` became `line-ui` and `line-subtle`.

### Typography (Forum + DM Sans)

- Root is `62.5%` (1rem = 10px by default, and it follows the visitor's text-size setting).
- Ten fluid size tokens `--text-xs` to `--text-6xl` (375px to 1440px, rem plus vw).
- Eleven roles, applied as classes. Colour is set separately.

| Role           | Face        | Used for                                                      |
| -------------- | ----------- | ------------------------------------------------------------- |
| `t-display`    | Forum       | Hero headline                                                 |
| `t-heading`    | Forum       | Section titles                                                |
| `t-subheading` | Forum       | Testimonial quote                                             |
| `t-card-title` | Forum       | Service titles, newsletter title                              |
| `t-item-title` | Forum       | Menu names and prices, feature and event titles               |
| `t-figure`     | DM Sans 500 | Phone numbers, special price                                  |
| `t-lead`       | DM Sans     | Sub-lines under headlines                                     |
| `t-body`       | DM Sans     | Paragraphs (the page default: line height 1.65, +0.01em)      |
| `t-small`      | DM Sans     | Card text, top bar                                            |
| `t-label`      | DM Sans 600 | Navigation, buttons, tags, dates (uppercase, tracking `--ls`) |
| `t-overline`   | DM Sans 600 | Section subtitles (uppercase, wide tracking)                  |

Forum is confined to the first five roles and never used below about 18px. Inline links inside a sentence use
`.link-inline` (gold-400, 500, underlined, hover gold-300). Menu prices are Forum (`t-item-title`); the special-dish
price is `t-figure`. Weights loaded: Forum 400;
DM Sans 400, 500, 600.

### Spacing, radius, borders, z-index, containers

- 4px grid: `--spacing: 0.4rem`, so one unit is 4px (`p-4` = 16px). Core steps 1 to 16 (4 to 64px), layout steps
  18, 20, 24, 30, 40, 50 (72 to 200px). Named single-value roles: `inline-xs` (4), `inline-sm` (8), `gutter` (16),
  `field` (20), `section` (72, 96 from 992px), `hero` (120), `overlap` (272), for example `gap-inline-sm` or `py-hero`.
  The other roles are ranges that use the numbered scale: stack 8 to 40, inset 12 to 48 (card padding 16 to 20,
  button vertical 20, panels 32 to 48).
- Radius: square by default, `rounded-card` (24px, dish thumbnails only), `rounded-circle` (50%).
- Border widths: `--border-hairline` 1px (`border`), `--border-strong` 2px (`border-2`, buttons), `--border-spinner` 3px (`border-spinner`).
- Z-index layers (variables `--z-*`): `z-behind` -1, `z-raised` 1, `z-sticky` 100, `z-overlay` 200, `z-drawer` 210, `z-preloader` 900, `z-skip` 1000.
- Containers: `max-w-page` 1200, `max-w-tablet` 820, `max-w-phone` 420, `max-w-measure` 420, `max-w-narrow` 460,
  `max-w-quote` 910, `max-w-drawer` 360. Breakpoints: sm 575, md 768, lg 992, xl 1200, 2xl 1400.
- Motion: `trans-fast` 250ms, `trans-base` 500ms, `trans-slow` 1000ms, easing `ease`; hero slide 7s (`HERO_INTERVAL_MS`).
- Touch targets: 44px for the drawer close button, hamburger and nav links; 48px back-to-top.
- Derived, never typed: the testimonial bottom padding is `overlap + section`; the special dish text block is
  centred with flex; the drawer offset comes from `--container-drawer`.

Named exceptions: the 5px underline geometry (decorative), the 7rem decorative quote mark (the only Forum use outside the five roles), the 3px preloader ring, the
208px right padding of the newsletter field (must stay wider than the Subscribe button), and image-based
widths (140px pattern, 284px photo).

### Icons (Lucide)

One library, outline style, 24px grid. Use the `Icon` component: sizes 16, 20, 24, 32, 48, 64; rendered stroke
1.5px up to 24px and 2px from 32px; colour is always `currentColor`. Category icons (salad, armchair, chef hat,
party popper) replace the four gold images; more are available (coffee, utensils, wine). Icons carry no meaning
alone: status icons always come with words.

### Button states

| Variant (`variant=`)     | Default                         | Hover                                                                     | Pressed               | Disabled                     |
| ------------------------ | ------------------------------- | ------------------------------------------------------------------------- | --------------------- | ---------------------------- |
| outlined (default)       | gold-400 outline and label      | gold-400 circle fills in, ink label                                       | gold-500 fill         | line-ui outline, faint label |
| `secondary` (solid gold) | gold-400, ink label (11.7:1)    | ink circle sweeps in, gold outline stays, ivory label (the original look) | surface-2             | flat surface-3, faint label  |
| `claret`                 | claret-600, ivory label (6.1:1) | claret-hover (5.0:1)                                                      | claret-700 (8.5:1)    | flat surface-3               |
| `danger`                 | error-solid, ink label (5.0:1)  | danger-hover (6.1:1)                                                      | danger-active (4.5:1) | flat surface-3               |

Focus ring on every control: 2px gold-300, 2px offset. Text fields are the exception: the border itself turns gold and
thickens to 2px (no second ring). Status messages (`FormStatus`) come in four tones
(success, warning, error, info), each with tint, border, text and icon from the status tokens, always icon plus words.

### Light colourway

`paper`, `ink`, `gold-800` are used by the print stylesheet in `globals.css`: printed pages drop the dark theme and
the page chrome. Menus, receipts and the Google profile should use the same three colours.

### No gradient text

The preloader word pulses softly in ink instead of shimmering through a gradient (the kit forbids gradient text).

## Header and navigation

Decisions and research are in `docs/header-nav.md`. In short:

- **Nav:** Home, Menus, About Us, Our Chefs, Reservations. Every link goes to a real section (`#chefs` is new).
  The active link follows the scroll position.
- **Top bar (from 575px):** the address on the left (from 992px). On the right, together: the hours (from 992px), an
  "Open now · until 10:00 pm" or "Closed · opens 8:00 am" status, and the phone number. The status is worked out from
  `siteConfig.openingHours`, in the restaurant's own time zone, and refreshes every minute (below 1200px it shows just
  "Open now" or "Closed"). Change the hours in `src/data/site.ts` and the text lines next to them. The drawer shows the status too.
- **Phones:** the header is the logo and the menu button. Reserve and Call are pinned to the bottom of the menu, within
  thumb reach; the hero also has its Book A Table badge.
- **Header on scroll:** it slides away when scrolling down and back when scrolling up. It stays visible while the menu is open
  and while a keyboard user has focus inside it, so focus is never hidden. Anchor jumps land 96px below the top
  (`--header-offset`), clear of the header.
- **Menu drawer:** `aria-controls`, a labelled `nav`, Tab stays inside while it is open, Esc closes it, focus returns to the
  menu button, and it closes if the window is widened past 1200px.
- **Menu button:** the original looping three-line animation. The close button's visible circle is 36px with a
  16px icon; its tappable area stays 44px.
- **Our Chefs:** `src/data/chefs.ts`. Add `image: "/images/chef-1.jpg"` (3:4) to a chef to replace the gold placeholder.

## Forms (demo)

The reservation and newsletter forms are validated in the browser (react-hook-form + zod): red borders, a tinted
alert with icon and words, and focus on the first invalid field. On success they say this is a demo.
**Nothing is sent or stored.** `src/lib/demo.ts` only waits a moment to mimic a request.

## Checking the styling

```bash
npm run build
npm run check:classes   # lists Tailwind classes that produced no CSS (typos, missing tokens)
npm run tokens          # rewrites docs/design-tokens.json from globals.css (the single source of truth)
npm run tokens:check    # fails if docs/design-tokens.json is out of date
```

`npm run compare` (Playwright) compares the site with the original HTML version. Since the brand kit changed colours,
type, spacing and icons on purpose, expect differences; use it to spot unintended ones.

## Before going live

1. Replace the dummy content in `src/data/` and the section copy.
2. Set `NEXT_PUBLIC_SITE_URL` (only for a custom domain) and `NEXT_PUBLIC_ALLOW_INDEXING=true` (see `.env.example`).
3. Replace the placeholder links (`#`).
4. Update the credit link in `src/data/site.ts` and the copyright holder in `LICENSE`.
5. Add structured data (schema.org `Restaurant`) once the address and hours are final.
6. Make the forms real, with rate limiting or a CAPTCHA.

## Accessibility notes

- Skip link, keyboard-closable mobile menu (Esc), focus returns to the menu button, visible focus ring everywhere.
- Users with "reduce motion" enabled get no animations or parallax.
- Contrast: body text 12:1 or more, muted text 7:1 or more, input borders 3:1, status icons with words.
- Touch targets of 44px where space allows (24px AA minimum everywhere).
