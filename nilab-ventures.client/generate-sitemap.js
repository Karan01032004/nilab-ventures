import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { notFoundRoute, publicRoutes, SITE_ORIGIN } from "./src/seo/publicRoutes.js";

const root = dirname(fileURLToPath(import.meta.url));
const publicDir = join(root, "public");
mkdirSync(publicDir, { recursive: true });

const catalog = {
    origin: SITE_ORIGIN,
    routes: publicRoutes,
    notFound: notFoundRoute,
};

writeFileSync(join(publicDir, "seo-routes.json"), `${JSON.stringify(catalog, null, 2)}\n`);

const urls = publicRoutes
    .filter((route) => route.sitemap)
    .map((route) => `  <url><loc>${route.canonical}</loc></url>`)
    .join("\n");

writeFileSync(
    join(publicDir, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);

writeFileSync(
    join(publicDir, "robots.txt"),
    `User-agent: *\nAllow: /\nDisallow: /poweradmin\n\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`,
);
