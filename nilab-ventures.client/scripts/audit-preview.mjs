const origin = process.env.SEO_PREVIEW_ORIGIN || "http://127.0.0.1:4177";
const paths = ["/", "/sitemap", "/funding-application", "/poweradmin/dashboard", "/this-page-is-missing", "/sitemap/", "/spa-shell.html", "/sitemap.xml"];

for (const path of paths) {
    const response = await fetch(origin + path, { redirect: "manual" });
    const html = await response.text();
    const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "";
    const description = html.match(/name="description" content="([\s\S]*?)"/i)?.[1] ?? "";
    const canonical = html.match(/rel="canonical" href="([\s\S]*?)"/i)?.[1] ?? "";
    const keywords = html.match(/name="keywords" content="([\s\S]*?)"/i)?.[1] ?? "";
    const text = html
        .replace(/<script[\s\S]*?<\/script>/gi, "")
        .replace(/<style[\s\S]*?<\/style>/gi, "")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    console.log(JSON.stringify({
        path,
        status: response.status,
        location: response.headers.get("location") ?? "",
        title,
        description,
        keywords,
        canonical,
        hide: html.includes('id="seo-content-hide"') && html.includes("clip:rect(0,0,0,0)"),
        crawler: html.includes('id="seo-content"'),
        textLength: text.length,
    }));
}
