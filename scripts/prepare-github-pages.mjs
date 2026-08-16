import { access, cp, mkdir, readdir, rename, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const clientDir = path.join(projectRoot, "dist", "client");
const pagesDir = path.join(projectRoot, "dist", "pages");
const prefixedAssetsDir = path.join(clientDir, "webpage");
const ignoredEntries = new Set([
  ".DS_Store",
  ".assetsignore",
  ".vite",
  "_headers",
  "webpage",
]);

async function exists(target) {
  try {
    await access(target);
    return true;
  } catch {
    return false;
  }
}

await rm(pagesDir, { recursive: true, force: true });
await mkdir(pagesDir, { recursive: true });

for (const entry of await readdir(clientDir, { withFileTypes: true })) {
  if (ignoredEntries.has(entry.name)) continue;
  await cp(path.join(clientDir, entry.name), path.join(pagesDir, entry.name), {
    recursive: true,
  });
}

if (await exists(path.join(prefixedAssetsDir, "_next"))) {
  await cp(path.join(prefixedAssetsDir, "_next"), path.join(pagesDir, "_next"), {
    recursive: true,
  });
}

for (const route of [
  "experience",
  "oss",
  "projects",
  "projects/glimpse",
  "projects/localmd",
  "projects/paperscope",
  "projects/sage",
  "projects/spikelab",
]) {
  const source = path.join(pagesDir, `${route}.html`);
  const destinationDir = path.join(pagesDir, route);
  await mkdir(destinationDir, { recursive: true });
  await rename(source, path.join(destinationDir, "index.html"));
}

await writeFile(path.join(pagesDir, ".nojekyll"), "");
