using System.Net;
using System.Text.RegularExpressions;

namespace nilab_ventures.Server.Seo;

public static class PageMetaInjector
{
    public const string HideStyle = "<style id=\"seo-content-hide\">#seo-content{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}img{color:transparent;font-size:0}</style>";
    public const string CrawlerStyle = "position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0";

    public static string Apply(string html, SeoRoute route, bool crawler, string? robots = null)
    {
        var next = EnsureHideStyle(html);
        next = UpsertTitle(next, route.Title);
        next = UpsertMeta(next, "name", "description", route.Description);
        next = UpsertMeta(next, "name", "keywords", route.Keywords);
        next = UpsertCanonical(next, route.Canonical);
        next = UpsertMeta(next, "property", "og:title", route.Title);
        next = UpsertMeta(next, "property", "og:description", route.Description);
        next = UpsertMeta(next, "property", "og:url", route.Canonical);
        next = UpsertMeta(next, "property", "og:type", "website");
        next = UpsertMeta(next, "name", "twitter:card", "summary");
        next = UpsertMeta(next, "name", "twitter:title", route.Title);
        next = UpsertMeta(next, "name", "twitter:description", route.Description);

        if (!string.IsNullOrEmpty(robots))
        {
            next = UpsertMeta(next, "name", "robots", robots);
        }

        return crawler ? UpsertCrawler(next, route) : next;
    }

    private static string EnsureHideStyle(string html)
    {
        var complete = html.Contains("id=\"seo-content-hide\"", StringComparison.Ordinal)
            && html.Contains("clip:rect(0,0,0,0)", StringComparison.Ordinal)
            && html.Contains("img{color:transparent", StringComparison.Ordinal);

        if (complete)
        {
            return html;
        }

        var without = Regex.Replace(
            html,
            "<style\\b[^>]*\\bid=\"seo-content-hide\"[^>]*>[\\s\\S]*?</style>",
            "",
            RegexOptions.IgnoreCase);

        return Regex.Replace(without, "<head[^>]*>", match => match.Value + "\n    " + HideStyle, RegexOptions.IgnoreCase);
    }

    private static string UpsertTitle(string html, string title)
    {
        var tag = "<title>" + WebUtility.HtmlEncode(title) + "</title>";
        if (Regex.IsMatch(html, "<title>[\\s\\S]*?</title>", RegexOptions.IgnoreCase))
        {
            return Regex.Replace(html, "<title>[\\s\\S]*?</title>", tag, RegexOptions.IgnoreCase);
        }

        return InsertBeforeHeadEnd(html, tag);
    }

    private static string UpsertMeta(string html, string attribute, string key, string content)
    {
        var tag = $"<meta {attribute}=\"{key}\" content=\"{WebUtility.HtmlEncode(content)}\" />";
        var stripped = Regex.Replace(
            html,
            $"<meta\\b[^>]*\\b{attribute}\\s*=\\s*[\"']{Regex.Escape(key)}[\"'][^>]*>",
            "",
            RegexOptions.IgnoreCase);
        return InsertBeforeHeadEnd(stripped, tag);
    }

    private static string UpsertCanonical(string html, string href)
    {
        var tag = $"<link rel=\"canonical\" href=\"{WebUtility.HtmlEncode(href)}\" />";
        var stripped = Regex.Replace(
            html,
            "<link\\b[^>]*\\brel\\s*=\\s*[\"']canonical[\"'][^>]*>",
            "",
            RegexOptions.IgnoreCase);
        return InsertBeforeHeadEnd(stripped, tag);
    }

    private static string UpsertCrawler(string html, SeoRoute route)
    {
        var block = $"<main id=\"seo-content\" aria-hidden=\"true\" style=\"{CrawlerStyle}\"><h1>{WebUtility.HtmlEncode(route.Heading)}</h1><p>{WebUtility.HtmlEncode(route.Summary)}</p></main>";
        if (Regex.IsMatch(html, "<main\\s+id=\"seo-content\"[\\s\\S]*?</main>", RegexOptions.IgnoreCase))
        {
            return Regex.Replace(html, "<main\\s+id=\"seo-content\"[\\s\\S]*?</main>", block, RegexOptions.IgnoreCase);
        }

        var root = Regex.Match(html, "<div id=\"root\">\\s*</div>", RegexOptions.IgnoreCase);
        if (root.Success)
        {
            return html.Insert(root.Index + root.Length, "\n    " + block);
        }

        return Regex.Replace(html, "</body>", "    " + block + "\n</body>", RegexOptions.IgnoreCase);
    }

    private static string InsertBeforeHeadEnd(string html, string tag)
    {
        return Regex.Replace(html, "</head>", "    " + tag + "\n</head>", RegexOptions.IgnoreCase);
    }
}
