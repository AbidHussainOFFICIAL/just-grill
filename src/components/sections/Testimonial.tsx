import Image from "next/image";
import { Separator } from "@/components/ui/Separator";
import { testimonial } from "@/data/testimonial";

export function Testimonial() {
  return (
    <section
      className="section static bg-[url('/images/testimonial-bg.jpg')] bg-cover bg-center bg-no-repeat pb-340 text-center"
      aria-label="testimonials"
    >
      <div className="container-x">
        <div className="font-forum text-[7rem] leading-[0.7em]" aria-hidden="true">
          ”
        </div>

        <p className="font-forum text-headline-2 lg:mx-auto lg:max-w-[910px]">
          {testimonial.quote}
        </p>

        <div className="mt-40 mb-50 flex justify-center gap-2" aria-hidden="true">
          <Separator className="animate-spin-15" />
          <Separator className="animate-spin-15" />
          <Separator className="animate-spin-15" />
        </div>

        <div>
          <Image
            src={testimonial.avatar}
            width={100}
            height={100}
            alt=""
            className="mx-auto mb-15 rounded-circle"
          />

          <p className="text-label-2 font-bold tracking-m text-gold uppercase">
            {testimonial.name}
          </p>
        </div>
      </div>
    </section>
  );
}
