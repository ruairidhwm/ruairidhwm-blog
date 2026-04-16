import { BlogPosts } from "app/components/posts";
import { writingSectionWhisper } from "app/lib/whimsy";
import { siteConfig } from "app/site";

export default function Page() {
  const writingHint = writingSectionWhisper();

  return (
    <section>
      <h1 className="page-title text-2xl mb-6">{siteConfig.name}</h1>
      <p className="lede mb-4 max-w-prose">
        {`I'm Ruairidh (/roo-ree/), a senior engineer who's spent the last few years building product at scale. I write about the things I'm actually working on: LLM evaluation, systems design, and whatever rabbit hole I've gone down that week. Code over commentary.`}
      </p>
      <div className="my-10">
        <h2
          className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)] mb-5"
          title={writingHint}
        >
          Writing
        </h2>
        <BlogPosts />
      </div>
    </section>
  );
}
