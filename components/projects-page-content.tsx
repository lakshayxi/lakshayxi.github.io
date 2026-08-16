"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { ThemeSwitcher } from "./theme-switcher";
import { siteConfig } from "@/lib/config";

export function ProjectsPageContent() {
  return (
    <main className="mx-auto min-h-dvh w-full max-w-2xl px-5 py-8 sm:px-7 sm:py-12">
      <header className="flex items-start justify-between gap-4 border-b border-border pb-5">
        <div>
          <a href={`${siteConfig.basePath}/`} className="mb-6 inline-flex items-center gap-1.5 text-[13px] text-muted transition-colors hover:text-fg">
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.75} />
            Home
          </a>
          <h1 className="text-2xl font-medium tracking-tighter sm:text-3xl">Projects & Reports</h1>
          <p className="mt-2 max-w-xl text-[14.5px] leading-relaxed text-muted">
            Short, readable case studies: what I asked, what I built, what worked, and what did not.
          </p>
        </div>
        <ThemeSwitcher />
      </header>

      <section aria-labelledby="project-list-heading" className="py-3">
        <h2 id="project-list-heading" className="sr-only">Selected projects</h2>
        <div className="divide-y divide-border border-b border-border">
          {siteConfig.projects.map((project) => {
            return (
              <article key={project.id} id={project.id} className="py-8 first:pt-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                  <h2 className="text-lg font-medium tracking-tight">{project.name}</h2>
                  <span className="text-[12px] text-muted">{project.year}</span>
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13.5px]">
                  <a href={project.href} target="_blank" rel="noreferrer" className="underline decoration-border underline-offset-4 hover:decoration-fg">
                    Source code
                  </a>
                  {project.liveHref && (
                    <>
                      <span className="text-border" aria-hidden="true">·</span>
                      <a href={project.liveHref} target="_blank" rel="noreferrer" className="underline decoration-border underline-offset-4 hover:decoration-fg">
                        Live app
                      </a>
                    </>
                  )}
                </div>

                <p className="mt-4 text-[15px] leading-relaxed text-fg/90">{project.description}</p>
                <ul className="mt-4 flex flex-col gap-2 pl-5 text-[14.5px] leading-relaxed text-muted">
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className="list-disc pl-1">{highlight}</li>
                  ))}
                </ul>

                <a href={`${siteConfig.basePath}${project.reportPath}/`} className="mt-4 inline-flex items-center gap-1.5 text-[13px] text-fg underline decoration-border underline-offset-4 hover:decoration-fg">
                  Read report
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                </a>
              </article>
            );
          })}
        </div>
      </section>

      <footer className="flex flex-wrap items-center justify-between gap-3 pt-6 text-[12px] text-muted">
        <a href={`${siteConfig.basePath}/`} className="underline decoration-border underline-offset-4 hover:text-fg hover:decoration-fg">← Back home</a>
        <a href={`mailto:${siteConfig.email}`} className="underline decoration-border underline-offset-4 hover:text-fg hover:decoration-fg">{siteConfig.email}</a>
      </footer>
    </main>
  );
}
