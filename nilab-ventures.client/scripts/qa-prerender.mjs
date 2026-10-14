import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import { notFoundRoute, publicRoutes } from "../src/seo/publicRoutes.js";
import { applyRoute } from "./seo-html.mjs";

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, "..", "dist");
const failures = [];

function fail(message) {
    failures.push(message);
}

function read(relativePath) {
    return readFileSync(join(dist, relativePath), "utf8");
}

function titleOf(html) {
    return html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? "";
}

function metaContent(html, attribute, key) {
    const pattern = new RegExp(
        `<meta\\b[^>]*\\b${attribute}\\s*=\\s*["']${key}["'][^>]*>`,
        "i",
    );
    const tag = html.match(pattern)?.[0] ?? "";
    return tag.match(/\bcontent\s*=\s*["']([\s\S]*?)["']/i)?.[1] ?? "";
}

function canonicalOf(html) {
    const tag = html.match(/<link\b[^>]*\brel\s*=\s*["']canonical["'][^>]*>/i)?.[0] ?? "";
    return tag.match(/\bhref\s*=\s*["']([\s\S]*?)["']/i)?.[1] ?? "";
}

const shell = read("spa-shell.html");
const home = publicRoutes.find((route) => route.path === "/");

if (!shell.includes('id="seo-content-hide"')) fail("spa-shell.html is missing id=\"seo-content-hide\"");
if (!shell.includes("clip:rect(0,0,0,0)")) fail("spa-shell.html is missing clip:rect(0,0,0,0)");
if (!shell.includes("img{color:transparent")) fail("spa-shell.html is missing the image alt clip");
if (shell.includes('id="seo-content"')) fail("spa-shell.html must not contain #seo-content");
if (!/<div id="root">\s*<\/div>/.test(shell)) fail("spa-shell.html #root must stay empty");
if (home && titleOf(shell) === home.title) fail("spa-shell.html must not carry the homepage title");

for (const route of publicRoutes.filter((entry) => entry.prerender)) {
    const relativePath = route.path === "/" ? "index.html" : `${route.path.replace(/^\//, "")}/index.html`;
    let html = "";
    try {
        html = read(relativePath);
    } catch {
        fail(`${route.path} is missing ${relativePath}`);
        continue;
    }

    if (!html.includes('id="seo-content"')) fail(`${route.path} is missing #seo-content`);
    if (!html.includes('id="seo-content-hide"')) fail(`${route.path} is missing id="seo-content-hide"`);
    if (!html.includes("clip:rect(0,0,0,0)")) fail(`${route.path} is missing clip:rect(0,0,0,0)`);
    if (!html.includes('aria-hidden="true"')) fail(`${route.path} crawler block must be aria-hidden`);
    if (!html.includes(route.heading)) fail(`${route.path} is missing its crawler heading`);
    if (!html.includes(route.summary)) fail(`${route.path} is missing its crawler summary`);
    if (titleOf(html) !== route.title) fail(`${route.path} title is "${titleOf(html)}"`);
    if (metaContent(html, "name", "description") !== route.description) fail(`${route.path} description does not match the catalog`);
    if (metaContent(html, "name", "keywords") !== route.keywords) fail(`${route.path} keywords do not match the catalog`);
    if (canonicalOf(html) !== route.canonical) fail(`${route.path} canonical is "${canonicalOf(html)}"`);
    if (route.path !== "/" && titleOf(html) === home.title) fail(`${route.path} reuses the homepage title`);
    if (route.path !== "/" && html.includes(`<h1>${home.heading}</h1>`)) fail(`${route.path} reuses the homepage crawler heading`);
}

const notFoundHtml = applyRoute(shell, { ...notFoundRoute, canonical: "https://www.nilabventures.com/missing-page" }, { robots: "noindex, nofollow" });
if (!notFoundHtml.includes('id="seo-content-hide"') || !notFoundHtml.includes("clip:rect(0,0,0,0)")) {
    fail("not-found injection is missing the hide rule");
}
if (!notFoundHtml.includes(notFoundRoute.heading) || !notFoundHtml.includes('id="seo-content"')) {
    fail("not-found injection is missing crawler text");
}
if (titleOf(notFoundHtml) === home.title) fail("not-found injection reuses the homepage title");

if (failures.length > 0) {
    console.error(failures.map((item) => `- ${item}`).join("\n"));
    process.exit(1);
}

console.log(`Prerender QA passed for ${publicRoutes.filter((route) => route.prerender).length} public pages.`);
