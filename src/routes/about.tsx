import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Mitticool" },
      { name: "description", content: "Seven generations of Gujarati potters, blending traditional Indian pottery with modern lifestyle needs." },
      { property: "og:title", content: "Our Story — Mitticool" },
      { property: "og:description", content: "Traditional pottery, modern living. The Mitticool story." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div>
      <section className="mx-auto max-w-3xl px-6 pt-20 pb-10 text-center md:pt-28">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Our story</p>
        <h1 className="mt-3 font-serif text-5xl md:text-7xl text-balance">
          Clay, hands,<br />
          <span className="italic text-[var(--clay)]">and time.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground text-balance">
          Mitticool blends traditional Indian pottery with the quiet needs of modern life.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-12">
        <div className="space-y-6 text-lg leading-relaxed text-foreground/90">
          <p>
            We are a small studio in Wankaner, Gujarat — a town that has been shaping river clay into
            useful things for centuries. Our potters are the seventh generation of their families to
            sit at the wheel.
          </p>
          <p>
            Every piece is thrown by hand, sun-dried, and fired in a wood kiln. No glazes, no plastics,
            no shortcuts. The clay we use is porous enough to breathe — which is why a Mitticool pot
            can cool water by eight to ten degrees without a single watt of electricity.
          </p>
          <p>
            In a world of mass-produced things, this feels almost radical. It is also, we think,
            simply the right way to live: with objects that are made slowly, used daily, and returned
            to the earth when their time is done.
          </p>
        </div>
      </section>

      <section className="bg-[var(--sand)]/30">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 py-20 md:grid-cols-3">
          {[
            { n: "7", label: "Generations of potters" },
            { n: "100%", label: "Natural river clay" },
            { n: "0", label: "Chemicals, glazes, or plastics" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-serif text-6xl text-[var(--clay)]">{s.n}</p>
              <p className="mt-2 text-sm uppercase tracking-wider text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h2 className="font-serif text-4xl">Come meet the collection.</h2>
        <Link
          to="/products"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-[var(--clay-deep)] hover:gap-3"
        >
          Explore Collection →
        </Link>
      </section>
    </div>
  );
}
