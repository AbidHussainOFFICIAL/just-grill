import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site";
import { AboutBanner } from "./AboutBanner";

export function About() {
  const { story } = siteConfig.phones;

  return (
    <section
      className="section text-center xl:pt-40 xl:pb-24"
      aria-labelledby="about-label"
      id="about"
    >
      <div className="container-x grid gap-30 sm:gap-20 lg:grid-cols-[0.7fr_1fr] lg:gap-8">
        <div className="2xl:pr-24">
          <p className="section-subtitle" id="about-label">
            Our Story
          </p>

          <h2 className="t-heading">Every Flavor Tells a Story</h2>

          <p className="mt-4 mb-8 sm:mx-auto sm:max-w-measure">
            Lorem Ipsum is simply dummy text of the printingand typesetting industry lorem Ipsum has
            been the industrys standard dummy text ever since the when an unknown printer took a
            galley of type and scrambled it to make a type specimen book It has survived not only
            five centuries, but also the leap into.
          </p>

          <div className="t-label">Book Through Call</div>

          <a
            href={story.href}
            className="hover-underline mx-auto t-figure text-gold-400 after:-bottom-inline-xs"
          >
            {story.label}
          </a>

          <Button href="#" className="mx-auto mt-6">
            Read More
          </Button>
        </div>

        <AboutBanner />

        <Image
          src="/images/shape-3.png"
          width={197}
          height={194}
          alt=""
          className="absolute z-behind hidden max-w-max 2xl:top-[46%] 2xl:left-0 2xl:block"
        />
      </div>
    </section>
  );
}
