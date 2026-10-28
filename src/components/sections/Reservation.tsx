import { Separator } from "@/components/ui/Separator";
import { siteConfig } from "@/data/site";
import { ReservationForm } from "./ReservationForm";

const label = "mb-5 font-bold";
const info = "text-body-4 leading-[1.5em] text-quick-silver";

export function Reservation() {
  const { address, phones, hours } = siteConfig;

  return (
    <section id="reservation">
      <div className="container-x">
        <div className="-mt-270 bg-smoky-black-2 lg:grid lg:grid-cols-[1fr_0.5fr]">
          <ReservationForm />

          <div className="bg-[url('/images/form-pattern.png')] bg-left-top bg-repeat px-20 pt-40 pb-30 text-center xl:px-60 xl:pt-75 xl:pb-75">
            <h2 className="mb-40 text-center font-forum text-headline-1">Contact Us</h2>

            <p className={label}>Booking Request</p>

            <a
              href={phones.booking.href}
              className="hover-underline mx-auto text-body-1 text-gold after:-bottom-5 sm:text-[3rem]"
            >
              {phones.booking.label}
            </a>

            <Separator className="mx-auto my-20" />

            <p className={label}>Location</p>

            <address className={`mb-25 ${info}`}>
              {address.lines[0]} <br />
              {address.lines[1]}
            </address>

            <p className={label}>Lunch Time</p>

            <p className={`mb-25 ${info}`}>
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
