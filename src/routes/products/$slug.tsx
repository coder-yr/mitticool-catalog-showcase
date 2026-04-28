import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { PageTransition } from "@/components/PageTransition";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, MessageCircle, Leaf, Hammer, Info, Wind, Droplets } from "lucide-react";

export const Route = createFileRoute("/products/$slug")({
  validateSearch: (search: Record<string, unknown>) => search,
  loader: ({ params }) => {
    const product = products.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Mitticool` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: `${loaderData.product.name} — Mitticool` },
          { property: "og:description", content: loaderData.product.description },
          { property: "og:image", content: loaderData.product.image },
          { name: "twitter:image", content: loaderData.product.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-6 py-32 text-center">
      <h1 className="font-serif text-5xl">Product not found</h1>
      <Link to="/products" className="mt-8 inline-block text-sm underline underline-offset-8">
        Back to collection
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-xl px-6 py-32 text-center">
      <h1 className="font-serif text-4xl">Something went wrong</h1>
      <p className="mt-4 text-muted-foreground">{error.message}</p>
    </div>
  ),
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const [activeCap, setActiveCap] = useState(product.capacities[0]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Faking a gallery array since we only have one image per product in the mock data
  const gallery = [product.image, product.image, product.image];

  const related = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 3);

  const whatsappMsg = encodeURIComponent(
    `Hi Mitticool! I'd like to order the ${product.name} (${activeCap}).`
  );
  const whatsappUrl = `https://wa.me/919999999999?text=${whatsappMsg}`;

  return (
    <PageTransition className="bg-background">
      {/* Navigation Bar */}
      <div className="sticky top-[72px] z-40 bg-background/60 backdrop-blur-md border-b border-border/40">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link
            to="/products"
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to collection
          </Link>
          
          <div className="hidden md:flex gap-4">
            <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-widest"><Hammer className="h-3.5 w-3.5 text-[var(--clay)]"/> Handmade</span>
            <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-widest"><Leaf className="h-3.5 w-3.5 text-[var(--clay)]"/> Eco-Friendly</span>
          </div>
        </div>
      </div>

      {/* Hero Split Layout */}
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-8 md:grid-cols-[1.2fr_1fr] md:py-12 lg:gap-20">
        {/* Left: Image Gallery */}
        <div className="flex flex-col gap-4 md:sticky md:top-[160px] md:h-[calc(100vh-200px)]">
          <motion.div 
            className="relative flex-1 overflow-hidden rounded-[2.5rem] bg-[var(--sand)]/30 shadow-soft group"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImageIndex}
                src={gallery[activeImageIndex]}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 cursor-crosshair"
                initial={{ opacity: 0, filter: "blur(4px)", scale: 1.05 }}
                animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                exit={{ opacity: 0, filter: "blur(4px)", scale: 0.95 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>
          </motion.div>
          
          {/* Thumbnails */}
          <motion.div 
            className="flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {gallery.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImageIndex(i)}
                className={`relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl transition-all ${
                  activeImageIndex === i ? "ring-2 ring-[var(--clay)] ring-offset-2 ring-offset-background" : "opacity-60 hover:opacity-100"
                }`}
              >
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </motion.div>
        </div>

        {/* Right: Sticky Info Panel */}
        <div className="flex flex-col pt-4 md:pt-10 md:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--clay)] font-medium mb-4">{product.category}</p>
            <h1 className="font-serif text-5xl md:text-6xl text-balance tracking-tight leading-[1.1]">{product.name}</h1>
            <p className="mt-6 text-xl text-muted-foreground text-balance leading-relaxed">{product.description}</p>
          </motion.div>

          <motion.div 
            className="mt-12 glass-panel rounded-3xl p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs uppercase tracking-[0.18em] text-foreground font-semibold">Select Capacity</p>
              <p className="text-sm font-medium text-[var(--clay)]">Available</p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {product.capacities.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCap(c)}
                  className={`relative overflow-hidden rounded-xl border px-6 py-3 text-sm font-medium transition-colors ${
                    activeCap === c
                      ? "border-[var(--clay)] text-[var(--cream)] shadow-md"
                      : "border-border/60 hover:border-[var(--clay)] text-muted-foreground hover:text-foreground bg-background/50"
                  }`}
                >
                  {activeCap === c && (
                    <motion.div
                      layoutId="active-capacity-pdp"
                      className="absolute inset-0 bg-[var(--clay)] z-[-1]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  {c}
                </button>
              ))}
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-10 flex w-full items-center justify-center gap-3 rounded-full bg-foreground px-8 py-4 text-sm font-semibold text-background transition-all hover:bg-[var(--clay)] hover:shadow-hover-lift hover:-translate-y-1"
            >
              <MessageCircle className="h-5 w-5" />
              Contact to Order
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <p className="mt-4 text-center text-xs text-muted-foreground/80">
              Orders are placed via WhatsApp. Free shipping across India.
            </p>
          </motion.div>

          <motion.div 
            className="mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="font-serif text-2xl mb-6">Key Features</h3>
            <ul className="space-y-4">
              {product.features.map((f) => (
                <li key={f} className="flex items-start gap-4">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--clay)]/10">
                    <Check className="h-3.5 w-3.5 text-[var(--clay)]" />
                  </div>
                  <span className="text-sm leading-relaxed text-foreground/90">{f}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Visual Storytelling Sections */}
      <section className="bg-[var(--sand)]/20 py-24 md:py-32 border-t border-border/40">
        <div className="mx-auto max-w-7xl px-6 space-y-32">
          
          {/* How It Works */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="order-2 md:order-1"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-background shadow-soft mb-6">
                <Wind className="h-6 w-6 text-[var(--clay)]" />
              </div>
              <h2 className="font-serif text-4xl md:text-5xl text-balance tracking-tight">The Science of <br/><span className="italic text-[var(--clay)]">Evaporation</span></h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                The porous nature of terracotta allows water to slowly seep through the microscopic pores. As this water evaporates from the outer surface, it draws heat away from the water stored inside.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-6">
                <div className="border-l-2 border-[var(--clay)]/30 pl-4">
                  <p className="font-serif text-2xl text-foreground">8-10°C</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Cooling Effect</p>
                </div>
                <div className="border-l-2 border-[var(--clay)]/30 pl-4">
                  <p className="font-serif text-2xl text-foreground">Zero</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Electricity Used</p>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="order-1 md:order-2 aspect-square rounded-[3rem] overflow-hidden bg-background shadow-premium p-4"
            >
              <img src={product.image} alt="Cooling process" className="w-full h-full object-cover rounded-[2.5rem]" />
            </motion.div>
          </div>

          {/* Care Instructions */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="aspect-square rounded-[3rem] overflow-hidden bg-background shadow-premium p-4"
            >
              <div className="w-full h-full bg-[var(--sand)] rounded-[2.5rem] flex items-center justify-center flex-col gap-6 p-12 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-noise opacity-30 mix-blend-multiply" />
                <Droplets className="h-16 w-16 text-[var(--clay-deep)] relative z-10 opacity-80" />
                <h3 className="font-serif text-3xl text-[var(--clay-deep)] relative z-10">Care for your Clay</h3>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-background shadow-soft mb-6">
                <Info className="h-6 w-6 text-[var(--clay)]" />
              </div>
              <h2 className="font-serif text-4xl md:text-5xl text-balance tracking-tight">Simple Care, <br/><span className="italic text-[var(--clay)]">Lasting Life</span></h2>
              <ul className="mt-8 space-y-6">
                <li className="flex gap-4">
                  <div className="h-6 w-6 rounded-full bg-[var(--clay)]/10 text-[var(--clay)] flex items-center justify-center text-xs font-bold shrink-0 mt-1">1</div>
                  <div>
                    <p className="font-semibold text-foreground">First Use Preparation</p>
                    <p className="text-sm text-muted-foreground mt-1">Soak the product in water for 24 hours before first use to strengthen the clay.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="h-6 w-6 rounded-full bg-[var(--clay)]/10 text-[var(--clay)] flex items-center justify-center text-xs font-bold shrink-0 mt-1">2</div>
                  <div>
                    <p className="font-semibold text-foreground">Gentle Cleaning</p>
                    <p className="text-sm text-muted-foreground mt-1">Use only hot water and a soft brush. Never use chemical soaps or detergents as they will be absorbed into the pores.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="h-6 w-6 rounded-full bg-[var(--clay)]/10 text-[var(--clay)] flex items-center justify-center text-xs font-bold shrink-0 mt-1">3</div>
                  <div>
                    <p className="font-semibold text-foreground">Drying</p>
                    <p className="text-sm text-muted-foreground mt-1">Allow to dry completely in open air or under sunlight occasionally to prevent fungal growth.</p>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="mb-12 font-serif text-4xl tracking-tight">You may also like</h2>
          </motion.div>
          <div className="grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
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
      )}
    </PageTransition>
  );
}
