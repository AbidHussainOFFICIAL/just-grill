# Grilli – Restaurant Website (Next.js + TypeScript + Tailwind CSS)

Single-page restaurant demo site, converted from plain HTML/CSS/JS to Next.js (App Router), TypeScript
and Tailwind CSS v4. The design, animations and transitions are kept identical to the original.

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
    globals.css     MAIN STYLESHEET: Tailwind import, design tokens (@theme), base styles, keyframes
    layout.tsx      fonts, metadata, page frame (preloader, header, footer, back-to-top)
    page.tsx        the home page (sections in order)
    robots.ts, sitemap.ts, icon.svg
  styles/
    components.css  the few reusable classes that need pseudo-elements / hover choreography
                    (.btn, .section-subtitle, .hover-underline, .hover-shine, .input-field, ...)
  components/
    ui/             Button, Icon, Separator, FormStatus
    layout/         Preloader, Topbar, Header, Navbar, Footer, NewsletterForm, BackToTop
    sections/       Hero, Service, About(+Banner), SpecialDish, Menu, Testimonial,
                    Reservation(+Form), Features, Events
  data/             all site content (contact details, menu, events, nav, ...)
  hooks/            header scroll, hero slider, parallax, scroll position
  lib/              form validation, date helper, demo request helper
public/images/      all image assets
```

## How styling works

There is **no CSS file per component**. Styling is split in three places:

1. **Tailwind utility classes in the TSX files.** Layout, spacing, colors, typography and responsive rules.
2. **`src/app/globals.css`.** The design tokens in `@theme` (colors, fonts, font sizes, letter spacing,
   breakpoints, animations), the base reset and the keyframes. Change a token here and the whole site follows.
3. **`src/styles/components.css`.** Only the reusable pieces that are impractical as utilities. They sit in
   Tailwind's `components` layer, so a utility in the markup always overrides them.

Conventions worth knowing:

- **1 spacing unit = 1px.** The root font size is 10px, so `p-20` is 20px, `gap-8` is 8px, `w-285` is 285px.
- **Breakpoints match the original site:** `sm` 575px, `md` 768px, `lg` 992px, `xl` 1200px, `2xl` 1400px.
- **Brand colors:** `gold`, `quick-silver`, `davys-grey`, `smoky-black-1/2/3`, `eerie-black-1/2/3/4`,
  `white-a10/a20`, `black-a15/a80`, `error`.
- **Type scale:** `text-display-1`, `text-headline-1/2`, `text-title-1..4`, `text-body-1..4`,
  `text-label-1/2`. Headings use `font-forum`; everything else uses the default DM Sans.
- **Transitions:** `trans-fast` (250ms), `trans-base` (500ms), `trans-slow` (1000ms), all `ease`.
- **`hover:` works on touch screens** (`@custom-variant hover` in globals.css), like the original CSS.
- **Use `[transform:...]`, not `scale-*` / `rotate-*`, on anything that is animated with `transform`.**
  Tailwind's `scale-*`/`rotate-*` use separate CSS properties that would _add_ to an animation instead of
  being replaced by it (see the hero reveal and the spinning diamonds).

## Forms (demo)

The reservation and newsletter forms are validated in the browser (react-hook-form + zod): red borders,
an error message above the button, and focus on the first invalid field. On success they show a message that
says this is a demo. **Nothing is sent or stored.** `src/lib/demo.ts` only waits a moment to mimic a request.

When the site goes live, replace `simulateRequest()` with a real request (a server action or API route).

## Before going live

1. Replace the dummy content in `src/data/` (phone numbers, emails, hours, address, menu, events) and the
   section copy.
2. Set `NEXT_PUBLIC_SITE_URL` in your hosting settings (see `.env.example`).
3. Replace the placeholder links (`#`) such as "Our Chefs", "Read More" and the social links.
4. Update the credit link in `src/data/site.ts` and the copyright holder in `LICENSE`.
5. Add structured data (schema.org `Restaurant`) once the real address and hours are final.
6. Make the forms real (and add rate limiting or a CAPTCHA).

## Accessibility notes

- Skip link, keyboard-closable mobile menu (Esc), focus returns to the menu button.
- Users with "reduce motion" enabled get no animations or parallax.
- Decorative images use empty `alt` text; form fields have accessible labels.
