import { createServer } from "node:http";
import { readFileSync, existsSync, statSync } from "node:fs";
import { dirname, extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { notFoundRoute, publicRoutes, SITE_ORIGIN } from "../src/seo/publicRoutes.js";
import { applyRoute } from "./seo-html.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "dist");
const port = Number(process.env.SEO_PREVIEW_PORT || 4177);
const types = {
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".xml": "application/xml; charset=utf-8",
    ".txt": "text/plain; charset=utf-8",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".webp": "image/webp",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".ico": "image/x-icon",
    ".woff2": "font/woff2",
    ".webmanifest": "application/manifest+json",
};

const shell = readFileSync(join(root, "spa-shell.html"), "utf8");

function send(response, status, body, type = "text/html; charset=utf-8") {
    response.writeHead(status, { "Content-Type": type, "Cache-Control": "no-cache" });
    response.end(body);
}

function fileFor(urlPath) {
    const relative = decodeURIComponent(urlPath.split("?")[0]);
    const target = normalize(join(root, relative));
    if (!target.startsWith(normalize(root))) return null;
    return target;
}

const server = createServer((request, response) => {
    const url = new URL(request.url || "/", "http://localhost");
    let pathname = url.pathname;

    if (pathname.length > 1 && pathname.endsWith("/")) {
        response.writeHead(301, { Location: pathname.replace(/\/+$/, "") + url.search });
        response.end();
        return;
    }

    if (pathname.toLowerCase() === "/spa-shell.html") {
        const html = applyRoute(shell, { ...notFoundRoute, canonical: `${SITE_ORIGIN}/spa-shell.html` }, { robots: "noindex, nofollow" });
        send(response, 404, html);
        return;
    }

    const asset = fileFor(pathname);
    if (asset && existsSync(asset) && statSync(asset).isFile() && extname(asset)) {
        send(response, 200, readFileSync(asset), types[extname(asset).toLowerCase()] || "application/octet-stream");
        return;
    }

    const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, "").toLowerCase() : "/";
    if (normalized === "/poweradmin" || normalized.startsWith("/poweradmin/")) {
        send(response, 200, shell);
        return;
    }

    const route = publicRoutes.find((entry) => entry.path.toLowerCase() === normalized);
    if (!route) {
        const html = applyRoute(shell, { ...notFoundRoute, canonical: `${SITE_ORIGIN}${normalized}` }, { robots: "noindex, nofollow" });
        send(response, 404, html);
        return;
    }

    const pagePath = route.path === "/" ? join(root, "index.html") : join(root, route.path.replace(/^\//, ""), "index.html");
    const page = existsSync(pagePath) ? readFileSync(pagePath, "utf8") : applyRoute(shell, route);
    send(response, 200, page);
});

server.listen(port, "127.0.0.1", () => {
    console.log(`SEO preview http://127.0.0.1:${port}`);
});
