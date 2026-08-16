export type Theme = {
  id: string;
  label: string;
  bg: string;
  fg: string;
  muted: string;
  border: string;
  accent: string;
  accentFg: string;
  swatch: string;
};

export type Role = {
  id: string;
  title: string;
  organization: string;
  employment: string;
  range: string;
  location: string;
  highlights: string[];
};

export type Project = {
  id: string;
  name: string;
  year: string;
  description: string;
  href: string;
  liveHref?: string;
  reportPath: string;
  highlights: string[];
  extraLinks?: { label: string; href: string }[];
  gradientFrom: string;
  gradientTo: string;
};

export const siteConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://lakshaysaini.me",
  fullName: "Lakshay Saini",
  email: "lakshay23@iiserb.ac.in",
  openToWork: false,
  bio: {
    intro:
      "i’m curious, easily pulled into a good rabbit hole, and usually have one more idea than i have time for. i like good conversations, making things, and figuring out why they work or why they quietly fall apart. some of that becomes something real; the rest becomes experiments, notes, half-built ideas, and questions i keep coming back to.",
    intensity:
      "i’m not naturally a middle-of-the-road person. when something matters to me, i tend to go all in. i’m still learning where that intensity is useful, when to rein it in, and which things are worth giving it to.",
  },
  social: [
    { label: "GitHub", href: "https://github.com/lakshayxi" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/lakshayxi/" },
  ],
  roles: [
    {
      id: "iisc",
      title: "Summer Intern",
      organization: "Indian Institute of Science (IISc)",
      employment: "Internship",
      range: "June '26 – July '26",
      location: "Bangalore · On-site",
      highlights: [
        "Built and deployed SpikeLab, an open-source neural signal analysis tool, in the Neuroelectronics Lab at IISc; it reproduced NeuroExplorer results in 95% of tested cases.",
        "Implemented spike and burst detection, waveform and firing-rate analysis, deterministic validation, tests, and reproducible exports.",
      ],
    },
    {
      id: "worldquant",
      title: "Research Consultant",
      organization: "WorldQuant",
      employment: "Part-time",
      range: "April '26 – June '26",
      location: "Remote",
      highlights: [
        "Researched quantitative signals using financial and market data on the WorldQuant BRAIN platform.",
        "Built Python tooling for alpha ideation, backtesting, metric-based filtering, and experiment tracking.",
      ],
    },
    {
      id: "bel",
      title: "Summer Intern",
      organization: "Bharat Electronics Limited",
      employment: "Internship",
      range: "May '25 – July '25",
      location: "Panchkula · On-site",
      highlights: [
        "Worked with satellite communication equipment and signal-processing systems in the Testing Department.",
        "Supported device testing, verification, fault identification, and technical documentation.",
      ],
    },
  ] satisfies Role[],
  projects: [
    {
      id: "localmd",
      name: "LocalMD",
      year: "2026",
      description: "Local-first Markdown reading and editing for the browser and macOS, with explicit privacy and file safety.",
      href: "https://github.com/lakshayxi/LocalMD",
      liveHref: "https://localmd-12t.pages.dev",
      reportPath: "/projects/localmd",
      highlights: [
        "Shipped a browser release with rich Markdown rendering, local drafts, save fallbacks, and production-verified privacy controls.",
        "Extended the shared core into an Apple Silicon macOS beta with native file handling and unsaved-change protection.",
      ],
      gradientFrom: "#d5d9d2",
      gradientTo: "#91a19a",
    },
    {
      id: "spikelab",
      name: "SpikeLab",
      year: "2026",
      description: "Offline MEA spike detection, burst analysis, waveform metrics, and electrode comparisons.",
      href: "https://github.com/lakshayxi/spikelab",
      reportPath: "/projects/spikelab",
      highlights: [
        "Built a local Streamlit workflow for continuous recordings and pre-sorted NeuroExplorer spike data, covering spike, waveform, ISI, firing-rate, and burst analysis.",
        "Added deterministic regression fixtures for burst algorithms, filtered detection, waveform boundaries, and EDF calibration; these checks validate implementation behaviour, not biological validity.",
      ],
      extraLinks: [
        {
          label: "Validation",
          href: "https://github.com/lakshayxi/spikelab/blob/main/docs/VALIDATION.md",
        },
      ],
      gradientFrom: "#c9dde5",
      gradientTo: "#8fb4c2",
    },
    {
      id: "sage",
      name: "Sage",
      year: "2026",
      description: "Citation-grounded research across financial documents using hybrid retrieval and reranking.",
      href: "https://github.com/lakshayxi/sage",
      reportPath: "/projects/sage",
      highlights: [
        "Combined BM25 and vector retrieval with reciprocal-rank fusion, company-balanced retrieval, cross-encoder reranking, and page-resolved citations.",
        "Recorded 19/19 evaluation checks on three real SEC filings and 290 passing backend tests, while documenting live-use failures and remaining retrieval limitations.",
      ],
      gradientFrom: "#d8dfc4",
      gradientTo: "#9eb193",
    },
    {
      id: "glimpse",
      name: "Glimpse",
      year: "2026",
      description: "Multimodal VQA fusion benchmarking with ViT, BERT, co-attention, and LoRA.",
      href: "https://github.com/lakshayxi/glimpse",
      reportPath: "/projects/glimpse",
      highlights: [
        "Compared eight frozen-CLIP fusion heads; the 657K-parameter GeometryFusion model led the track at 63.3% validation accuracy.",
        "Trained an end-to-end ViT-B/16 and BERT co-attention model to a 67.6% VQA soft score after fixing soft-label, masking, pooling, and tokenizer issues.",
      ],
      extraLinks: [
        {
          label: "Results",
          href: "https://github.com/lakshayxi/glimpse/tree/main/results",
        },
      ],
      gradientFrom: "#d8cce4",
      gradientTo: "#a6a1cc",
    },
    {
      id: "paperscope",
      name: "PaperScope",
      year: "2026",
      description: "Venue-calibrated ML paper evaluation built from historical OpenReview evidence.",
      href: "https://github.com/lakshayxi/paperscope",
      reportPath: "/projects/paperscope",
      highlights: [
        "Built a leakage-safe, forum-level evaluation workflow with closed model inputs, private labels, disjoint calibration sets, and hash validation.",
        "Across descriptive ICLR pilots, calibration reduced rating MAE by 21.8%, increased decision accuracy from 62.9% to 77.1%, and reduced false accepts from 9 to 2.",
      ],
      gradientFrom: "#ead9bd",
      gradientTo: "#c6a480",
    },
  ] satisfies Project[],
  defaultThemeId: "ink",
  themes: [
    {
      id: "paper",
      label: "Paper",
      bg: "#f2efe8",
      fg: "#252321",
      muted: "#716c65",
      border: "#d9d3c8",
      accent: "#e7e1d7",
      accentFg: "#252321",
      swatch: "#f2efe8",
    },
    {
      id: "ink",
      label: "Ink",
      bg: "#1b1a19",
      fg: "#e8e5df",
      muted: "#b7b2ab",
      border: "#353230",
      accent: "#272624",
      accentFg: "#e8e5df",
      swatch: "#1b1a19",
    },
  ] satisfies Theme[],
};
