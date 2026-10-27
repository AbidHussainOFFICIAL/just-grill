"use client";

import clsx from "clsx";
import Image from "next/image";
import { useParallax } from "@/hooks/useParallax";
import styles from "./AboutBanner.module.css";

/** Client component because the two images follow the mouse (parallax). */
export function AboutBanner() {
  const bannerRef = useParallax<HTMLImageElement>(1);
  const smallImageRef = useParallax<HTMLDivElement>(1.75);

  return (
    <figure className={styles.banner}>
      <Image
        ref={bannerRef}
        src="/images/about-banner.jpg"
        width={570}
        height={570}
        sizes="(min-width: 992px) 40vw, 100vw"
        alt="about banner"
        className={clsx("w-100", styles.bannerImg)}
      />

      <div ref={smallImageRef} className={clsx("has-before", styles.absImg, styles.absImg1)}>
        <Image
          src="/images/about-abs-image.jpg"
          width={285}
          height={285}
          sizes="285px"
          alt=""
          className="w-100"
        />
      </div>

      <div className={clsx("has-before", styles.absImg, styles.absImg2)}>
        <Image src="/images/badge-2.png" width={133} height={134} alt="" />
      </div>
    </figure>
  );
}
