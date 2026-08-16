"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { siteConfig, type Project } from "@/lib/config";
import { useLanguage } from "./language-provider";
import { hindiSite, hindiUi } from "@/lib/translations";

export function ProjectsSection() {
  const containerRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState<Project | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 300, damping: 22, mass: 0.6 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 22, mass: 0.6 });
  const { language } = useLanguage();
  const hindi = language === "hi";

  function handleMouseMove(event: React.MouseEvent<HTMLUListElement>) {
    const bounds = containerRef.current?.getBoundingClientRect();
    if (!bounds) return;
    mouseX.set(event.clientX - bounds.left);
    mouseY.set(event.clientY - bounds.top);
  }

  return (
    <section className="py-3">
      <div className="mb-2 flex items-center justify-between gap-4">
        <h2 className="text-base font-medium tracking-tighter">{hindi ? hindiUi.projects : "Projects"}</h2>
        <a href={`${siteConfig.basePath}/projects/`} className="text-[12.5px] text-muted underline decoration-border underline-offset-4 transition-colors hover:text-fg hover:decoration-fg">
          {hindi ? hindiUi.detailsReports : "Details & reports →"}
        </a>
      </div>
      <ul ref={containerRef} onMouseMove={handleMouseMove} onMouseLeave={() => setActive(null)} className="relative border-t border-border">
        {siteConfig.projects.map((project) => {
          const translated = hindiSite.projects[project.id as keyof typeof hindiSite.projects];
          return (
          <motion.li key={project.id} onMouseEnter={() => setActive(project)} initial="rest" whileHover="hover" animate="rest" className="relative border-b border-border">
            <motion.div className="absolute inset-0 -z-10 rounded-md bg-accent" variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }} transition={{ duration: 0.25 }} />
            <div className="flex items-center justify-between gap-4 px-2 py-3 text-sm">
              <div className="min-w-0 flex-1">
                <p className="truncate">{project.name}</p>
                <p className="mt-1.5 truncate text-[13.5px] text-muted">{hindi ? translated.description : project.description}</p>
              </div>
              <a href={`${siteConfig.basePath}${project.reportPath}/`} aria-label={hindi ? `${project.name} की रिपोर्ट पढ़ें` : `Read the ${project.name} report`} className="flex shrink-0 cursor-pointer items-center text-muted transition-colors hover:text-fg">
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} />
              </a>
            </div>
          </motion.li>
          );
        })}
        <AnimatePresence mode="popLayout">
          {active && (
            <motion.div
              key={active.id}
              className="pointer-events-none absolute z-20 hidden w-52 sm:block"
              style={{ left: springX, top: springY, x: 24, y: -108 }}
              initial={{ opacity: 0, scale: 0.6, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: -3 }}
              exit={{ opacity: 0, scale: 0.6, rotate: 6 }}
              transition={{ type: "spring", bounce: 0.5, duration: 0.45 }}
            >
              <div className="grid aspect-4/3 w-full place-items-center overflow-hidden rounded-xl border border-border p-5 shadow-xl" style={{ background: `linear-gradient(140deg, ${active.gradientFrom}, ${active.gradientTo})` }}>
                <span className="text-lg font-medium tracking-tight text-[#182126]">{active.name}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </ul>
    </section>
  );
}
