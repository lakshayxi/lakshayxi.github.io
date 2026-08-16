"use client";

import { siteConfig } from "@/lib/config";
import { useLanguage } from "./language-provider";
import { hindiSite } from "@/lib/translations";

export function HomeIntro() {
  const { language } = useLanguage();
  const hindi = language === "hi";

  return (
    <section className="border-y border-border py-7 sm:py-8">
      <div
        lang={hindi ? "hi" : "en"}
        className={`max-w-[39rem] space-y-5 text-[17px] leading-relaxed tracking-[-0.012em] sm:text-[19px] ${hindi ? "font-reading-hi" : ""}`}
      >
        <p>{hindi ? hindiSite.bio.intro : siteConfig.bio.intro}</p>
        <p>{hindi ? hindiSite.bio.intensity : siteConfig.bio.intensity}</p>
        {hindi ? (
          <p>
            मैं अपने final year में <a href="https://tbvl22.github.io/website/" target="_blank" rel="noreferrer" className="body-link">tbvl</a> में <a href="https://sites.google.com/iiitd.ac.in/agarwalakshay/" target="_blank" rel="noreferrer" className="body-link">dr. akshay agarwal</a> के guidance में काम कर रहा हूँ, और अभी deep learning/computer vision के multimodal arena में काम कर रहा हूँ। मैं कभी-कभी <a href={`${siteConfig.basePath}/oss/`} className="body-link">open source projects</a> में भी योगदान देता हूँ।
          </p>
        ) : (
          <p>
            i’m in my final year working in <a href="https://tbvl22.github.io/website/" target="_blank" rel="noreferrer" className="body-link">tbvl</a> under the guidance of <a href="https://sites.google.com/iiitd.ac.in/agarwalakshay/" target="_blank" rel="noreferrer" className="body-link">dr. akshay agarwal</a>, currently working in the multimodal arena of deep learning/computer vision. i also contribute to <a href={`${siteConfig.basePath}/oss/`} className="body-link">open source projects</a> sometimes.
          </p>
        )}
      </div>
    </section>
  );
}
