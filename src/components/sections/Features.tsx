import Image from "next/image";
import { features } from "@/data/features";

export function Features() {
  return (
    <section className="section text-center 2xl:overflow-visible" aria-label="features">
      <div className="container-x">
        <p className="section-subtitle text-label-2">Why Choose Us</p>

        <h2 className="mb-40 font-forum text-headline-1">Our Strength</h2>

        <ul className="grid gap-40 md:grid-cols-[1fr_1fr] xl:grid-cols-[repeat(4,1fr)]">
          {features.map((feature) => (
            <li key={feature.id} className="group bg-eerie-black-3 even:bg-smoky-black-3">
              <div className="px-20 pt-30 pb-40">
                <div className="mx-auto max-w-max trans-base group-hover:[transform:scale(-1)_rotate(180deg)]">
                  <Image src={feature.icon} width={100} height={80} alt="" />
                </div>

                <h3 className="my-20 font-forum text-title-2 xl:text-[2.5rem]">{feature.title}</h3>

                <p className="text-label-1 leading-[1.4em] text-quick-silver">{feature.text}</p>
              </div>
            </li>
          ))}
        </ul>

        <Image
          src="/images/shape-7.png"
          width={208}
          height={178}
          alt=""
          className="absolute -z-1 hidden max-w-max 2xl:top-[-100px] 2xl:right-0 2xl:block"
        />
        <Image
          src="/images/shape-8.png"
          width={120}
          height={115}
          alt=""
          className="absolute -z-1 hidden max-w-max 2xl:bottom-80 2xl:left-0 2xl:block"
        />
      </div>
    </section>
  );
}
