import { createFileRoute, Link } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useMemo, useState } from "react";
import { products, type Category } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Search, X } from "lucide-react";

const categoryEnum = z.enum(["All", "Water Pots", "Kitchen", "Drinkware"]);
const searchSchema = z.object({
  category: fallback(categoryEnum, "All").default("All"),
  capacity: fallback(z.string(), "All").default("All"),
  q: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/products")({
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
    <div>
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-10 md:pt-20">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">The Collection</p>
        <h1 className="mt-2 font-serif text-5xl md:text-6xl text-balance">
          Every piece, hand-thrown.
        </h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Filter by category or capacity to find the vessel that fits your home.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6">
        {/* Filters */}
        <div className="sticky top-[72px] z-30 -mx-6 mb-10 border-y border-border bg-background/85 px-6 py-4 backdrop-blur-lg">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              {cats.map((c) => (
                <button
                  key={c}
                  onClick={() => navigate({ search: (prev) => ({ ...prev, category: c }) })}
                  className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                    category === c
                      ? "border-[var(--clay)] bg-[var(--clay)] text-[var(--cream)]"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <select
                value={capacity}
                onChange={(e) => navigate({ search: (prev) => ({ ...prev, capacity: e.target.value }) })}
                className="rounded-full border border-border bg-background px-4 py-1.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-[var(--clay)]/30"
              >
                {capacityBuckets.map((b) => (
                  <option key={b} value={b}>{b === "All" ? "All capacities" : b}</option>
                ))}
              </select>

              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-48 rounded-full border border-border bg-background pl-9 pr-9 py-1.5 text-sm outline-none focus:ring-2 focus:ring-[var(--clay)]/30"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    aria-label="Clear"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-serif text-2xl">Nothing here yet.</p>
            <p className="mt-2 text-sm text-muted-foreground">Try adjusting your filters.</p>
            <Link
              to="/products"
              search={{ category: "All", capacity: "All", q: "" }}
              onClick={() => setQuery("")}
              className="mt-5 inline-block text-sm underline underline-offset-4"
            >
              Reset filters
            </Link>
          </div>
        ) : (
          <div className="grid gap-x-6 gap-y-12 pb-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
