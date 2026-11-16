import Image from "next/image";
import { Separator } from "@/components/ui/Separator";
import { testimonial } from "@/data/testimonial";

export function Testimonial() {
  return (
    <section
      className="section static bg-[url('/images/testimonial-bg.jpg')] bg-cover bg-center bg-no-repeat pb-[calc(var(--spacing-overlap)+var(--section-space))] text-center"
      aria-label="testimonials"
    >
      <div className="container-x">
        <div className="font-forum text-[7rem] leading-[0.7em] text-fg-strong" aria-hidden="true">
          ”
        </div>

        <p className="t-subheading lg:mx-auto lg:max-w-quote">{testimonial.quote}</p>

        <div className="mt-10 mb-12 flex justify-center gap-0.5" aria-hidden="true">
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
            className="mx-auto mb-4 rounded-circle"
          />

          <p className="t-label text-gold-400 [--ls:var(--tracking-link)]">{testimonial.name}</p>
        </div>
      </div>
    </section>
  );
}
