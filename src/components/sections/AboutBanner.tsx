"use client";

import Image from "next/image";
import { useParallax } from "@/hooks/useParallax";

/** Client component because the two images follow the mouse (parallax). */
export function AboutBanner() {
  const bannerRef = useParallax<HTMLImageElement>(1);
  const smallImageRef = useParallax<HTMLDivElement>(1.75);

  return (
    <figure className="relative mb-120">
      <Image
        ref={bannerRef}
        src="/images/about-banner.jpg"
        width={570}
        height={570}
        sizes="(min-width: 992px) 40vw, 100vw"
        alt="about banner"
        className="w-full pl-50 sm:pl-90"
      />

      <div
        ref={smallImageRef}
        className="absolute -bottom-120 left-0 z-1 w-150 py-50 before:absolute before:inset-y-0 before:left-1/2 before:-z-1 before:w-140 before:-translate-x-1/2 before:bg-[url('/images/img-pattern.svg')] before:bg-repeat sm:w-285"
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

      <div className="absolute -top-65 right-0 z-1 overflow-hidden before:absolute before:inset-0 before:-z-1 before:animate-spin-15 before:bg-[url('/images/badge-2-bg.png')] before:bg-contain before:bg-no-repeat">
        <Image src="/images/badge-2.png" width={133} height={134} alt="" />
      </div>
    </figure>
  );
}
