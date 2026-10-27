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
- [ ] Phase 8 – accessibility, SEO, performance pass

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
