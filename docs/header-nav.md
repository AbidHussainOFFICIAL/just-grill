# Header and navigation: research and decisions

## What was researched

- **Restaurant sites:** guides from restaurant-tech and marketing sites agree on the same few points. Visitors are mostly
  on phones and want the menu, hours, address, a reserve action and a phone number fast; keep the nav to about five clearly
  named items with no dead links; keep one primary action always visible; show hours and phone without searching.
- **Navigation usability:** Nielsen Norman Group reports that hidden (hamburger) navigation is less discoverable than visible
  navigation. The answer for a short menu is to keep the main action outside the menu, next to the button.
- **Accessibility (WCAG 2.2):** a sticky or hidden header must not cover keyboard focus (2.4.11 Focus Not Obscured). The menu
  button needs `aria-expanded` and `aria-controls`, Esc to close, focus kept inside while open, and focus returned afterwards.
  Targets are 44px where there is room (already the house rule).
- **The listed repositories** (read from their descriptions and READMEs, not line by line):
  Impeccable (anti-pattern list, useful as a final scan), Emil Kowalski's skills (short ease-out motion, transform and
  opacity only, hover only where hover exists), UI UX Pro Max (UX rule checklist), React Bits (nav ideas such as staggered
  menus; GSAP-heavy, MIT plus Commons Clause licence, so ideas were rebuilt in CSS), GSAP skills (not needed), DESIGN.md and
  awesome-design-md (a way to describe a design system to AI tools; `docs/design-tokens.json` already covers the tokens),
  Magic UI, Scroll World, Canvas UI, Dimensional Drawing, Open Design and Hallmark (not relevant to a restaurant header).

## Decisions (made with the owner)

| Question       | Decision                                                                                                                                                                    |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Our Chefs      | Build the section in the Grilli theme (ink band, gold labels, Forum names, gold placeholder until photos exist)                                                             |
| Contact        | Renamed Reservations                                                                                                                                                        |
| Phones         | No button in the header bar (it looked crowded). Reserve and Call are pinned to the bottom of the menu drawer, where a thumb reaches; the hero keeps its Book A Table badge |
| Top bar        | Dropped the email (it is in the footer and drawer), added the open or closed status. Address on the left; hours, status and phone together on the right                     |
| Hide on scroll | Kept, made keyboard-safe                                                                                                                                                    |
| Menu button    | The original looping animation is kept (the owner prefers it). Close button: 36px circle, 16px icon, 44px tappable area                                                     |

## Dummy hours made consistent

The three places that showed different hours (top bar, drawer, footer) now say 8:00 am to 10:00 pm, the same hours the open
status uses. Lunch (11:00 to 2:30) and dinner (5:00 to 10:00) are meal services inside those hours.

## To check by hand

1. Top bar: the status reads "Open now" or "Closed" correctly for London time.
2. Phone widths 320, 360 and 390: the logo and menu button sit on one row.
3. Drawer: Reserve and Call pinned at the bottom (also with the page zoomed or the phone in landscape), Tab never leaves the drawer, Esc closes it, focus returns to the menu button.
4. Scroll down: the header hides. Press Tab: it slides back in and focus is visible.
5. Click each nav link, from the top and from the bottom of the page: the section heading is never under the header.
6. Our Chefs appears between the menu and the testimonial, and the nav highlights it while you are in it.
