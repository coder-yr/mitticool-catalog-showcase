import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { useState } from "react";
import { ArrowLeft, Check, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/products/$slug")({
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
    <div className="mx-auto max-w-xl px-6 py-24 text-center">
      <h1 className="font-serif text-4xl">Product not found</h1>
      <Link to="/products" className="mt-6 inline-block text-sm underline underline-offset-4">
        Back to collection
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-xl px-6 py-24 text-center">
      <h1 className="font-serif text-3xl">Something went wrong</h1>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
    </div>
  ),
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const [activeCap, setActiveCap] = useState(product.capacities[0]);

  const related = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 3);

  const whatsappMsg = encodeURIComponent(
    `Hi Mitticool! I'd like to order the ${product.name} (${activeCap}).`
  );
  const whatsappUrl = `https://wa.me/919999999999?text=${whatsappMsg}`;

  return (
    <div>
      <div className="mx-auto max-w-7xl px-6 pt-10">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to collection
        </Link>
      </div>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-10 md:grid-cols-2 md:py-16">
        <div className="animate-[fade-in_0.6s_ease-out_both]">
          <div className="overflow-hidden rounded-3xl bg-[var(--sand)]/40 aspect-square">
            <img
              src={product.image}
              alt={product.name}
              width={1024}
              height={1024}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="overflow-hidden rounded-2xl bg-[var(--sand)]/30 aspect-square">
                <img
                  src={product.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover opacity-90"
                  style={{ transform: `scale(${1 + i * 0.05})` }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="animate-[fade-up_0.7s_ease-out_both]">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{product.category}</p>
          <h1 className="mt-3 font-serif text-5xl md:text-6xl text-balance">{product.name}</h1>
          <p className="mt-5 text-lg text-muted-foreground text-balance">{product.description}</p>

          <div className="mt-8">
            <p className="mb-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">Capacity</p>
            <div className="flex flex-wrap gap-2">
              {product.capacities.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCap(c)}
                  className={`rounded-full border px-5 py-2 text-sm transition-all ${
                    activeCap === c
                      ? "border-[var(--clay)] bg-[var(--clay)] text-[var(--cream)]"
                      : "border-border hover:border-[var(--clay)]"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <ul className="mt-10 space-y-3">
            {product.features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--clay)]" />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-all hover:bg-[var(--clay-deep)] hover:gap-3"
          >
            <MessageCircle className="h-4 w-4" />
            Contact to Order
          </a>
          <p className="mt-3 text-xs text-muted-foreground">
            Opens WhatsApp — we'll confirm availability and shipping.
          </p>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="mb-10 font-serif text-3xl">You may also like</h2>
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
