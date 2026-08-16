"""Generate the PaperScope figures used in the portfolio report.

Primary source:
- https://github.com/lakshayxi/paperscope/blob/main/docs/evaluation.md

Chart contract:
1. Compare the pooled generic and calibrated conditions on three unlike metrics
   in separate zero-based panels. Never imply that the metrics share a scale.
2. Show both decision confusion matrices on one shared 0-16 count scale so the
   reduction in false accepts and increase in false rejects remain visible.
"""

from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np
from matplotlib.colors import LinearSegmentedColormap


OUTPUT_DIR = Path(__file__).resolve().parents[1] / "public" / "paperscope"

BG = "#f5f4f0"
FG = "#1a1a1a"
MUTED = "#716f6a"
GRID = "#d8d5cd"
ACCENT = "#315f70"
NEUTRAL = "#a8a69f"


def style_axes(ax: plt.Axes) -> None:
    ax.set_facecolor(BG)
    for spine in ax.spines.values():
        spine.set_visible(False)
    ax.tick_params(length=0, colors=MUTED, labelsize=8.5)


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


def calibration_impact() -> None:
    panels = [
        {
            "title": "Rating error fell",
            "subtitle": "MAE · lower is better · n=50",
            "values": [1.3260, 1.0374],
            "limit": 1.6,
            "ticks": [0, 0.5, 1.0, 1.5],
            "labels": ["1.33", "1.04"],
            "delta": "−21.8%",
        },
        {
            "title": "Decision accuracy rose",
            "subtitle": "Percent · higher is better · n=35",
            "values": [62.9, 77.1],
            "limit": 100,
            "ticks": [0, 25, 50, 75, 100],
            "labels": ["62.9%", "77.1%"],
            "delta": "+14.3 pp",
        },
        {
            "title": "False accepts fell",
            "subtitle": "Count · fewer is better · n=35",
            "values": [9, 2],
            "limit": 10,
            "ticks": [0, 2, 4, 6, 8, 10],
            "labels": ["9", "2"],
            "delta": "−7",
        },
    ]

    fig, axes = plt.subplots(1, 3, figsize=(10.2, 5.15))
    fig.patch.set_facecolor(BG)

    for ax, panel in zip(axes, panels):
        style_axes(ax)
        values = panel["values"]
        y = np.array([1, 0])
        ax.barh(y, values, height=0.44, color=[NEUTRAL, ACCENT], edgecolor="none")
        ax.set_xlim(0, panel["limit"])
        ax.set_ylim(-0.65, 1.6)
        ax.set_xticks(panel["ticks"])
        ax.set_yticks(y, ["Generic", "PaperScope"], color=FG, fontsize=9)
        ax.xaxis.grid(True, color=GRID, linewidth=0.75)
        ax.set_axisbelow(True)
        ax.set_title(panel["title"], loc="left", color=FG, fontsize=11.5, fontweight="bold", pad=30)
        ax.text(0, 1.43, panel["subtitle"], color=MUTED, fontsize=8.5, ha="left", va="bottom")

        label_offset = panel["limit"] * 0.025
        for index, (value, label) in enumerate(zip(values, panel["labels"])):
            ax.text(
                value + label_offset,
                y[index],
                label,
                va="center",
                ha="left",
                color=FG,
                fontsize=9.5,
                fontweight="bold" if index == 1 else "normal",
            )
        ax.text(
            0,
            -0.52,
            panel["delta"],
            color=ACCENT,
            fontsize=10.5,
            fontweight="bold",
            ha="left",
        )

    fig.text(0.06, 0.965, "Calibration improved all three recorded pilot metrics", fontsize=17, color=FG, fontweight="bold", ha="left", va="top")
    fig.text(0.06, 0.92, "Pooled descriptive results from two disjoint, abstract-only ICLR 2024 pilots", fontsize=10, color=MUTED, ha="left", va="top")
    fig.text(0.06, 0.04, "The clearest practical change was seven fewer false accepts.", fontsize=9.2, color=FG, ha="left")
    fig.text(0.06, 0.015, "Source: docs/evaluation.md · Same model and settings within each pilot · Descriptive results, not a significance claim.", fontsize=7.8, color=MUTED, ha="left")
    fig.subplots_adjust(left=0.12, right=0.965, top=0.72, bottom=0.22, wspace=0.52)

    save_figure(fig, "calibration-impact.png")


def _count_cmap(color: str) -> LinearSegmentedColormap:
    return LinearSegmentedColormap.from_list("portfolio_count", [BG, color])


def _luminance(color: tuple[float, float, float, float]) -> float:
    red, green, blue = color[:3]
    return 0.2126 * red + 0.7152 * green + 0.0722 * blue


def decision_confusion_matrices() -> None:
    matrices = [
        ("Generic", np.array([[13, 4], [9, 9]]), NEUTRAL),
        ("PaperScope", np.array([[11, 6], [2, 16]]), ACCENT),
    ]
    tags = np.array([["TP", "FN"], ["FP", "TN"]])
    vmax = 16

    fig, axes = plt.subplots(1, 2, figsize=(10.2, 5.7))
    fig.patch.set_facecolor(BG)

    for ax, (title, matrix, color) in zip(axes, matrices):
        style_axes(ax)
        cmap = _count_cmap(color)
        image = ax.imshow(matrix, cmap=cmap, vmin=0, vmax=vmax, aspect="equal")
        ax.set_title(title, color=FG, fontsize=12, fontweight="bold", pad=14)
        ax.set_xticks([0, 1], ["Pred. accept", "Pred. reject"], color=MUTED, fontsize=9)
        ax.set_yticks([0, 1], ["Actual accept", "Actual reject"], color=MUTED, fontsize=9)
        ax.tick_params(top=True, bottom=False, labeltop=True, labelbottom=False, pad=8)

        for row in range(2):
            for col in range(2):
                rgba = image.cmap(image.norm(matrix[row, col]))
                text_color = "#ffffff" if _luminance(rgba) < 0.52 else FG
                ax.text(col, row - 0.06, str(matrix[row, col]), ha="center", va="center", color=text_color, fontsize=20, fontweight="bold")
                ax.text(col, row + 0.24, tags[row, col], ha="center", va="center", color=text_color, fontsize=8.5, fontweight="bold", alpha=0.8)

        ax.set_xticks(np.arange(-0.5, 2, 1), minor=True)
        ax.set_yticks(np.arange(-0.5, 2, 1), minor=True)
        ax.grid(which="minor", color=BG, linewidth=4)
        ax.tick_params(which="minor", bottom=False, left=False)

    fig.text(0.06, 0.965, "Calibration changed the error pattern, not only accuracy", fontsize=17, color=FG, fontweight="bold", ha="left", va="top")
    fig.text(0.06, 0.92, "Decision counts pooled across 35 resolved ICLR 2024 forums · shared 0–16 color scale", fontsize=10, color=MUTED, ha="left", va="top")
    fig.text(0.06, 0.04, "False accepts fell from 9 to 2; false rejects increased from 4 to 6.", fontsize=9.2, color=FG, ha="left")
    fig.text(0.06, 0.015, "Source: docs/evaluation.md · Abstract-only pilots · Counts are descriptive and do not establish cross-venue performance.", fontsize=7.8, color=MUTED, ha="left")
    fig.subplots_adjust(left=0.13, right=0.96, top=0.76, bottom=0.18, wspace=0.38)

    save_figure(fig, "decision-confusion-matrices.png")


if __name__ == "__main__":
    calibration_impact()
    decision_confusion_matrices()
