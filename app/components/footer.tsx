import Link from "next/link";
import { footerWhisper } from "app/lib/whimsy";
import { NewsletterSubscribe } from "app/components/newsletter-subscribe";

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  );
}

const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL;
const linkedinUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL;

export default function Footer() {
  const whisper = footerWhisper();

  return (
    <footer className="mb-16">
      <NewsletterSubscribe />
      <ul className="mt-10 flex flex-col gap-2 text-[var(--color-muted)] text-sm md:flex-row md:flex-wrap md:items-start md:gap-x-6 md:gap-y-2">
        <li>
          <Link
            className="link-styled link-tap inline-flex min-h-11 items-center gap-2 rounded-md py-2 pe-2 motion-safe:transition-colors"
            href="/rss"
            title="Syndicate this site"
          >
            <ArrowIcon />
            <span className="text-[0.68rem] font-medium uppercase tracking-[0.18em] leading-none">
              rss
            </span>
          </Link>
        </li>
        {githubUrl ? (
          <li>
            <a
              className="link-styled link-tap inline-flex min-h-11 items-center gap-2 rounded-md py-2 pe-2 motion-safe:transition-colors"
              rel="noopener noreferrer"
              target="_blank"
              href={githubUrl}
              aria-label="GitHub (opens in a new tab)"
            >
              <ArrowIcon />
              <span className="text-[0.68rem] font-medium uppercase tracking-[0.18em] leading-none">
                github
              </span>
            </a>
          </li>
        ) : null}
        {linkedinUrl ? (
          <li>
            <a
              className="link-styled link-tap inline-flex min-h-11 items-center gap-2 rounded-md py-2 pe-2 motion-safe:transition-colors"
              rel="noopener noreferrer"
              target="_blank"
              href={linkedinUrl}
              aria-label="LinkedIn (opens in a new tab)"
            >
              <ArrowIcon />
              <span className="text-[0.68rem] font-medium uppercase tracking-[0.18em] leading-none">
                linkedin
              </span>
            </a>
          </li>
        ) : null}
      </ul>
      <p
        className="mt-8 text-[var(--color-muted)] text-sm leading-relaxed"
        title={whisper}
      >
        © {new Date().getFullYear()} Ruairidh Wynne-McCorry
      </p>
    </footer>
  );
}
