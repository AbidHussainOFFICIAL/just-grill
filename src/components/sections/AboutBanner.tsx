"use client";

import Image from "next/image";
import { useParallax } from "@/hooks/useParallax";

/** Client component because the two images follow the mouse (parallax). */
export function AboutBanner() {
  const bannerRef = useParallax<HTMLImageElement>(1);
  const smallImageRef = useParallax<HTMLDivElement>(1.75);

  return (
    <figure className="relative mb-30">
      <Image
        ref={bannerRef}
        src="/images/about-banner.jpg"
        width={570}
        height={570}
        sizes="(min-width: 992px) 40vw, 100vw"
        alt="about banner"
        className="w-full pl-12 sm:pl-24"
      />

      <div
        ref={smallImageRef}
        className="absolute -bottom-30 left-0 z-raised w-38 py-12 before:absolute before:inset-y-0 before:left-1/2 before:z-behind before:w-35 before:-translate-x-1/2 before:bg-[url('/images/img-pattern.svg')] before:bg-repeat sm:w-71"
      >
        <Image
          src="/images/about-abs-image.jpg"
          width={285}
          height={285}
          sizes="285px"
          alt=""
          className="w-full"
        />
      </div>

      <div className="absolute -top-16 right-0 z-raised overflow-hidden before:absolute before:inset-0 before:z-behind before:animate-spin-15 before:bg-[url('/images/badge-2-bg.png')] before:bg-contain before:bg-no-repeat">
        <Image src="/images/badge-2.png" width={133} height={134} alt="" />
      </div>
    </figure>
  );
}
