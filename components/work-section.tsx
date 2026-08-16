"use client";

import { motion } from "motion/react";
import { siteConfig } from "@/lib/config";
import { useLanguage } from "./language-provider";
import { hindiSite, hindiUi } from "@/lib/translations";

const spikeLabRepo = "https://github.com/lakshayxi/spikelab";
const neuroelectronicsLab = "https://www.cense.iisc.ac.in/neuroelectronics/";

export function WorkSection({ showHeading = true }: { showHeading?: boolean }) {
  const { language } = useLanguage();
  const hindi = language === "hi";

  return (
    <section className="py-3">
      {showHeading && <h2 className="mb-2 text-base font-medium tracking-tighter">{hindi ? hindiUi.experience : "Experience"}</h2>}
      <ul className="border-t border-border">
        {siteConfig.roles.map((role) => {
          const translated = hindiSite.roles[role.id as keyof typeof hindiSite.roles];
          return (
            <motion.li key={role.id} initial="rest" whileHover="hover" animate="rest" className="relative border-b border-border">
              <motion.div className="absolute inset-0 -z-10 rounded-md bg-accent" variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }} transition={{ duration: 0.25 }} />
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-2 py-3 text-[15.5px]">
                <span className="min-w-0 font-medium">{hindi ? translated.title : role.title} · {role.organization}</span>
                <span className="shrink-0 text-[14px] font-normal text-muted">{role.range}</span>
              </div>
              <div className="flex flex-col gap-2 px-2 pb-4 pl-7">
                <p className="text-[13.5px] text-muted">{hindi ? translated.employment : role.employment} · {hindi ? translated.location : role.location}</p>
                <ul className="flex flex-col gap-1">
                  {(hindi ? translated.highlights : role.highlights).map((point, index) => (
                    <li key={point} className="flex gap-2 text-[15px] leading-relaxed text-fg/85">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted" />
                      <span className="min-w-0">
                        {role.id === "iisc" && index === 0 && !hindi ? (
                          <>Built and deployed <a href={spikeLabRepo} target="_blank" rel="noreferrer" className="body-link">SpikeLab</a>, an open-source neural signal analysis tool, in the <a href={neuroelectronicsLab} target="_blank" rel="noreferrer" className="body-link">Neuroelectronics Lab</a> at IISc; it reproduced NeuroExplorer results in 95% of tested cases.</>
                        ) : point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}
