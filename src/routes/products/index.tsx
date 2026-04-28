import { createFileRoute, Link } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useMemo, useState, useEffect } from "react";
import { products, type Category } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { PageTransition } from "@/components/PageTransition";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const categoryEnum = z.enum(["All", "Water Pots", "Kitchen", "Drinkware"]);
const searchSchema = z.object({
  category: fallback(categoryEnum, "All").default("All"),
  capacity: fallback(z.string(), "All").default("All"),
  q: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/products/")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Collection — Mitticool Clay Products" },
      { name: "description", content: "Browse handcrafted clay pots, handis, kadais, bottles, and drinkware. Filter by category and capacity." },
      { property: "og:title", content: "Collection — Mitticool Clay Products" },
      { property: "og:description", content: "Handcrafted clay pots, kitchenware, and drinkware." },
    ],
  }),
  component: ProductsPage,
});

const capacityBuckets = ["All", "Under 1L", "1–3L", "3–8L", "8L+"] as const;

function inBucket(caps: string[], bucket: string) {
  if (bucket === "All") return true;
  const toL = (c: string) => (c.includes("ml") ? parseFloat(c) / 1000 : parseFloat(c));
  return caps.some((c) => {
    const v = toL(c);
    if (bucket === "Under 1L") return v < 1;
    if (bucket === "1–3L") return v >= 1 && v < 3;
    if (bucket === "3–8L") return v >= 3 && v < 8;
    if (bucket === "8L+") return v >= 8;
    return true;
  });
}

function ProductsPage() {
  const { category, capacity, q } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [query, setQuery] = useState(q);
  const [isPending, setIsPending] = useState(true);

  // Simulate network delay for premium feel
  useEffect(() => {
    setIsPending(true);
    const t = setTimeout(() => setIsPending(false), 600);
    return () => clearTimeout(t);
  }, [category, capacity, query]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return products.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (!inBucket(p.capacities, capacity)) return false;
      if (needle && !p.name.toLowerCase().includes(needle) && !p.tag.toLowerCase().includes(needle)) return false;
      return true;
    });
  }, [category, capacity, query]);

  const cats: (Category | "All")[] = ["All", "Water Pots", "Kitchen", "Drinkware"];

  return (
    <PageTransition>
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-10 md:pt-24">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-xs uppercase tracking-[0.2em] text-[var(--clay)] font-medium"
        >
          The Collection
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 font-serif text-5xl md:text-7xl text-balance tracking-tight"
        >
          Every piece,<br/><span className="italic text-muted-foreground/80">hand-thrown.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-xl text-lg text-muted-foreground"
        >
          Filter by category or capacity to find the vessel that fits your home.
        </motion.p>
      </section>

      <section className="mx-auto max-w-7xl px-6 relative z-10">
        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="sticky top-[72px] z-30 -mx-6 mb-12 border-y border-border/50 bg-background/70 px-6 py-4 backdrop-blur-xl saturate-150"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              {cats.map((c) => (
                <button
                  key={c}
                  onClick={() => navigate({ search: (prev) => ({ ...prev, category: c }) })}
                  className={`relative overflow-hidden rounded-full border px-5 py-2 text-sm transition-colors ${
                    category === c
                      ? "border-[var(--clay)] text-[var(--cream)]"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {category === c && (
                    <motion.div
                      layoutId="active-category"
                      className="absolute inset-0 bg-[var(--clay)] z-[-1]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  {c}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <select
                value={capacity}
                onChange={(e) => navigate({ search: (prev) => ({ ...prev, capacity: e.target.value }) })}
                className="rounded-full border border-border/50 bg-background/50 px-5 py-2 text-sm text-foreground outline-none transition-all focus:border-[var(--clay)] focus:ring-1 focus:ring-[var(--clay)] backdrop-blur-sm"
              >
                {capacityBuckets.map((b) => (
                  <option key={b} value={b}>{b === "All" ? "All capacities" : b}</option>
                ))}
              </select>

              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-56 rounded-full border border-border/50 bg-background/50 pl-11 pr-10 py-2 text-sm outline-none transition-all focus:border-[var(--clay)] focus:ring-1 focus:ring-[var(--clay)] backdrop-blur-sm"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    aria-label="Clear"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {isPending ? (
          <div className="grid gap-x-6 gap-y-16 pb-24 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/5] rounded-2xl bg-muted/60" />
                <div className="mt-4 h-5 w-2/3 rounded-full bg-muted/60" />
                <div className="mt-2 h-4 w-1/3 rounded-full bg-muted/60" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-32 text-center"
          >
            <p className="font-serif text-3xl">Nothing found.</p>
            <p className="mt-3 text-muted-foreground">We couldn't find any pieces matching your criteria.</p>
            <Link
              to="/products"
              search={{ category: "All", capacity: "All", q: "" }}
              onClick={() => setQuery("")}
              className="mt-6 inline-block text-sm font-medium underline underline-offset-8 hover:text-[var(--clay)] transition-colors"
            >
              Reset filters
            </Link>
          </motion.div>
        ) : (
          <motion.div 
            layout
            className="grid gap-x-6 gap-y-16 pb-24 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>
    </PageTransition>
  );
}
