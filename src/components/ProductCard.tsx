import { Link } from "@tanstack/react-router";
import type { Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/products/$slug"
      params={{ slug: product.slug }}
      className="group block"
    >
      <div className="relative overflow-hidden rounded-2xl bg-[var(--sand)]/40 aspect-[4/5]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={1024}
          height={1024}
          className="img-zoom h-full w-full object-cover"
        />
        <div className="absolute left-4 top-4 rounded-full bg-background/80 px-3 py-1 text-[10px] uppercase tracking-wider text-foreground backdrop-blur">
          {product.tag}
        </div>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-3">
        <h3 className="font-serif text-lg leading-tight">{product.name}</h3>
        <span className="text-xs text-muted-foreground">
          {product.capacities.join(" · ")}
        </span>
      </div>
      <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
        {product.category}
      </p>
    </Link>
  );
}
