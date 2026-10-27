# Grilli – Restaurant Website (Next.js + TypeScript)

Single-page restaurant site, converted from plain HTML/CSS/JS to Next.js (App Router) and TypeScript.
The design, animations and transitions are kept identical to the original.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run lint
npm run build
```

Copy `.env.example` to `.env.local` and fill it in only if you want the forms to send real emails.

## Structure

```
src/
  app/          layout, page, global styles (tokens, reset, typography, shared utilities)
  components/
    ui/         Button, Icon
    layout/     Preloader, Topbar, Header, Footer, BackToTop      (next phase)
    sections/   Hero, Service, About, SpecialDish, Menu, ...      (next phase)
  data/         all site content (contact details, menu, events, nav, ...)
  hooks/        scroll / slider / parallax behaviour               (next phase)
  lib/          form validation and email helper                   (next phase)
  types/        shared TypeScript types
public/images/  all image assets
```

## Status

- [x] Phase 1 – project setup and config
- [x] Phase 2 – global styles, fonts, layout
- [x] Phase 3 – shared UI (Button, Icon) and typed content data
- [x] Phase 4 – layout components (preloader, topbar, header + nav, footer, back-to-top)
- [x] Phase 5 – all page sections
- [x] Phase 6 – behaviour hooks (header scroll, hero slider, parallax)
- [x] Phase 7 – forms (validation, server actions, optional email via Resend)
- [x] Phase 8 – accessibility, SEO, security headers, lint migration

## Forms

Both forms (reservation and newsletter) are validated in the browser (react-hook-form + zod) and again on the
server (`src/app/actions.ts`). A hidden honeypot field catches simple bots.

Emails are sent with [Resend](https://resend.com) when these variables are set (see `.env.example`):

```
RESEND_API_KEY=
BOOKING_TO_EMAIL=      # where reservations and signups are sent
BOOKING_FROM_EMAIL=    # a sender address on a domain verified in Resend
```

- In development without them, submissions are logged in the terminal and shown as successful.
- In production without them, visitors see an error, so a booking is never lost silently.
- Before real traffic, add rate limiting or a CAPTCHA. For a real newsletter, connect an email-list service instead of notification emails.

## Before going live

1. Replace the dummy content in `src/data/` (phone numbers, emails, opening hours, address, menu, events) and the section copy.
2. Set `NEXT_PUBLIC_SITE_URL` and the Resend variables in your hosting provider (e.g. Vercel project settings).
3. Replace the placeholder links (`#`) such as "Our Chefs", "Read More" and the social links when those pages exist.
4. Update the credit link in `src/data/site.ts` and the copyright holder in `LICENSE`.
5. Add structured data (schema.org `Restaurant`) once the real address and hours are final.
6. Add rate limiting or a CAPTCHA to the forms.

## Accessibility notes

- Skip link, keyboard-closable mobile menu (Esc), focus returns to the menu button.
- Users with "reduce motion" enabled get no animations or parallax.
- Decorative images use empty `alt` text; form fields have accessible labels.
