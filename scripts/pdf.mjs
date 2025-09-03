import { createRequire } from "node:module";
import path from "node:path";

import fs from "node:fs/promises";

const require = createRequire(import.meta.url);

const pdfjsDistPath = path.dirname(require.resolve("pdfjs-dist/package.json"));
const pdfWorkerPath = path.join(pdfjsDistPath, "build", "pdf.worker.mjs");
const cMapsDir = path.join(pdfjsDistPath, "cmaps");

async function main() {
    await fs.cp(pdfWorkerPath, "./dist/pdf.worker.mjs", { recursive: true });
    console.log("Copied pdf.worker.mjs to ./dist/pdf.worker.mjs successfully.");

    await fs.cp(cMapsDir, "dist/cmaps/", { recursive: true });
    console.log("Copied cmaps to ./dist/cmaps/ successfully.");
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
