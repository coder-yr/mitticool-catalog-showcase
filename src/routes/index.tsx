import { createFileRoute, Link } from "@tanstack/react-router";
import { products, categories } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import heroPot from "@/assets/hero-pot.jpg";
import { ArrowRight, Leaf, ShieldCheck, Snowflake, Hammer } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mitticool — Eco-Friendly Clay Products" },
      { name: "description", content: "Handcrafted clay pots, kitchenware, and drinkware from Gujarat. Natural cooling, chemical-free, traditionally made." },
      { property: "og:title", content: "Mitticool — Eco-Friendly Clay Products" },
      { property: "og:description", content: "Natural cooling. Sustainable living. Explore our handcrafted clay collection." },
    ],
  }),
  component: Home,
});

const benefits = [
  { icon: Leaf, title: "100% Natural Clay", body: "Sourced from riverbeds, shaped by hand, fired in traditional kilns." },
  { icon: ShieldCheck, title: "Chemical-Free", body: "No glazes, paints, or plastics. Safe for food, safe for the earth." },
  { icon: Snowflake, title: "Naturally Cool", body: "Porous walls evaporate moisture, cooling water 8–10°C without power." },
  { icon: Hammer, title: "Traditional Craft", body: "Skills passed down for seven generations of Gujarati potters." },
];

function Home() {
  const featured = products.filter((p) => p.featured).slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-20 pt-16 md:grid-cols-2 md:pt-24 md:pb-28">
          <div className="animate-[fade-up_0.8s_ease-out_both]">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted-foreground backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--clay)]" /> Made in Gujarat
            </p>
            <h1 className="font-serif text-5xl leading-[1.05] text-balance md:text-7xl">
              Eco-friendly<br />
              <span className="italic text-[var(--clay)]">clay</span> products
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted-foreground text-balance">
              Natural cooling. Sustainable living. Pottery hand-thrown the way it's been done for seven generations.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/products"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-[var(--clay-deep)] hover:gap-3"
              >
                Explore Collection
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link to="/about" className="text-sm font-medium underline-offset-4 hover:underline">
                Our story →
              </Link>
            </div>
          </div>

          <div className="relative animate-[scale-in_0.9s_ease-out_both]">
            <div className="absolute -inset-8 -z-10 rounded-full bg-[var(--sand)] blur-3xl opacity-60" />
            <div className="overflow-hidden rounded-[2rem] shadow-elev">
              <img
                src={heroPot}
                alt="Hand-thrown terracotta clay water pot"
                width={1536}
                height={1536}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Shop by</p>
            <h2 className="mt-2 font-serif text-4xl md:text-5xl">Categories</h2>
          </div>
          <Link to="/products" className="hidden text-sm text-muted-foreground hover:text-foreground md:inline">
            View all →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to="/products"
              search={{ category: cat.name }}
              className="group relative block overflow-hidden rounded-3xl bg-[var(--sand)]/50 hover-lift"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  width={1024}
                  height={1280}
                  className="img-zoom h-full w-full object-cover"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--clay-deep)]/85 via-[var(--clay-deep)]/20 to-transparent p-6 pt-20">
                <h3 className="font-serif text-2xl text-[var(--cream)]">{cat.name}</h3>
                <p className="mt-1 max-w-xs text-sm text-[var(--cream)]/80">{cat.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-[var(--sand)]/30">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Why clay</p>
            <h2 className="mt-2 font-serif text-4xl md:text-5xl text-balance">
              The quiet wisdom of the earth.
            </h2>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <div key={b.title} className="group">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-background shadow-soft transition-transform group-hover:-translate-y-1">
                  <b.icon className="h-5 w-5 text-[var(--clay)]" />
                </div>
                <h3 className="mt-5 font-serif text-xl">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Featured</p>
            <h2 className="mt-2 font-serif text-4xl md:text-5xl">Pieces we love</h2>
          </div>
          <Link to="/products" className="text-sm text-muted-foreground hover:text-foreground">
            See all →
          </Link>
        </div>
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* CTA strip */}
      <section className="mx-auto max-w-7xl px-6 pb-4">
        <div className="relative overflow-hidden rounded-3xl bg-[var(--clay)] px-8 py-16 text-center md:px-16 md:py-24">
          <h2 className="font-serif text-4xl text-[var(--cream)] md:text-5xl text-balance">
            A kinder way to live,<br />shaped by hand.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[var(--cream)]/80">
            Browse the full Mitticool collection — from water pots to drinkware.
          </p>
          <Link
            to="/products"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--cream)] px-6 py-3 text-sm font-medium text-[var(--clay-deep)] transition-all hover:gap-3"
          >
            Explore Collection <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
