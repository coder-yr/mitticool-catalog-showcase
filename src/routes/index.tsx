import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { products, categories } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { PageTransition } from "@/components/PageTransition";
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

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

function Home() {
  const featured = products.filter((p) => p.featured).slice(0, 6);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <PageTransition>
      {/* Cinematic Hero */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden bg-background">
        {/* Parallax Background */}
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent z-10 w-2/3" />
          <motion.img
            src={heroPot}
            alt="Hand-thrown terracotta clay water pot"
            className="w-full h-full object-cover origin-center"
            initial={{ scale: 1.15, filter: "blur(12px)" }}
            animate={{ scale: 1.05, filter: "blur(0px)" }}
            transition={{ duration: 2.5, ease: "easeOut" }}
          />
        </motion.div>

        <div className="relative z-20 mx-auto w-full max-w-7xl px-6 pt-24 pb-20 md:pt-32">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="max-w-2xl"
          >
            <motion.p variants={itemVariants} className="mb-6 inline-flex items-center gap-3 rounded-full border border-border/50 bg-background/40 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground backdrop-blur-md shadow-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--clay)] shadow-[0_0_8px_var(--clay)] animate-pulse" /> 
              Made in Gujarat
            </motion.p>
            
            <motion.h1 className="font-serif text-6xl leading-[1.05] text-balance md:text-8xl tracking-tight text-foreground">
              <motion.span variants={itemVariants} className="block">Eco-friendly</motion.span>
              <motion.span variants={itemVariants} className="block italic text-[var(--clay)] opacity-90">clay products</motion.span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="mt-8 max-w-md text-lg text-muted-foreground/90 text-balance leading-relaxed">
              Natural cooling. Sustainable living. Pottery hand-thrown the way it's been done for seven generations.
            </motion.p>
            
            <motion.div variants={itemVariants} className="mt-10 flex flex-wrap items-center gap-6">
              <Link
                to="/products"
                className="group relative inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-medium text-primary-foreground shadow-premium transition-all hover:bg-[var(--clay-deep)] hover:gap-3 hover:-translate-y-1"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore Collection
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
              <Link to="/about" className="text-sm font-medium underline-offset-8 transition-colors hover:text-[var(--clay)] hover:underline">
                Our story
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="relative mx-auto max-w-7xl px-6 py-28 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 flex items-end justify-between gap-6"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--clay)] font-medium">Shop by</p>
            <h2 className="mt-3 font-serif text-5xl md:text-6xl tracking-tight">Categories</h2>
          </div>
          <Link to="/products" className="hidden text-sm font-medium underline-offset-4 hover:text-[var(--clay)] hover:underline md:inline">
            View all collections
          </Link>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to="/products"
                search={{ category: cat.name }}
                className="group relative block overflow-hidden rounded-[2rem] bg-[var(--sand)]/30 hover-lift shadow-soft"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/0" />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-8 pt-24 text-white">
                  <h3 className="font-serif text-3xl">{cat.name}</h3>
                  <p className="mt-2 max-w-xs text-sm text-white/80 opacity-0 transform translate-y-4 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100 group-hover:translate-y-0">{cat.blurb}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="relative overflow-hidden bg-[var(--sand)]/20 py-32">
        <div className="absolute inset-0 bg-noise opacity-50" />
        <div className="relative mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--clay)] font-medium">Why clay</p>
            <h2 className="mt-4 font-serif text-5xl md:text-6xl text-balance leading-tight">
              The quiet wisdom<br/><span className="italic text-muted-foreground/80">of the earth.</span>
            </h2>
          </motion.div>

          <div className="mt-20 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="group flex flex-col items-center text-center md:items-start md:text-left"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-background shadow-soft transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-2 group-hover:shadow-hover-lift">
                  <b.icon className="h-6 w-6 text-[var(--clay)]" />
                </div>
                <h3 className="mt-6 font-serif text-2xl">{b.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{b.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-7xl px-6 py-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 flex items-end justify-between gap-6"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--clay)] font-medium">Featured</p>
            <h2 className="mt-3 font-serif text-5xl md:text-6xl tracking-tight">Pieces we love</h2>
          </div>
          <Link to="/products" className="hidden text-sm font-medium underline-offset-4 hover:text-[var(--clay)] hover:underline md:inline">
            See entire collection
          </Link>
        </motion.div>
        
        <div className="grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA strip */}
      <section className="mx-auto max-w-7xl px-6 pb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[3rem] bg-[var(--clay)] px-8 py-24 text-center md:px-16 md:py-32 shadow-premium"
        >
          <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          
          <div className="relative z-10">
            <h2 className="font-serif text-5xl text-[var(--cream)] md:text-6xl text-balance tracking-tight">
              A kinder way to live,<br />
              <span className="italic text-white/80">shaped by hand.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-[var(--cream)]/90">
              Browse the full Mitticool collection — from natural water pots to elegant drinkware.
            </p>
            <Link
              to="/products"
              className="group mt-10 inline-flex items-center gap-3 rounded-full bg-[var(--cream)] px-8 py-4 text-sm font-medium text-[var(--clay-deep)] transition-all hover:bg-white hover:shadow-hover-lift hover:-translate-y-1"
            >
              Explore Collection <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </section>
    </PageTransition>
  );
}
