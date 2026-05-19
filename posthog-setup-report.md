<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into your Next.js blog. Here's a summary of what was done:

- **`instrumentation-client.ts`** (new): Initialises PostHog using `posthog-js` via the recommended Next.js 15.3+ approach. Includes exception capture (error tracking) and a reverse proxy path (`/ingest`).
- **`next.config.js`** (updated): Added rewrites to proxy PostHog requests through `/ingest/*` to `eu.i.posthog.com`, preventing tracking blockers from intercepting events. Also set `skipTrailingSlashRedirect: true` as required.
- **`.env.local`** (updated): Added `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` environment variables.
- **`app/components/newsletter-subscribe.tsx`** (updated): Converted to a client component; added `onSubmit` handler that fires `newsletter_subscribed` when the form is submitted.
- **`app/components/theme-toggle.tsx`** (updated): Added `theme_toggled` capture in the click handler, including the chosen theme (`light`/`dark`) as a property.
- **`app/components/whimsy-konami.tsx`** (updated): Added `konami_code_unlocked` capture at the point the full Konami sequence is completed.

| Event | Description | File |
|---|---|---|
| `newsletter_subscribed` | User submitted the newsletter subscription form | `app/components/newsletter-subscribe.tsx` |
| `theme_toggled` | User switched between light and dark mode | `app/components/theme-toggle.tsx` |
| `konami_code_unlocked` | User entered the Konami code easter egg sequence | `app/components/whimsy-konami.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics dashboard](/dashboard/690592)
- [Newsletter subscriptions over time](/insights/dlq02Wcm)
- [Total newsletter subscribers](/insights/o12LZnIl)
- [Theme toggle activity (dark vs light)](/insights/ZJF99n5C)
- [Konami code unlocks](/insights/VzGyJ2BI)
- [All engagement events over time](/insights/sickfVZK)

> **Note on `posthog-js` install:** The project's `packageManager` field pins pnpm to v8.15.4, which currently can't be resolved via corepack in this environment. Run `pnpm add posthog-js` (or `npm install posthog-js`) manually to complete the dependency installation before deploying.

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
