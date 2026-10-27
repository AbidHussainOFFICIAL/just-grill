import { About } from "@/components/sections/About";
import { Events } from "@/components/sections/Events";
import { Features } from "@/components/sections/Features";
import { Hero } from "@/components/sections/Hero";
import { Menu } from "@/components/sections/Menu";
import { Reservation } from "@/components/sections/Reservation";
import { Service } from "@/components/sections/Service";
import { SpecialDish } from "@/components/sections/SpecialDish";
import { Testimonial } from "@/components/sections/Testimonial";

export default function HomePage() {
  return (
    <main>
      <article>
        <Hero />
        <Service />
        <About />
        <SpecialDish />
        <Menu />
        <Testimonial />
        <Reservation />
        <Features />
        <Events />
      </article>
    </main>
  );
}
