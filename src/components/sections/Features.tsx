import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { features } from "@/data/features";

export function Features() {
  return (
    <section className="section text-center 2xl:overflow-visible" aria-label="features">
      <div className="container-x">
        <p className="section-subtitle">Why Choose Us</p>

        <h2 className="mb-10 t-heading">Our Strength</h2>

        <ul className="grid gap-10 md:grid-cols-[1fr_1fr] xl:grid-cols-[repeat(4,1fr)]">
          {features.map((feature) => (
            <li key={feature.id} className="group bg-surface-1 even:bg-surface-0">
              <div className="px-5 pt-8 pb-10">
                {/* Category icon: 48px, 2px stroke, brand gold; flips on hover like the original */}
                <div className="mx-auto w-max text-gold-400 trans-base group-hover:[transform:scale(-1)_rotate(180deg)]">
                  <Icon name={feature.icon} size={48} />
                </div>

                <h3 className="my-5 t-item-title">{feature.title}</h3>

                <p className="t-small text-fg-muted">{feature.text}</p>
              </div>
            </li>
          ))}
        </ul>

        <Image
          src="/images/shape-7.png"
          width={208}
          height={178}
          alt=""
          className="absolute z-behind hidden max-w-max 2xl:top-[-100px] 2xl:right-0 2xl:block"
        />
        <Image
          src="/images/shape-8.png"
          width={120}
          height={115}
          alt=""
          className="absolute z-behind hidden max-w-max 2xl:bottom-20 2xl:left-0 2xl:block"
        />
      </div>
    </section>
  );
}
