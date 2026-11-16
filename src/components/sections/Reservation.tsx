import { Separator } from "@/components/ui/Separator";
import { siteConfig } from "@/data/site";
import { ReservationForm } from "./ReservationForm";

const label = "t-label mb-1";
const info = "text-fg-muted";

export function Reservation() {
  const { address, phones, hours } = siteConfig;

  return (
    <section id="reservation" className="scroll-mt-24">
      <div className="container-x">
        {/* The form is lifted over the testimonial by --spacing-overlap (also added to its bottom padding). */}
        <div className="-mt-overlap bg-surface-0 lg:grid lg:grid-cols-[1fr_0.5fr]">
          <ReservationForm />

          <div className="bg-[url('/images/form-pattern.png')] bg-left-top bg-repeat px-5 pt-10 pb-8 text-center xl:px-16 xl:pt-18 xl:pb-18">
            <h2 className="mb-10 text-center t-heading">Contact Us</h2>

            <p className={label}>Booking Request</p>

            <a
              href={phones.booking.href}
              className="hover-underline mx-auto t-figure text-gold-400 after:-bottom-inline-xs"
            >
              {phones.booking.label}
            </a>

            <Separator className="mx-auto my-5" />

            <p className={label}>Location</p>

            <address className={`mb-6 ${info}`}>
              {address.lines[0]} <br />
              {address.lines[1]}
            </address>

            <p className={label}>Lunch Time</p>

            <p className={`mb-6 ${info}`}>
              {hours.lunch.days} <br />
              {hours.lunch.time}
            </p>

            <p className={label}>Dinner Time</p>

            <p className={info}>
              {hours.dinner.days} <br />
              {hours.dinner.time}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
