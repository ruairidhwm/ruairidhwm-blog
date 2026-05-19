'use client'

import posthog from 'posthog-js'

function buildEmbedAction(username: string): string {
  const trimmed = username.trim().replace(/^\/+/, "").replace(/\/+$/, "");
  const segment = trimmed.split("/")[0] ?? "";
  return `https://buttondown.com/api/emails/embed-subscribe/${encodeURIComponent(segment)}`;
}

export function NewsletterSubscribe() {
  const username = process.env.NEXT_PUBLIC_BUTTONDOWN_USERNAME?.trim();
  if (!username) return null;

  const tag = process.env.NEXT_PUBLIC_BUTTONDOWN_TAG?.trim();

  function handleSubmit() {
    posthog.capture('newsletter_subscribed')
  }

  return (
    <section
      className="mt-10 w-full max-w-md border-t border-[var(--color-border)] pt-10"
      aria-labelledby="newsletter-heading"
    >
      <h2
        id="newsletter-heading"
        className="m-0 font-heading text-balance text-[var(--color-fg)] text-sm font-semibold tracking-tight"
      >
        Newsletter
      </h2>
      <p className="mt-1 max-w-md text-pretty text-[var(--color-muted)] text-sm leading-relaxed">
        Get new posts by email. No spam — unsubscribe anytime.
      </p>
      <form
        action={buildEmbedAction(username)}
        method="post"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 w-full"
        aria-describedby="newsletter-submit-hint"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2">
          <label
            htmlFor="bd-email"
            className="text-[var(--color-muted)] text-sm leading-snug"
          >
            Email
          </label>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
            <input
              id="bd-email"
              type="email"
              name="email"
              required
              autoComplete="email"
              inputMode="email"
              spellCheck={false}
              placeholder="you@example.com…"
              className="min-h-11 min-w-0 flex-1 rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-[var(--color-fg)] text-sm outline-none transition-[border-color,box-shadow] placeholder:text-[var(--color-muted)] focus-visible:border-[var(--color-accent)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent-soft)]"
            />
            {tag ? <input type="hidden" name="tag" value={tag} /> : null}
            <button
              type="submit"
              className="link-tap inline-flex min-h-11 w-full shrink-0 items-center justify-center rounded-md border border-[var(--color-accent)] bg-[var(--color-accent-soft)] px-4 py-2 font-medium text-[var(--color-accent)] text-sm motion-safe:transition-colors hover:bg-[var(--color-glow)] sm:w-auto"
            >
              Subscribe
            </button>
          </div>
        </div>
        <p
          id="newsletter-submit-hint"
          className="mt-2 text-[var(--color-muted)] text-xs leading-snug"
        >
          Subscribe opens Buttondown in a new tab to confirm.
        </p>
      </form>
    </section>
  );
}
