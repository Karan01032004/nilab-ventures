import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { publicRoutes } from "../src/seo/publicRoutes.js";
import { applyRoute } from "./seo-html.mjs";

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, "..", "dist");
const shellPath = join(dist, "index.html");
const shell = readFileSync(shellPath, "utf8");

if (!/<div id="root">\s*<\/div>/.test(shell)) {
    throw new Error("Built index.html must keep an empty #root before prerender.");
}
if (shell.includes('id="seo-content"')) {
    throw new Error("Built index.html must not contain #seo-content. The shell stays empty.");
}

writeFileSync(join(dist, "spa-shell.html"), shell);

for (const route of publicRoutes.filter((entry) => entry.prerender)) {
    const html = applyRoute(shell, route);
    const target = route.path === "/"
        ? join(dist, "index.html")
        : join(dist, route.path.replace(/^\//, ""), "index.html");
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, html);
}
