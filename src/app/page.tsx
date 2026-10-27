import { About } from "@/components/sections/About";
import { Hero } from "@/components/sections/Hero";
import { Service } from "@/components/sections/Service";
import { SpecialDish } from "@/components/sections/SpecialDish";

export default function HomePage() {
  return (
    <main>
      <article>
        <Hero />
        <Service />
        <About />
        <SpecialDish />
        {/* Menu, testimonial, reservation, features and events come in the next step */}
      </article>
    </main>
  );
}
