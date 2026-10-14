export const HIDE_STYLE =
    '<style id="seo-content-hide">#seo-content{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}img{color:transparent;font-size:0}</style>';

export const CRAWLER_STYLE =
    "position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0";

export function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

function upsertTitle(html, title) {
    const tag = `<title>${escapeHtml(title)}</title>`;
    if (/<title>[\s\S]*?<\/title>/i.test(html)) {
        return html.replace(/<title>[\s\S]*?<\/title>/i, tag);
    }
    return html.replace("</head>", `    ${tag}\n</head>`);
}

function stripMeta(html, attribute, key) {
    const pattern = new RegExp(
        `<meta\\b[^>]*\\b${attribute}\\s*=\\s*["']${key}["'][^>]*>`,
        "gi",
    );
    return html.replace(pattern, "");
}

function upsertMeta(html, attribute, key, content) {
    const tag = `<meta ${attribute}="${key}" content="${escapeHtml(content)}" />`;
    const next = stripMeta(html, attribute, key);
    return next.replace("</head>", `    ${tag}\n</head>`);
}

function upsertCanonical(html, href) {
    const tag = `<link rel="canonical" href="${escapeHtml(href)}" />`;
    const next = html.replace(/<link\b[^>]*\brel\s*=\s*["']canonical["'][^>]*>/gi, "");
    return next.replace("</head>", `    ${tag}\n</head>`);
}

export function ensureHideStyle(html) {
    if (!html.includes('id="seo-content-hide"') || !html.includes("clip:rect(0,0,0,0)") || !html.includes("img{color:transparent")) {
        const without = html.replace(/<style\b[^>]*\bid="seo-content-hide"[^>]*>[\s\S]*?<\/style>/i, "");
        return without.replace(/<head[^>]*>/i, (match) => `${match}\n    ${HIDE_STYLE}`);
    }
    return html;
}

export function crawlerBlock(route) {
    return `<main id="seo-content" aria-hidden="true" style="${CRAWLER_STYLE}"><h1>${escapeHtml(route.heading)}</h1><p>${escapeHtml(route.summary)}</p></main>`;
}

export function applyRoute(html, route, { crawler = true, robots } = {}) {
    let next = ensureHideStyle(html);
    next = upsertTitle(next, route.title);
    next = upsertMeta(next, "name", "description", route.description);
    next = upsertMeta(next, "name", "keywords", route.keywords);
    next = upsertCanonical(next, route.canonical);
    next = upsertMeta(next, "property", "og:title", route.title);
    next = upsertMeta(next, "property", "og:description", route.description);
    next = upsertMeta(next, "property", "og:url", route.canonical);
    next = upsertMeta(next, "property", "og:type", "website");
    next = upsertMeta(next, "name", "twitter:card", "summary");
    next = upsertMeta(next, "name", "twitter:title", route.title);
    next = upsertMeta(next, "name", "twitter:description", route.description);
    if (robots) {
        next = upsertMeta(next, "name", "robots", robots);
    }

    if (!crawler) {
        return next;
    }

    const block = crawlerBlock(route);
    if (/<main\s+id="seo-content"[\s\S]*?<\/main>/i.test(next)) {
        return next.replace(/<main\s+id="seo-content"[\s\S]*?<\/main>/i, block);
    }

    if (/<div id="root">\s*<\/div>/i.test(next)) {
        return next.replace(/<div id="root">\s*<\/div>/i, (match) => `${match}\n    ${block}`);
    }

    return next.replace("</body>", `    ${block}\n</body>`);
}
