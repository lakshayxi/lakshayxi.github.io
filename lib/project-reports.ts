export type ReportMetric = {
  value: string;
  label: string;
};

export type ProjectReport = {
  slug: string;
  name: string;
  year: string;
  kicker: string;
  question: string;
  answer: string;
  implementation: string[];
  results: ReportMetric[];
  findings: string[];
  limitations: string[];
  conclusion: string;
  repository: string;
  evidence: { label: string; href: string }[];
};

export const projectReports: ProjectReport[] = [
  {
    slug: "localmd",
    name: "LocalMD",
    year: "2026",
    kicker: "Markdown stays on your device",
    question:
      "Can one Markdown reader support rich rendering, safe editing, and file recovery without sending a document to a server?",
    answer:
      "LocalMD reads and edits Markdown in the browser or a native macOS app. It keeps document processing on the device and makes save behaviour explicit.",
    implementation: [
      "Built Read, Edit, and Split modes with rich Markdown rendering, local draft recovery, file conflict checks, and byte-preserving saves.",
      "Moved parsing into a worker and mounted large documents in slices. Documents over 2 MiB open in a read-only fast mode.",
      "Added a Content Security Policy and a separate remote-media gate. Both controls protect the browser privacy claim.",
      "Built an Apple Silicon macOS beta with native dialogs, atomic replacement, opaque document handles, and unsaved-change protection.",
    ],
    results: [
      { value: "25/25", label: "live browser production checks passed" },
      { value: "88.4 KB", label: "initial JavaScript, gzipped" },
      { value: "1.877 s", label: "warm 1 MB render on Apple M4" },
    ],
    findings: [
      "A worker did not improve performance until the app split result transfer and document mounting into smaller slices.",
      "The Content Security Policy blocks programmatic network access. The renderer separately blocks remote media until the reader allows it.",
      "Save behaviour must follow platform capability. Chromium can save in place, while Firefox and Safari download the same bytes.",
    ],
    limitations: [
      "The macOS v0.2.0 build is an unsigned Apple Silicon beta. It is not signed or notarized for standard distribution.",
      "Web save-in-place requires a supported Chromium browser. Firefox and Safari use a download fallback.",
      "Relative local assets do not resolve. Browser drafts remain unencrypted and do not replace a backup.",
      "The recorded performance run used one Apple M4 machine and warm dependencies.",
    ],
    conclusion:
      "LocalMD treats privacy and file handling as product behaviour, not marketing copy. The browser release is public, while the native app remains a clearly labelled beta.",
    repository: "https://github.com/lakshayxi/LocalMD",
    evidence: [
      { label: "Live browser", href: "https://localmd-12t.pages.dev" },
      { label: "Browser release record", href: "https://github.com/lakshayxi/LocalMD/blob/main/reports/gate-b-release.md" },
      { label: "Performance record", href: "https://github.com/lakshayxi/LocalMD/blob/main/reports/gate-b-performance.md" },
      { label: "macOS status", href: "https://github.com/lakshayxi/LocalMD/blob/main/reports/macos/implementation-status.md" },
    ],
  },
  {
    slug: "spikelab",
    name: "SpikeLab",
    year: "2026",
    kicker: "Neural signal analysis without a black box",
    question:
      "Can one local tool make multi-electrode array analysis reproducible, from raw spike detection to burst and waveform measurements, without hiding the important decisions?",
    answer:
      "SpikeLab turns continuous recordings and pre-sorted NeuroExplorer data into a traceable analysis workflow. Every stage can be inspected, rerun, and exported instead of being locked inside a proprietary interface.",
    implementation: [
      "Built an offline Streamlit application for spike detection, waveform analysis, inter-spike intervals, firing rates, burst detection, and electrode comparison.",
      "Supported both continuous recordings and already sorted NeuroExplorer spike data so the same measurements can be checked across workflows.",
      "Added reproducible exports and deterministic fixtures for burst algorithms, filtered detection, waveform boundaries, and EDF calibration.",
    ],
    results: [
      { value: "95%", label: "of tested NeuroExplorer results reproduced" },
      { value: "4", label: "analysis areas covered by regression fixtures" },
    ],
    findings: [
      "The tool reproduced the reference NeuroExplorer output in 95% of the cases recorded during the project.",
      "Fixed inputs now produce fixed expected outputs, making changes to detection and burst logic easier to audit.",
      "The workflow keeps raw traces, detected events, derived metrics, and exports connected, reducing manual hand-offs between tools.",
    ],
    limitations: [
      "The deterministic fixtures check software behaviour; they do not prove that an algorithm is biologically correct for every preparation.",
      "Detection thresholds and burst parameters still require experimental judgement and should be reported with any scientific result.",
    ],
    conclusion:
      "SpikeLab makes neural-signal analysis easier to inspect and reproduce. Its strongest contribution is not a new biological claim; it is a dependable path from a recording to results that can be checked.",
    repository: "https://github.com/lakshayxi/spikelab",
    evidence: [
      { label: "Technical documentation", href: "https://github.com/lakshayxi/spikelab/blob/main/docs/DOCUMENTATION.md" },
      { label: "Validation notes", href: "https://github.com/lakshayxi/spikelab/blob/main/docs/VALIDATION.md" },
    ],
  },
  {
    slug: "sage",
    name: "Sage",
    year: "2026",
    kicker: "Answers that point back to the filing",
    question:
      "Can a research assistant answer questions across long financial filings while showing exactly which pages support the answer?",
    answer:
      "Sage retrieves evidence with both keyword and semantic search, reranks it, and returns page-level citations. The goal is a useful answer that a reader can verify, not a fluent answer that asks to be trusted.",
    implementation: [
      "Combined BM25 keyword search and vector retrieval with reciprocal-rank fusion so exact financial terms and semantically related passages both matter.",
      "Balanced retrieval across companies before cross-encoder reranking to prevent one large filing from dominating the context.",
      "Resolved citations back to source pages and built an evaluation set from three real SEC filings.",
    ],
    results: [
      { value: "19/19", label: "documented evaluation checks passed" },
      { value: "290", label: "backend tests passing" },
    ],
    findings: [
      "Hybrid retrieval was more dependable than relying on keyword or vector search alone for financial language.",
      "Company-balanced retrieval improved multi-company questions by keeping evidence from each requested filing in play.",
      "Browser-based user testing exposed citation and retrieval failures that ordinary unit tests did not reveal.",
    ],
    limitations: [
      "A citation proves where a statement came from; it does not guarantee that the model interpreted the passage correctly.",
      "The recorded evaluation covers three SEC filings and should not be treated as evidence for every filing type or research question.",
    ],
    conclusion:
      "Sage is useful when auditability matters more than a polished paragraph. Its design keeps retrieval, reranking, and citations visible enough to debug, and gives the reader a direct path back to the source.",
    repository: "https://github.com/lakshayxi/sage",
    evidence: [
      { label: "User-testing report", href: "https://github.com/lakshayxi/sage/blob/main/docs/user-testing/user-testing.md" },
      { label: "Repository overview", href: "https://github.com/lakshayxi/sage" },
    ],
  },
  {
    slug: "glimpse",
    name: "Glimpse",
    year: "2026",
    kicker: "A controlled look at multimodal fusion",
    question:
      "When an image encoder and a language encoder must answer a visual question together, which fusion design earns its complexity?",
    answer:
      "Glimpse compares eight lightweight CLIP fusion heads, then trains a larger ViT–BERT co-attention model. The work separates architecture ideas from implementation mistakes by recording both results and the bugs found along the way.",
    implementation: [
      "Benchmarked eight fusion heads on frozen CLIP features so the comparison focused on how visual and text representations were combined.",
      "Built GeometryFusion, a 657K-parameter head that uses similarity structure instead of simply concatenating embeddings.",
      "Trained an end-to-end ViT-B/16 and BERT model with co-attention, while correcting soft-label, masking, pooling, and tokenization issues.",
    ],
    results: [
      { value: "63.3%", label: "best frozen-CLIP validation accuracy" },
      { value: "67.6", label: "VQA soft score for the ViT–BERT model" },
    ],
    findings: [
      "GeometryFusion led the frozen-feature track while staying small enough to train as a focused fusion experiment.",
      "The larger co-attention model improved the documented VQA soft score, but also made data and masking bugs much more consequential.",
      "Correct soft targets and attention masks changed the trustworthiness of the experiment as much as the architecture choice did.",
    ],
    limitations: [
      "The 63.3% accuracy and 67.6 soft score come from different documented experiment tracks and should not be compared as if they were the same metric.",
      "These are validation results from the recorded runs, not a claim of state-of-the-art performance.",
    ],
    conclusion:
      "The project showed that a thoughtful fusion head can beat simpler combinations without becoming large. It also reinforced a less glamorous result: clean labels and masks are prerequisites for believing any architecture comparison.",
    repository: "https://github.com/lakshayxi/glimpse",
    evidence: [
      { label: "Experiment report", href: "https://github.com/lakshayxi/glimpse/blob/main/README.md" },
      { label: "Recorded results", href: "https://github.com/lakshayxi/glimpse/tree/main/results" },
    ],
  },
  {
    slug: "paperscope",
    name: "PaperScope",
    year: "2026",
    kicker: "Paper evaluation calibrated to a real venue",
    question:
      "Can an AI paper evaluator become more useful by learning a venue's historical standards without leaking the final review decision into its input?",
    answer:
      "PaperScope compares a general evaluator with one calibrated on historical OpenReview evidence. The evaluation keeps paper text and labels separate, then measures whether calibration improves rating and decision estimates.",
    implementation: [
      "Created forum-level datasets from OpenReview while keeping model inputs closed and final decisions private during prediction.",
      "Used disjoint calibration and evaluation sets, plus hash checks, to reduce accidental leakage between examples.",
      "Measured rating error, decision accuracy, and false accepts rather than relying on persuasive generated reviews alone.",
    ],
    results: [
      { value: "−21.8%", label: "rating MAE in the descriptive ICLR pilots" },
      { value: "62.9 → 77.1%", label: "decision accuracy after calibration" },
      { value: "9 → 2", label: "false accepts in the recorded comparison" },
    ],
    findings: [
      "Venue calibration improved each of the three recorded descriptive metrics in the ICLR pilot runs.",
      "The largest practical change was fewer false accepts, suggesting the calibrated evaluator became more conservative in the tested setting.",
      "Leakage controls were essential because a strong score is meaningless if review outcomes can reach the model input.",
    ],
    limitations: [
      "The pilot results are descriptive and were not reported as statistically significant.",
      "The evidence is not yet cross-venue; behaviour on other conferences or fields may differ.",
      "The system estimates historical review behaviour. It does not define scientific quality or replace expert review.",
    ],
    conclusion:
      "Historical calibration made the evaluator more aligned with the tested venue, especially on false accepts. The result is promising, but the careful claim is narrow: it worked in these ICLR pilots and still needs broader validation.",
    repository: "https://github.com/lakshayxi/paperscope",
    evidence: [
      { label: "Evaluation report", href: "https://github.com/lakshayxi/paperscope/blob/main/docs/evaluation.md" },
      { label: "Repository overview", href: "https://github.com/lakshayxi/paperscope" },
    ],
  },
];

export function getProjectReport(slug: string) {
  return projectReports.find((report) => report.slug === slug);
}
