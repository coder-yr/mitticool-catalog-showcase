import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MessageCircle, MapPin, Mail } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Mitticool" },
      { name: "description", content: "Get in touch with Mitticool. WhatsApp, email, or send us a message. Based in Gujarat, India." },
      { property: "og:title", content: "Contact — Mitticool" },
      { property: "og:description", content: "Get in touch with Mitticool, based in Gujarat, India." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="mx-auto max-w-6xl px-6 pt-20 pb-20 md:pt-28">
      <div className="grid gap-16 md:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Say hello</p>
          <h1 className="mt-3 font-serif text-5xl md:text-6xl text-balance">
            Let's talk clay.
          </h1>
          <p className="mt-5 max-w-md text-muted-foreground">
            Whether you're ordering, commissioning a piece, or just curious about the craft — we'd love to hear from you.
          </p>

          <div className="mt-10 space-y-5">
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-border bg-[var(--clay)] p-5 text-[var(--cream)] transition-all hover:-translate-y-0.5 hover:shadow-elev"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--cream)]/15">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider opacity-80">Preferred</p>
                <p className="font-medium">Chat on WhatsApp</p>
              </div>
            </a>

            <div className="flex items-center gap-4 rounded-2xl border border-border p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--sand)]">
                <Mail className="h-5 w-5 text-[var(--clay)]" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Email</p>
                <p className="font-medium">hello@mitticool.in</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-border p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--sand)]">
                <MapPin className="h-5 w-5 text-[var(--clay)]" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Studio</p>
                <p className="font-medium">Wankaner, Gujarat · India</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-8 shadow-soft md:p-10">
          {sent ? (
            <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--clay)]/10">
                <MessageCircle className="h-7 w-7 text-[var(--clay)]" />
              </div>
              <h3 className="mt-6 font-serif text-3xl">Thank you.</h3>
              <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                We've received your message and will get back to you within a day.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-6 text-sm underline underline-offset-4"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h2 className="font-serif text-2xl">Send a message</h2>
              <Field label="Name">
                <input required name="name" className={inputCls} />
              </Field>
              <Field label="Phone">
                <input required name="phone" type="tel" className={inputCls} />
              </Field>
              <Field label="Message">
                <textarea required name="message" rows={5} className={`${inputCls} resize-none`} />
              </Field>
              <button
                type="submit"
                className="w-full rounded-full bg-primary py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-[var(--clay-deep)]"
              >
                Send message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

const inputCls =
  "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--clay)] focus:ring-2 focus:ring-[var(--clay)]/20";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
