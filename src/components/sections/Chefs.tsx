import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { chefs } from "@/data/chefs";

export function Chefs() {
  return (
    <section id="chefs" className="section bg-surface-0 text-center" aria-labelledby="chefs-label">
      <div className="container-x sm:mx-auto sm:max-w-phone md:max-w-tablet lg:max-w-none xl:max-w-page">
        <p className="section-subtitle" id="chefs-label">
          The Kitchen Team
        </p>

        <h2 className="mb-4 t-heading">Our Master Chefs</h2>

        <p className="mb-10 sm:mx-auto sm:max-w-measure xl:mb-18">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has
          been the industrys standard dummy text ever.
        </p>

        <ul className="grid gap-10 md:grid-cols-[1fr_1fr] lg:grid-cols-[repeat(3,1fr)]">
          {chefs.map((chef) => (
            <li
              key={chef.id}
              className="md:last:col-[1/3] md:last:mx-auto md:last:w-[calc(50%-20px)] lg:last:col-auto lg:last:w-full"
            >
              <article className="group">
                {/* Portrait, or the gold placeholder until a photo is added in src/data/chefs.ts */}
                <figure className="hover-shine relative z-raised mb-6 aspect-[3/4] overflow-hidden bg-surface-2">
                  {chef.image ? (
                    <Image
                      src={chef.image}
                      width={350}
                      height={467}
                      sizes="(min-width: 992px) 350px, 100vw"
                      alt={`Portrait of ${chef.name}`}
                      className="size-full object-cover trans-base group-hover:scale-105"
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className="grid size-full place-items-center bg-[url('/images/img-pattern.svg')] bg-center text-gold-400 trans-base group-hover:scale-105"
                    >
                      <Icon name="chef-hat" size={64} />
                    </div>
                  )}
                </figure>

                <p className="mb-2 t-label text-gold-400 [--ls:var(--tracking-link)]">
                  {chef.role}
                </p>

                <h3 className="mb-3 t-card-title">{chef.name}</h3>

                <p className="mx-auto mb-4 max-w-measure t-small text-fg-muted">{chef.bio}</p>

                <p className="flex items-center justify-center gap-inline-sm t-small">
                  <Icon name="utensils" size={16} className="text-gold-400" />
                  <span>
                    <span className="inline text-fg-muted">Signature:</span> {chef.signature}
                  </span>
                </p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
