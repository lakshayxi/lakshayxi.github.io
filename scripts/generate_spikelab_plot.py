"""Generate the SpikeLab regression-fixture figure used in the portfolio.

Primary sources:
- https://github.com/lakshayxi/spikelab/blob/main/docs/VALIDATION.md
- https://github.com/lakshayxi/spikelab/blob/main/processing.py

Chart contract:
Show the complete deterministic filtered-spike fixture and a close view of the
only suppressed crossing. The figure demonstrates implementation behaviour;
it must not imply biological or clinical validation.
"""

from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np
from scipy.signal import butter, filtfilt


OUTPUT_DIR = Path(__file__).resolve().parents[1] / "public" / "spikelab"

BG = "#f5f4f0"
FG = "#1a1a1a"
MUTED = "#716f6a"
GRID = "#d8d5cd"
ACCENT = "#315f70"


def style_axes(ax: plt.Axes) -> None:
    ax.set_facecolor(BG)
    for spine in ax.spines.values():
        spine.set_visible(False)
    ax.tick_params(length=0, colors=MUTED, labelsize=8.5)
    ax.grid(axis="y", color=GRID, linewidth=0.65)
    ax.set_axisbelow(True)


def build_fixture() -> tuple[np.ndarray, np.ndarray, np.ndarray, float, np.ndarray, np.ndarray]:
    fs = 20_000
    rng = np.random.default_rng(2026)
    signal = rng.normal(0, 5, 4_000)
    injected = np.array([10, 40, 50, 1_000, 3_950, 3_980])
    signal[injected] = -200

    b, a = butter(4, [300 / (fs / 2), 3_000 / (fs / 2)], btype="band")
    filtered = filtfilt(b, a, signal)
    noise_floor = np.median(np.abs(filtered)) / 0.6745
    threshold = -5 * noise_floor
    crossings = np.flatnonzero((filtered[1:] < threshold) & (filtered[:-1] >= threshold)) + 1

    refractory_samples = int(0.001 * fs)
    retained: list[int] = []
    last = -refractory_samples - 1
    for crossing in crossings:
        if crossing - last > refractory_samples:
            retained.append(int(crossing))
            last = int(crossing)

    retained_array = np.array(retained, dtype=int)
    suppressed = np.setdiff1d(crossings, retained_array)
    time_ms = np.arange(len(signal)) / fs * 1_000
    return time_ms, filtered, crossings, threshold, retained_array, suppressed


def regression_fixture() -> None:
    time_ms, filtered, crossings, threshold, retained, suppressed = build_fixture()

    if len(crossings) != 6 or len(retained) != 5 or suppressed.tolist() != [48]:
        raise RuntimeError("SpikeLab fixture no longer matches the documented six-crossing, five-detection result.")

    fig, axes = plt.subplots(2, 1, figsize=(10.2, 6.45), gridspec_kw={"height_ratios": [1.0, 1.15]})
    fig.patch.set_facecolor(BG)

    for ax in axes:
        style_axes(ax)
        ax.plot(time_ms, filtered, color=FG, linewidth=0.8, alpha=0.82)
        ax.axhline(threshold, color=MUTED, linewidth=1.0, linestyle=(0, (4, 3)))
        ax.scatter(time_ms[retained], filtered[retained], s=36, color=ACCENT, edgecolor=BG, linewidth=1.0, zorder=4)
        ax.scatter(time_ms[suppressed], filtered[suppressed], s=48, facecolor=BG, edgecolor=FG, marker="X", linewidth=1.3, zorder=5)
        ax.set_ylabel("Filtered voltage (µV)", color=MUTED, fontsize=9)

    axes[0].set_title("Complete 200 ms fixture", loc="left", color=FG, fontsize=10.5, fontweight="bold", pad=9)
    axes[0].set_xlim(time_ms[0], time_ms[-1])
    axes[0].set_xlabel("Time (ms)", color=MUTED, fontsize=9)

    axes[1].set_title("First 4 ms: the refractory rule removes one crossing", loc="left", color=FG, fontsize=10.5, fontweight="bold", pad=9)
    axes[1].set_xlim(0, 4)
    axes[1].set_xlabel("Time (ms)", color=MUTED, fontsize=9)
    axes[1].annotate(
        "retained",
        xy=(time_ms[retained[1]], filtered[retained[1]]),
        xytext=(1.25, threshold - 18),
        color=ACCENT,
        fontsize=8.7,
        fontweight="bold",
        arrowprops={"arrowstyle": "-", "color": ACCENT, "linewidth": 1.0},
    )
    axes[1].annotate(
        "suppressed: 0.5 ms after the previous crossing",
        xy=(time_ms[suppressed[0]], filtered[suppressed[0]]),
        xytext=(2.75, threshold - 40),
        color=FG,
        fontsize=8.7,
        ha="center",
        arrowprops={"arrowstyle": "-", "color": FG, "linewidth": 1.0},
    )
    axes[1].text(3.98, threshold + 2.5, "5× noise threshold", color=MUTED, fontsize=8, ha="right", va="bottom")

    fig.text(0.07, 0.975, "The refractory rule removes one of six threshold crossings", fontsize=17, color=FG, fontweight="bold", ha="left", va="top")
    fig.text(0.07, 0.938, "Deterministic 20 kHz fixture · 300–3000 Hz fourth-order bandpass · fixed 1 ms refractory period", fontsize=10, color=MUTED, ha="left", va="top")
    fig.text(0.07, 0.035, "Five detections remain, matching the recorded regression expectation.", fontsize=9.2, color=FG, ha="left")
    fig.text(0.07, 0.012, "Source: docs/VALIDATION.md and processing.py · Synthetic implementation check, not biological validation.", fontsize=7.8, color=MUTED, ha="left")
    fig.subplots_adjust(left=0.12, right=0.965, top=0.84, bottom=0.13, hspace=0.5)

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    fig.savefig(
        OUTPUT_DIR / "filtered-spike-regression.png",
        dpi=180,
        bbox_inches="tight",
        facecolor=BG,
        pad_inches=0.34,
    )
    plt.close(fig)


if __name__ == "__main__":
    regression_fixture()
