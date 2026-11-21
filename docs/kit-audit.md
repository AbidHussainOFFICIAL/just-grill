# Brand kit audit log

Each kit page in `docs/brand-kit/` is checked against the code, one at a time.

## 1. Colour kit 2: checked

Verified by script: every colour in the kit (surfaces, lines, text, gold, claret and warm ramps, four status sets,
paper, ink) equals its token in `src/app/globals.css`. No old token names remain; no pure black or white is used.

Gaps found and fixed:

- Button states: only the gold variants existed. Added `claret` and `danger` with the kit's default, hover and
  pressed colours, and corrected the disabled state (outlined = line-ui outline with faint text; solid = flat grey).
- Status messages: only success and error existed. `FormStatus` now has all four tones (success, warning, error, info).
- Gradient text: the preloader word used a gradient clipped to the letters, which the kit forbids. It is now solid
  ink with a soft pulse.
- Light colourway: the paper, ink and gold-800 tokens were not used anywhere. They now drive a print stylesheet.

Documented, not applied (guidance for future work, nothing on the page would use them yet):

- The optional claret interlude band (the kit says at most one per page, optional).
- Card hover and pressed surfaces (surface-3 and surface-4): no card on the page is interactive.
- Scrim light and default: the page uses the heavy scrim (drawer overlay) and an ink gradient on event captions.
- Unused ramp steps (gold 50 to 200 and 700 to 950, warm, claret): palette library for later sections.

## 2. Typography 2: checked

Verified by script: the ten size tokens match the kit at 375px and 1440px; all eleven role specs (face, weight, line
height, tracking) match; the root is 62.5%, body line height 1.65, and no weight outside 400, 500 and 600 is used.
Forum appears only in the five display roles (never below 21px here).

Gaps found and fixed:

- Old price used the lead size (18px at desktop); the kit says body size (16px), faint, with a strikethrough.
- Inline links (footer credit, reservation phone number) had no hover state and the wrong underline. They now use one
  `.link-inline` class: gold-400, weight 500, 1px underline offset 3px, hover gold-300 with a 2px underline.
- The four small captions that were bold sentence-case (Booking Request, Location, Lunch Time, Dinner Time, Book
  Through Call) now use the `label` role, as the kit's component cross-reference says.
- The kit page contradicted itself about prices (the tables said Forum, the weight ladder and demos said sans 500).
  Resolved in favour of the component tables, which also keeps today's look: menu prices are Forum (`item-title`),
  the special-dish price is `figure` (sans 500). The kit page was corrected.

Documented, not applied:

- The testimonial quote mark is a decorative 7rem Forum glyph outside the five roles (named exception).
- DM Sans loads as static 400, 500 and 600 files; the optional optical-size axis is not used.
- The Urdu fallback (Noto Nastaliq Urdu) is a plan only and is not loaded.
- The date field shows its value in uppercase, as the original did (a value, not a paragraph).

## 3. Spacing, radius and system tokens: checked

Verified by script: 120 of the 133 snapped classes in the kit's touchpoint map are in the code; the other 13 are
deliberate (44px touch targets, the named overlap, flex centring, the derived testimonial padding). Radius, border,
z-index, container, breakpoint and motion tokens match the kit.

Gaps found and fixed:

- Only three of the kit's named spacing roles existed. Added `inline-xs` (4), `inline-sm` (8), `field` (20) and `hero`
  (120) next to `gutter`, `section` and `overlap`, and used them (top bar gaps, underline offsets, form fields, hero).
  The other roles in the kit are ranges (for example stack 16 to 24) and map to scale steps, not single tokens.
- z-index and border widths were literals in the utilities and in the component CSS. They are now variables
  (`--z-*`, `--border-hairline`, `--border-strong`, `--border-spinner`) used everywhere.
- Top bar links were 21px tall; they now fill the 48px bar. Form icons now turn gold on focus (the iconography kit says so).
- Menu badges and event dates used 8px side padding; the kit's snapping rule gives 12px. Fixed.
- The hero autoplay time (7s) was a loose number; it is now `HERO_INTERVAL_MS`.
- "System tokens, consolidated" had no machine-readable form. `npm run tokens` writes `docs/design-tokens.json`
  (135 tokens, W3C layout) from `globals.css`, and `npm run tokens:check` fails when it is out of date.
- The kit page contradicted the code in several places and was corrected: button padding 20 (not 18, which was off the
  grid), tie rounding (ties go up; 14 to 12 and 205 to 208 are named exceptions), the half-step for 2px gaps, token
  names (`container-measure`, `container-quote`, `container-drawer`, `radius-circle`), the event card, nav drawer and
  menu price spacing, the top bar, and the "about uses flex centring" line (it uses the 160 step).

Documented, not applied:

- The 5px underline geometry, the 208px Subscribe field padding, and the 140px and 284px image-based widths.
- Optional extra padding on phone and email links (they are already above 24px).

## 4. Iconography: checked

Verified: Lucide is the single library; all 17 core icons and the 4 category icons are in `Icon.tsx`; sizes and stroke
(1.5px to 24px, 2px from 32px) match; colours come from existing tokens; icon-only buttons have labels; decorative icons
are hidden from screen readers; the four gold images are gone.

Gaps found and fixed:

- Form icons did not turn gold on focus (kit colour table). Fixed.
- The top bar's icon and label links were 21px tall, not the kit's full-height target. Fixed (48px).
- The kit named drafts that differ from the library (table, party, cloche). The page now says the project uses
  Lucide's armchair and party-popper, and utensils for appetizers (cloche was not verified in the library).
- Target sizes in the kit (hero arrows 45, back-to-top 50) now match the code (44, 48).

Documented, not applied:

- The hero badge image is brand artwork and stays raster.

## Fixes after the first look at the live site

- Solid gold buttons (Find A Table, Subscribe, Book A Table) hover to the original ink fill with a gold outline and an
  ivory label, instead of a lighter gold. The colour kit page was updated to match.
- Text fields had two borders on focus (the field border plus the focus ring). Fields now show one border: it turns gold
  and thickens to 2px. Other controls keep the keyboard focus ring.

## 5. Header and navigation (new work, after the four kits)

Research and decisions are in `docs/header-nav.md`. Built: Our Chefs section, Reservations rename, compact phone Reserve
button, drawer with Reserve and Call, open or closed status in the top bar, keyboard-safe hide on scroll, focus kept inside the
open drawer, drawer closes when the window widens, calm menu button, a faint top scrim behind the transparent header, and
page-level scroll padding for anchors. The iconography kit page was updated (the top bar no longer has an email icon).
Opening-hours logic is checked for winter time, summer time and overnight hours.

### Header and nav: round 2 (after the first look in a browser)

- Phones: the Reserve button in the header bar was removed; the logo keeps the smaller phone size (128px, 160px from 575px up).
  Reserve and Call moved to the bottom of the menu drawer, and the close button is smaller (36px circle, 44px tappable area).
- The original looping menu-button animation was restored.
- Desktop top bar: hours and the open status now sit next to the phone number; below 1200px the status shortens to
  "Open now" so the bar never runs out of room. The drawer also shows the open status.

## 6. Hero (new work)

Research and decisions are in `docs/hero.md`. Built: slider controls (pause and play, progress lines, swipe, pause on hover and
focus, reduced-motion handling, carousel semantics), phone info row, badge and Back to top overlap fixed, tighter reveal with a
named easing token, hero height in `svh`, first photo only at high priority. The iconography kit page now lists the pause and
play icons.

### Hero: round 2 (after the first look in a browser)

- Desktop: the hero was a fixed 880px and ran off the screen. It is now the screen height, and the headline shrinks with short screens.
- Phones: the open status and address row was removed and the badge made quieter, so the hero is calm.
- Bugs fixed: the open status broke onto two lines and the chef "Signature:" label sat on its own line (spans are blocks in the
  base style); the class checker no longer reports custom property names (like `--hero-delay`) as classes.
