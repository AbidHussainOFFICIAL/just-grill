# Hero: research and decisions

## What was researched

- **Restaurant hero sections:** guides agree on one strong, appetizing photo, a specific headline, a clear primary action
  (reserve or view the menu), and the location and hours visible without scrolling. Several recommend a single image over a
  slider, and avoid autoplay video.
- **Sliders and accessibility (WCAG 2.2.2):** anything that moves on its own for more than five seconds needs a way to pause,
  stop or hide it; the usual practice also pauses on hover and on keyboard focus, never autoplays for people who ask for reduced
  motion, gives each slide an accessible name, and announces changes politely only when it is not auto-rotating.
- **Speed:** only the first hero image should load with high priority; the other slides should not compete with it.
- **Text over photos:** needs a darkened photo or an overlay. The three hero photos were measured: even their brightest areas
  give about 10:1 contrast with white, so no extra overlay is needed.
- **Repositories:** Emil Kowalski's motion rules (short ease-out entrances, small offsets) shaped the reveal. The others
  (React Bits, Magic UI, Scroll World and similar) are effect or scroll-video libraries and do not suit a restaurant hero.

## Decisions (made with the owner)

| Question             | Decision                                                                                                                                                                                       |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Slider or one image  | Keep the three-slide slider, with proper controls                                                                                                                                              |
| Buttons              | Keep the single View Our Menu button and the Book A Table badge; improve both                                                                                                                  |
| Dots and open status | Progress lines instead of dots. The open status and address were tried on phones and removed: they made the hero cluttered. They stay in the top bar (desktop), the menu drawer and the footer |
| Reveal timing        | Tightened: the button is up in about half a second instead of two to three                                                                                                                     |

## What was fixed or added

- The badge no longer covers the View Our Menu button on short phones, and Back to top no longer sits on the badge.
- Pause and play, progress lines that double as slide buttons, swipe on phones, pause on hover and focus, no autoplay with reduced motion.
- Slider announced as a carousel with named slides; live announcements only when not auto-rotating.
- First photo high priority only; the others no longer compete with it.
- Hero height is the screen height (`svh`) with a 560px floor, and the headline shrinks on short screens, so the whole hero fits without scrolling (it used to be a fixed 880px on desktop).
- Phones: the bottom of the hero is only the pause button, the progress lines and a quieter 80px badge.
- Fixed a bug where the "until 10:00 pm" part of the open status dropped to its own line (the base style makes spans blocks), and the same bug on "Signature:" in the chef cards.
- The badge icon is decorative (`alt` empty) because the label says it; the badge has real sizes instead of being scaled down.

## To check by hand

1. Desktop at 1366 x 641 and 1920 x 969: the whole hero (headline, text, View Our Menu, the lines and the badge) is on screen without scrolling.
2. 320, 375 and 390px wide, and a short screen (375 x 554): calm, nothing overlaps.
3. The progress line fills in 7 seconds and the slide changes when it is full. Pause freezes both the line and the zoom.
4. Hover the controls or arrows: autoplay pauses. Tab into the hero: autoplay pauses while focus is inside.
5. Swipe left and right on a phone (or touch emulation) to change slides; scrolling up and down still works.
6. Turn on "reduce motion" in the system: no autoplay, no pause button, the active line is full, slides change only by click or swipe.
7. Scroll down: Back to top appears only near the end of the hero.
8. Reload: the first slide's text appears after the preloader lifts, then each slide reveals in about half a second.
