"use client";

import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ThemeSwitcher } from "./theme-switcher";
import { siteConfig } from "@/lib/config";
import { ossContributions, ossCounts, type ContributionStatus, type OssContribution } from "@/lib/oss-contributions";

const copy = {
  en: {
    back: "Home",
    eyebrow: "Public work · 2026",
    title: "Open source",
    kicker: "Some rabbit holes end with a note. A few end with a pull request.",
    introLabel: "Why I do it",
    intro: "I contribute when I find a problem I can understand well enough to fix. It is a good way to learn how real codebases make decisions, and to leave a small corner of them better than I found it.",
    merged: "Merged",
    open: "Open",
    repositories: "Repositories",
    across: (count: number) => `Across ${count} repositories`,
    usedTag: "part of my ML workflow",
    landedHeading: "Landed and reviewed",
    landedIntro: "Changes that made it upstream after review.",
    openHeading: "Still in motion",
    openIntro: "These pull requests remain open. Review can change both the code and the outcome.",
    issue: "Issue",
    pullRequest: "Pull request",
    repository: "Repository",
    snapshotHeading: "Status note",
    snapshot: "This is a snapshot from 17 August 2026. Merged means the change landed upstream. Open pull requests can still change.",
    backHome: "Back home",
  },
  hi: {
    back: "होम",
    eyebrow: "Public work · 2026",
    title: "Open source",
    kicker: "कुछ rabbit holes एक note पर खत्म होते हैं। कुछ pull request बन जाते हैं।",
    introLabel: "मैं यह क्यों करता हूँ",
    intro: "जब कोई problem इतनी समझ आ जाती है कि मैं उसे ठीक कर सकूँ, तब मैं contribute करता हूँ। इससे पता चलता है कि real codebases फैसले कैसे लेते हैं, और उनका एक छोटा हिस्सा पहले से बेहतर छोड़ने का मौका मिलता है।",
    merged: "Merged",
    open: "Open",
    repositories: "Repositories",
    across: (count: number) => `${count} repositories में`,
    usedTag: "मेरे ML workflow का हिस्सा",
    landedHeading: "Landed और reviewed",
    landedIntro: "वे changes जो review के बाद upstream पहुँचे।",
    openHeading: "अभी जारी",
    openIntro: "ये pull requests अभी open हैं। Review code और outcome, दोनों बदल सकता है।",
    issue: "Issue",
    pullRequest: "Pull request",
    repository: "Repository",
    snapshotHeading: "Status note",
    snapshot: "यह 17 अगस्त 2026 का snapshot है। Merged का अर्थ है कि change upstream पहुँच गया। Open pull requests अभी बदल सकते हैं।",
    backHome: "होम पर वापस",
  },
} as const;

function ContributionRow({ contribution, hindi }: { contribution: OssContribution; hindi: boolean }) {
  const labels = copy[hindi ? "hi" : "en"];

  return (
    <article className="group border-l-2 border-border py-1 pl-4 transition-colors hover:border-fg/45 sm:pl-5">
      {contribution.personallyUsed && (
        <p className="mb-2.5 inline-flex items-center gap-1.5 rounded-full border border-fg/25 bg-accent px-2.5 py-1 text-[11.5px] font-medium leading-none text-fg">
          <span aria-hidden="true">✦</span>
          {labels.usedTag}
        </p>
      )}
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
        <h3 className="text-[17px] font-medium tracking-[-0.022em] sm:text-[18px]">
          {contribution.repository}{" "}
          <span className="font-normal text-muted">#{contribution.pullRequest}</span>
        </h3>
        <span className="pt-0.5 text-[10.5px] font-medium uppercase tracking-[0.14em] text-muted">
          {statusLabel(contribution.status, labels)}
        </span>
      </div>
      <p className="mt-2.5 text-[15px] leading-[1.7] text-fg/90 sm:text-[16px]">
        {hindi ? contribution.summaryHi : contribution.summary}
      </p>
      <div className="mt-3.5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[12.5px] text-muted">
        <span>{contribution.language}</span>
        <span aria-hidden="true">·</span>
        <span>{contribution.kind}</span>
        <span aria-hidden="true">·</span>
        <ExternalLink href={contribution.pullRequestUrl} label={labels.pullRequest} />
        <ExternalLink href={contribution.issueUrl} label={labels.issue} />
        <ExternalLink href={contribution.repositoryUrl} label={labels.repository} />
      </div>
    </article>
  );
}

function ExternalLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 underline decoration-border underline-offset-4 transition-colors hover:text-fg hover:decoration-fg">
      {label}
      <ArrowUpRight className="h-3 w-3" strokeWidth={1.75} />
    </a>
  );
}

function statusLabel(status: ContributionStatus, labels: typeof copy.en | typeof copy.hi) {
  if (status === "merged") return labels.merged;
  return labels.open;
}

export function OssPageContent() {
  const labels = copy.en;
  const landed = ossContributions.filter((item) => item.status !== "open");
  const open = ossContributions.filter((item) => item.status === "open");

  return (
    <main className="mx-auto min-h-dvh w-full max-w-2xl px-5 py-8 sm:px-7 sm:py-12">
      <header className="flex items-start justify-between gap-4 border-b border-border pb-6">
        <div>
          <a href={`${siteConfig.basePath}/`} className="mb-7 inline-flex items-center gap-1.5 text-[13px] text-muted transition-colors hover:text-fg">
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.75} />
            {labels.back}
          </a>
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.16em] text-muted">{labels.eyebrow}</p>
          <h1 className="text-3xl font-medium tracking-[-0.04em] sm:text-4xl">{labels.title}</h1>
          <p className="mt-2 max-w-lg text-[14px] leading-relaxed text-muted">{labels.kicker}</p>
        </div>
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
        </div>
      </header>

      <article className="report-body py-2">
        <section aria-labelledby="why-open-source" className="border-b border-border py-7">
          <h2 id="why-open-source" className="report-label">{labels.introLabel}</h2>
          <p className="mt-3 text-[17px] leading-relaxed tracking-[-0.012em] sm:text-[18px]">{labels.intro}</p>
        </section>

        <section aria-labelledby="contribution-snapshot" className="report-section">
          <h2 id="contribution-snapshot" className="report-heading">{labels.across(ossCounts.repositories)}</h2>
          <dl className="mt-4 grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-3">
            <Metric label={labels.merged} value={ossCounts.merged} />
            <Metric label={labels.open} value={ossCounts.open} />
            <Metric label={labels.repositories} value={ossCounts.repositories} />
          </dl>
        </section>

        <ContributionGroup id="landed" heading={labels.landedHeading} intro={labels.landedIntro} contributions={landed} hindi={false} />
        <ContributionGroup id="open" heading={labels.openHeading} intro={labels.openIntro} contributions={open} hindi={false} />

        <aside aria-labelledby="status-note" className="my-7 rounded-md border border-border bg-accent/50 p-4 text-[13px] leading-relaxed">
          <h2 id="status-note" className="font-medium text-fg">{labels.snapshotHeading}</h2>
          <p className="mt-1 text-muted">{labels.snapshot}</p>
        </aside>
      </article>

      <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6 text-[12px] text-muted">
        <a href={`${siteConfig.basePath}/`} className="underline decoration-border underline-offset-4 hover:text-fg hover:decoration-fg">← {labels.backHome}</a>
        <a href="https://github.com/lakshayxi" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 underline decoration-border underline-offset-4 hover:text-fg hover:decoration-fg">
          github.com/lakshayxi <ArrowUpRight className="h-3 w-3" strokeWidth={1.75} />
        </a>
      </footer>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-bg p-4">
      <dt className="text-[12.5px] leading-snug text-muted">{label}</dt>
      <dd className="mt-1.5 text-xl font-medium tracking-[-0.035em]">{value}</dd>
    </div>
  );
}

function ContributionGroup({
  id,
  heading,
  intro,
  contributions,
  hindi,
}: {
  id: string;
  heading: string;
  intro: string;
  contributions: OssContribution[];
  hindi: boolean;
}) {
  return (
    <section aria-labelledby={`${id}-heading`} className="report-section">
      <h2 id={`${id}-heading`} className="report-heading">{heading}</h2>
      <p>{intro}</p>
      <div className="mt-6 flex flex-col gap-7">
        {contributions.map((contribution) => (
          <ContributionRow key={contribution.id} contribution={contribution} hindi={hindi} />
        ))}
      </div>
    </section>
  );
}
