"use client";

import Image from "next/image";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { ThemeSwitcher } from "./theme-switcher";
import { useLanguage } from "./language-provider";
import type { ProjectReport } from "@/lib/project-reports";
import { siteConfig } from "@/lib/config";
import { hindiReports, hindiUi } from "@/lib/translations";

export function ProjectReportContent({ report }: { report: ProjectReport }) {
  const { language } = useLanguage();
  const hindi = language === "hi";
  const translated = hindiReports[report.slug as keyof typeof hindiReports];

  return (
    <main className="mx-auto min-h-dvh w-full max-w-2xl px-5 py-8 sm:px-7 sm:py-12">
      <header className="flex items-start justify-between gap-4 border-b border-border pb-6">
        <div>
          <a href={`${siteConfig.basePath}/projects/`} className="mb-7 inline-flex items-center gap-1.5 text-[13px] text-muted transition-colors hover:text-fg">
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.75} />
            {hindi ? hindiUi.allProjects : "All projects"}
          </a>
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.16em] text-muted">{hindi ? hindiUi.projectReport : "Project report"} · {report.year}</p>
          <h1 className="text-3xl font-medium tracking-[-0.04em] sm:text-4xl">{report.name}</h1>
          <p className="mt-2 text-[14px] leading-relaxed text-muted">{hindi ? translated.kicker : report.kicker}</p>
        </div>
        <ThemeSwitcher />
      </header>

      <article className="report-body py-2">
        <section aria-labelledby="one-line" className="border-b border-border py-7">
          <h2 id="one-line" className="report-label">{hindi ? hindiUi.inOneLine : "In one line"}</h2>
          <p className="mt-3 text-[17px] leading-relaxed tracking-[-0.012em] sm:text-[18px]">{hindi ? translated.answer : report.answer}</p>
        </section>

        <section aria-labelledby="question" className="report-section">
          <h2 id="question" className="report-heading">{hindi ? hindiUi.question : "Question"}</h2>
          <p>{hindi ? translated.question : report.question}</p>
        </section>

        <section aria-labelledby="implementation" className="report-section">
          <h2 id="implementation" className="report-heading">{hindi ? hindiUi.whatBuilt : "What I built"}</h2>
          <ul>{(hindi ? translated.implementation : report.implementation).map((item) => <li key={item}>{item}</li>)}</ul>
        </section>

        <section aria-labelledby="results" className="report-section">
          <h2 id="results" className="report-heading">{hindi ? hindiUi.mainResult : "Main result"}</h2>
          <dl className={`mt-4 grid gap-px overflow-hidden rounded-md border border-border bg-border ${report.results.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
            {report.results.map((metric, index) => (
              <div key={metric.label} className="bg-bg p-4">
                <dt className="text-[12.5px] leading-snug text-muted">{hindi ? translated.resultLabels[index] : metric.label}</dt>
                <dd className="mt-1.5 text-xl font-medium tracking-[-0.035em]">{metric.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {report.slug === "localmd" && (
          <section aria-labelledby="localmd-document-path" className="report-section">
            <h2 id="localmd-document-path" className="report-heading">Document path</h2>
            <div className="mt-4 grid items-stretch gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:gap-4">
              <DocumentPathStep label="Open locally" detail="Choose a file, drop it, paste text, or start a new document." />
              <DocumentPathArrow />
              <DocumentPathStep label="Process on device" detail="Parse, sanitize, render, edit, and recover without a document backend." />
              <DocumentPathArrow />
              <DocumentPathStep label="Save locally" detail="Write to the file where supported, or download the same bytes." />
            </div>
            <p className="mt-4 text-[13px] leading-relaxed text-muted">No upload endpoint receives the document. Remote media stays blocked until the reader allows it.</p>
          </section>
        )}

        {report.slug === "spikelab" && (
          <section aria-labelledby="spikelab-result-figure" className="report-section">
            <h2 id="spikelab-result-figure" className="report-heading">{hindi ? "परिणाम का चित्र" : "Result figure"}</h2>
            <figure className="mt-4">
              <Image
                src={`${siteConfig.basePath}/spikelab/filtered-spike-regression.png`}
                alt={hindi ? "Filtered synthetic voltage trace में threshold crossings, retained detections और refractory-suppressed crossing" : "Filtered synthetic voltage trace with threshold crossings, retained detections, and the refractory-suppressed crossing"}
                width={1780}
                height={1244}
                sizes="(max-width: 672px) 100vw, 616px"
                className="h-auto w-full rounded-sm border border-border"
              />
              <figcaption className="mt-2 text-[12.5px] leading-relaxed text-muted">
                {hindi
                  ? "Synthetic regression fixture: छह threshold crossings मिलते हैं और पाँच retain होते हैं। यह documented software behaviour की जाँच है, biological validation नहीं।"
                  : "Synthetic regression fixture: six threshold crossings are found and five are retained. This checks documented software behaviour; it is not biological validation."}
              </figcaption>
            </figure>
          </section>
        )}

        {report.slug === "paperscope" && (
          <section aria-labelledby="paperscope-result-figures" className="report-section">
            <h2 id="paperscope-result-figures" className="report-heading">{hindi ? "परिणामों के चित्र" : "Result figures"}</h2>
            <div className="mt-4 flex flex-col gap-7">
              <figure>
                <Image
                  src={`${siteConfig.basePath}/paperscope/calibration-impact.png`}
                  alt={hindi ? "Generic और PaperScope conditions में rating MAE, decision accuracy और false accepts की तुलना" : "Comparison of rating MAE, decision accuracy, and false accepts for the Generic and PaperScope conditions"}
                  width={1826}
                  height={1007}
                  sizes="(max-width: 672px) 100vw, 616px"
                  className="h-auto w-full rounded-sm border border-border"
                />
                <figcaption className="mt-2 text-[12.5px] leading-relaxed text-muted">
                  {hindi
                    ? "दो ICLR 2024 pilot runs में calibration के बाद rating error घटा, decision accuracy बढ़ी और false accepts कम हुए। ये descriptive results हैं; statistical significance का दावा नहीं।"
                    : "Across two ICLR 2024 pilots, calibration reduced rating error, raised decision accuracy, and cut false accepts. These are descriptive results, not a significance claim."}
                </figcaption>
              </figure>
              <figure>
                <Image
                  src={`${siteConfig.basePath}/paperscope/decision-confusion-matrices.png`}
                  alt={hindi ? "Generic और PaperScope decision predictions की side-by-side confusion matrices" : "Side-by-side confusion matrices for Generic and PaperScope decision predictions"}
                  width={1772}
                  height={1101}
                  sizes="(max-width: 672px) 100vw, 616px"
                  className="h-auto w-full rounded-sm border border-border"
                />
                <figcaption className="mt-2 text-[12.5px] leading-relaxed text-muted">
                  {hindi
                    ? "False accepts 9 से 2 हुए, लेकिन false rejects 4 से 6 हुए। Confusion matrices इस trade-off को साफ़ दिखाते हैं।"
                    : "False accepts fell from 9 to 2, while false rejects rose from 4 to 6. The matrices keep that trade-off visible."}
                </figcaption>
              </figure>
            </div>
          </section>
        )}

        {report.slug === "glimpse" && (
          <section aria-labelledby="result-figures" className="report-section">
            <h2 id="result-figures" className="report-heading">{hindi ? "परिणामों के चित्र" : "Result figures"}</h2>
            <div className="mt-4 flex flex-col gap-7">
              <figure>
                <Image
                  src={`${siteConfig.basePath}/glimpse/fusion-head-ranking.png`}
                  alt={hindi ? "आठ frozen CLIP fusion models की validation accuracy, F1 score और parameter count की तुलना" : "Ranked validation accuracy, F1 score, and parameter count for eight frozen CLIP fusion models"}
                  width={1734}
                  height={1280}
                  sizes="(max-width: 672px) 100vw, 616px"
                  className="h-auto w-full rounded-sm border border-border"
                />
                <figcaption className="mt-2 text-[12.5px] leading-relaxed text-muted">
                  {hindi
                    ? "Frozen CLIP track: GeometryFusion सबसे कम parameter count वाले models जितना छोटा है, फिर भी सबसे आगे है। Scale documented 50% chance baseline से शुरू होता है।"
                    : "Frozen CLIP track: GeometryFusion leads despite matching the smallest parameter count. The scale begins at the documented 50% chance baseline."}
                </figcaption>
              </figure>
              <figure>
                <Image
                  src={`${siteConfig.basePath}/glimpse/vit-bert-iterations.png`}
                  alt={hindi ? "ViT और BERT model के v2, v3 और v4 validation scores" : "Validation scores for ViT and BERT model iterations v2, v3, and v4"}
                  width={1735}
                  height={1127}
                  sizes="(max-width: 672px) 100vw, 616px"
                  className="h-auto w-full rounded-sm border border-border"
                />
                <figcaption className="mt-2 text-[12.5px] leading-relaxed text-muted">
                  {hindi
                    ? "ViT+BERT iterations: 10-point rise iteration history है, controlled ablation नहीं, versions के बीच कई implementation fixes बदले।"
                    : "ViT+BERT iterations: the 10-point rise is an iteration history, not a controlled ablation, multiple implementation fixes changed between versions."}
                </figcaption>
              </figure>
            </div>
          </section>
        )}

        <section aria-labelledby="findings" className="report-section">
          <h2 id="findings" className="report-heading">{hindi ? hindiUi.findings : "What the work showed"}</h2>
          <ul>{(hindi ? translated.findings : report.findings).map((item) => <li key={item}>{item}</li>)}</ul>
        </section>

        <section aria-labelledby="limits" className="report-section">
          <h2 id="limits" className="report-heading">{hindi ? hindiUi.limitations : "What it does not prove"}</h2>
          <ul>{(hindi ? translated.limitations : report.limitations).map((item) => <li key={item}>{item}</li>)}</ul>
        </section>

        <section aria-labelledby="conclusion" className="report-section border-b-0">
          <h2 id="conclusion" className="report-heading">{hindi ? hindiUi.conclusion : "Conclusion"}</h2>
          <p>{hindi ? translated.conclusion : report.conclusion}</p>
        </section>

        <aside aria-labelledby="sources" className="rounded-md border border-border bg-accent/50 p-4 text-[13px] leading-relaxed">
          <h2 id="sources" className="font-medium text-fg">{hindi ? hindiUi.sourceMaterial : "Source material"}</h2>
          <p className="mt-1 text-muted">{hindi ? hindiUi.sourceDescription : "The report above is written for this portfolio. These links contain the code and underlying records."}</p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
            <a href={report.repository} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 underline decoration-border underline-offset-4 hover:decoration-fg">
              {hindi ? hindiUi.sourceCode : "Source code"} <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} />
            </a>
            {report.evidence.map((item, index) => (
              <a key={item.href} href={item.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 underline decoration-border underline-offset-4 hover:decoration-fg">
                {hindi ? translated.evidenceLabels[index] : item.label} <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} />
              </a>
            ))}
          </div>
        </aside>
      </article>

      <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6 text-[12px] text-muted">
        <a href={`${siteConfig.basePath}/projects/`} className="underline decoration-border underline-offset-4 hover:text-fg hover:decoration-fg">← {hindi ? hindiUi.moreProjects : "More projects"}</a>
        <span>{siteConfig.fullName} · {report.year}</span>
      </footer>
    </main>
  );
}

function DocumentPathStep({ label, detail }: { label: string; detail: string }) {
  return (
    <div className="rounded-md border border-border bg-accent/45 p-4">
      <p className="text-[14px] font-medium text-fg">{label}</p>
      <p className="mt-2 text-[12.5px] leading-relaxed text-muted">{detail}</p>
    </div>
  );
}

function DocumentPathArrow() {
  return (
    <div className="grid place-items-center text-muted" aria-hidden="true">
      <ArrowDown className="h-4 w-4 sm:hidden" strokeWidth={1.5} />
      <ArrowRight className="hidden h-4 w-4 sm:block" strokeWidth={1.5} />
    </div>
  );
}
