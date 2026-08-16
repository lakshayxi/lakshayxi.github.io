import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const artifactRoot = new URL("../dist/pages/", import.meta.url);

const routes = [
  { file: "index.html", expected: /Lakshay Saini/ },
  { file: "experience/index.html", expected: /Experience/ },
  { file: "oss/index.html", expected: /Open source/ },
  { file: "projects/index.html", expected: /Projects &amp; Reports/ },
  { file: "projects/localmd/index.html", expected: /LocalMD/ },
  { file: "projects/glimpse/index.html", expected: /Glimpse/ },
  { file: "projects/paperscope/index.html", expected: /PaperScope/ },
  { file: "projects/sage/index.html", expected: /Sage/ },
  { file: "projects/spikelab/index.html", expected: /SpikeLab/ },
];

for (const route of routes) {
  test(`exports ${route.file}`, async () => {
    const html = await readFile(new URL(route.file, artifactRoot), "utf8");
    assert.match(html, route.expected);
    assert.match(html, /\/_next\/static\//);
    assert.doesNotMatch(html, /\/webpage\/|chatgpt\.site/);
  });
}

test("exports production metadata and social image", async () => {
  const html = await readFile(new URL("index.html", artifactRoot), "utf8");
  assert.match(html, /https:\/\/lakshaysaini\.me\//);
  assert.match(html, /https:\/\/lakshaysaini\.me\/og\.png/);
  await access(new URL("og.png", artifactRoot));
});

test("keeps GitHub Pages assets and fallback files", async () => {
  const sitemap = await readFile(new URL("sitemap.xml", artifactRoot), "utf8");
  assert.match(sitemap, /https:\/\/lakshaysaini\.me\/experience\//);

  await Promise.all([
    access(new URL(".nojekyll", artifactRoot)),
    access(new URL("404.html", artifactRoot)),
    access(new URL("robots.txt", artifactRoot)),
    access(new URL("sitemap.xml", artifactRoot)),
    access(new URL("CNAME", artifactRoot)),
    access(new URL("glimpse/fusion-head-ranking.png", artifactRoot)),
    access(new URL("paperscope/calibration-impact.png", artifactRoot)),
    access(new URL("spikelab/filtered-spike-regression.png", artifactRoot)),
  ]);
});
