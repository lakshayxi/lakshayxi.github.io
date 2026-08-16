"""Generate the two Glimpse figures used in the portfolio report.

Source data:
- https://github.com/lakshayxi/glimpse/blob/main/results/summary.json
- https://github.com/lakshayxi/glimpse/blob/main/README.md

Chart contract:
1. Rank frozen-CLIP fusion heads by validation accuracy above the documented
   50% chance baseline. Direct-label accuracy, F1, and parameter count.
2. Show the documented ViT+BERT v2-v4 score progression as discrete bars.
   This is an iteration history, not a controlled ablation.
"""

from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np


OUTPUT_DIR = Path(__file__).resolve().parents[1] / "public" / "glimpse"

BG = "#f5f4f0"
FG = "#1a1a1a"
MUTED = "#6f6d67"
GRID = "#d8d5cd"
ACCENT = "#315f70"
ACCENT_LIGHT = "#8fb4c2"
BAR = "#a8a69f"


def style_axes(ax: plt.Axes) -> None:
    ax.set_facecolor(BG)
    for spine in ax.spines.values():
        spine.set_visible(False)
    ax.tick_params(length=0, colors=MUTED, labelsize=9)


def save_figure(fig: plt.Figure, filename: str) -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    fig.savefig(
        OUTPUT_DIR / filename,
        dpi=180,
        bbox_inches="tight",
        facecolor=BG,
        pad_inches=0.34,
    )
    plt.close(fig)


def fusion_ranking() -> None:
    rows = [
        ("GeometryFusion", 63.30, 0.6617, "657K"),
        ("BilinearFusion", 60.15, 0.5999, "657K"),
        ("ConcatMLP", 58.59, 0.5942, "657K"),
        ("LayerAdaptiveFusion", 57.18, 0.5854, "6.5M"),
        ("CrossAttentionFusion", 57.13, 0.6081, "1.2M"),
        ("MultiGlimpse", 56.92, 0.6103, "3.3M"),
        ("TokenGrounding", 56.30, 0.5629, "6.4M"),
        ("CrossAttentionFusionV2", 55.94, 0.6386, "6.4M"),
    ]

    names = [row[0] for row in rows]
    accuracy = np.array([row[1] for row in rows])
    f1_scores = [row[2] for row in rows]
    params = [row[3] for row in rows]
    y = np.arange(len(rows))

    fig, ax = plt.subplots(figsize=(10.2, 6.7))
    fig.patch.set_facecolor(BG)
    style_axes(ax)

    colors = [ACCENT] + [BAR] * (len(rows) - 1)
    ax.barh(y, accuracy - 50, left=50, height=0.54, color=colors, edgecolor="none")
    ax.invert_yaxis()
    ax.set_xlim(49.4, 70.2)
    ax.set_yticks(y, names, fontsize=9.2, color=FG)
    ax.set_xticks([50, 55, 60, 65])
    ax.set_xticklabels(["50", "55", "60", "65"])
    ax.xaxis.grid(True, color=GRID, linewidth=0.75)
    ax.set_axisbelow(True)
    ax.axvline(50, color=MUTED, linewidth=1.0, linestyle=(0, (3, 3)))

    for index, (score, f1, param_count) in enumerate(zip(accuracy, f1_scores, params)):
        ax.text(score + 0.22, index, f"{score + 1e-9:.1f}%", va="center", ha="left", fontsize=9.3, color=FG, fontweight="bold" if index == 0 else "normal")
        ax.text(66.5, index, f"F1 {f1:.3f}", va="center", ha="left", fontsize=8.5, color=MUTED)
        ax.text(69.9, index, param_count, va="center", ha="right", fontsize=8.5, color=MUTED)

    ax.text(50, -0.82, "CHANCE", fontsize=7.2, color=MUTED, ha="center", va="bottom", fontweight="bold")
    ax.text(66.5, -0.82, "F1 SCORE", fontsize=7.2, color=MUTED, ha="left", va="bottom", fontweight="bold")
    ax.text(69.9, -0.82, "PARAMS", fontsize=7.2, color=MUTED, ha="right", va="bottom", fontweight="bold")

    fig.text(0.08, 0.965, "Simpler fusion wins on frozen CLIP features", fontsize=17, color=FG, fontweight="bold", ha="left", va="top")
    fig.text(0.08, 0.925, "Validation accuracy on the held-out 20% of 80,537 yes/no VQA-v2 questions · sorted high to low", fontsize=10, color=MUTED, ha="left", va="top")
    fig.text(0.08, 0.028, "GeometryFusion leads by 3.2 points over BilinearFusion with the same parameter count.", fontsize=9.2, color=FG, ha="left")
    fig.text(0.08, 0.008, "Source: results/summary.json · Frozen CLIP ViT-B/32 · Accuracy scale begins at the documented 50% chance baseline.", fontsize=7.8, color=MUTED, ha="left")
    fig.subplots_adjust(left=0.225, right=0.95, top=0.84, bottom=0.13)

    save_figure(fig, "fusion-head-ranking.png")


def vit_bert_iterations() -> None:
    versions = ["v2", "v3", "v4"]
    scores = [57.6, 66.9, 67.6]
    labels = [
        "hard-label bug",
        "four pipeline fixes",
        "tokenizer + smoothing",
    ]
    x = np.arange(len(versions))

    fig, ax = plt.subplots(figsize=(10.2, 5.9))
    fig.patch.set_facecolor(BG)
    style_axes(ax)

    bars = ax.bar(x, scores, width=0.48, color=[BAR, ACCENT_LIGHT, ACCENT], edgecolor="none")
    ax.set_ylim(0, 74)
    ax.set_xlim(-0.65, 2.65)
    ax.set_yticks([0, 20, 40, 60])
    ax.set_yticklabels(["0", "20", "40", "60"])
    ax.yaxis.grid(True, color=GRID, linewidth=0.75)
    ax.set_axisbelow(True)
    ax.set_xticks(x)
    ax.set_xticklabels([f"{version}\n{label}" for version, label in zip(versions, labels)], color=FG, fontsize=9.2, linespacing=1.5)
    ax.set_ylabel("VQA soft score", color=MUTED, fontsize=9, labelpad=12)

    for bar, score in zip(bars, scores):
        ax.text(bar.get_x() + bar.get_width() / 2, score + 1.25, f"{score:.1f}", ha="center", va="bottom", color=FG, fontsize=12, fontweight="bold")

    ax.annotate(
        "+9.3 points",
        xy=(1, 66.9),
        xytext=(0.47, 69.4),
        color=ACCENT,
        fontsize=9,
        fontweight="bold",
        arrowprops={"arrowstyle": "-", "color": ACCENT, "linewidth": 1.0},
        ha="center",
    )
    ax.annotate(
        "+0.7",
        xy=(2, 67.6),
        xytext=(1.63, 72.0),
        color=ACCENT,
        fontsize=9,
        fontweight="bold",
        arrowprops={"arrowstyle": "-", "color": ACCENT, "linewidth": 1.0},
        ha="center",
    )

    fig.text(0.08, 0.955, "Most of the ViT+BERT gain came from fixing the pipeline", fontsize=17, color=FG, fontweight="bold", ha="left", va="top")
    fig.text(0.08, 0.912, "Documented best validation scores across the comparable full-VQA iterations", fontsize=10, color=MUTED, ha="left", va="top")
    fig.text(0.08, 0.035, "v2 → v4: +10.0 points. The largest jump followed fixes to soft labels, masking and pooling.", fontsize=9.2, color=FG, ha="left")
    fig.text(0.08, 0.012, "Source: repository README · Iteration history, not a controlled ablation; multiple implementation changes occurred between versions.", fontsize=7.8, color=MUTED, ha="left")
    fig.subplots_adjust(left=0.12, right=0.95, top=0.81, bottom=0.22)

    save_figure(fig, "vit-bert-iterations.png")


if __name__ == "__main__":
    fusion_ranking()
    vit_bert_iterations()
