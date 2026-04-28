import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-[var(--cream)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="inline-block h-7 w-7 rounded-full bg-[var(--clay)]" aria-hidden />
            <span className="font-serif text-xl">Mitticool</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Eco-friendly clay products, hand-thrown in Gujarat. Natural cooling. Sustainable living.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-medium tracking-wide text-foreground">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/products" className="hover:text-foreground">Collection</Link></li>
            <li><Link to="/about" className="hover:text-foreground">Our story</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-medium tracking-wide text-foreground">Visit</h4>
          <p className="text-sm text-muted-foreground">
            Wankaner, Gujarat<br />
            India
          </p>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Mitticool. Crafted by hand, made to last.
        </div>
      </div>
    </footer>
  );
}
