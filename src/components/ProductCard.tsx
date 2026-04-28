import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import type { Product } from "@/data/products";

const MotionLink = motion.create(Link);

export function ProductCard({ product }: { product: Product }) {
  return (
    <MotionLink
      to="/products/$slug"
      params={{ slug: product.slug }}
      className="group block relative"
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl bg-[var(--sand)]/40 aspect-[4/5] shadow-soft"
        variants={{
          hover: {
            y: -8,
            boxShadow: "var(--shadow-hover-lift)",
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
          },
        }}
      >
        <motion.img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover"
          variants={{
            hover: { scale: 1.08, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
          }}
        />

        {/* Gradient Fade for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--clay-deep)]/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Top Tag */}
        <div className="absolute left-4 top-4 rounded-full bg-background/80 px-3 py-1 text-[10px] uppercase tracking-wider text-foreground backdrop-blur">
          {product.tag}
        </div>

        {/* Quick View Overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 backdrop-blur-[2px]"
          variants={{
            hover: { opacity: 1, transition: { duration: 0.4 } },
          }}
        >
          <div className="flex items-center gap-2 rounded-full bg-background/90 px-4 py-2 text-sm font-medium text-foreground shadow-premium backdrop-blur">
            <Eye className="h-4 w-4" /> Quick View
          </div>
        </motion.div>
      </motion.div>

      <div className="mt-4 flex flex-col gap-1 px-1">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {product.category}
        </p>
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-serif text-xl leading-tight text-foreground transition-colors group-hover:text-[var(--clay)]">
            {product.name}
          </h3>
          <span className="shrink-0 text-xs text-muted-foreground">
            {product.capacities[0]} {product.capacities.length > 1 && "+"}
          </span>
        </div>
      </div>
    </MotionLink>
  );
}
