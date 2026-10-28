/**
 * The site is a demo, so forms never send anything. This waits a moment to
 * mimic a network request, which lets the button's "sending" state show.
 * Replace it with a real request when the site goes live.
 */
export function simulateRequest(delayMs = 700): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, delayMs);
  });
}
