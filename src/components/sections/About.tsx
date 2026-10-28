import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site";
import { AboutBanner } from "./AboutBanner";

export function About() {
  const { story } = siteConfig.phones;

  return (
    <section
      className="section text-center xl:pt-170 xl:pb-100"
      aria-labelledby="about-label"
      id="about"
    >
      <div className="container-x grid gap-120 sm:gap-80 lg:grid-cols-[0.7fr_1fr] lg:gap-30">
        <div className="2xl:pr-90">
          <p className="section-subtitle text-label-2" id="about-label">
            Our Story
          </p>

          <h2 className="font-forum text-headline-1">Every Flavor Tells a Story</h2>

          <p className="mt-15 mb-30 sm:mx-auto sm:max-w-[420px]">
            Lorem Ipsum is simply dummy text of the printingand typesetting industry lorem Ipsum has
            been the industrys standard dummy text ever since the when an unknown printer took a
            galley of type and scrambled it to make a type specimen book It has survived not only
            five centuries, but also the leap into.
          </p>

          <div className="font-bold">Book Through Call</div>

          <a
            href={story.href}
            className="hover-underline mx-auto text-body-1 text-gold after:-bottom-5"
          >
            {story.label}
          </a>

          <Button href="#" className="mx-auto mt-26">
            Read More
          </Button>
        </div>

        <AboutBanner />

        <Image
          src="/images/shape-3.png"
          width={197}
          height={194}
          alt=""
          className="absolute -z-1 hidden max-w-max 2xl:top-[46%] 2xl:left-0 2xl:block"
        />
      </div>
    </section>
  );
}
