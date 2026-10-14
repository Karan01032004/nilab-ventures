namespace nilab_ventures.Server.Seo;

public static class SeoHtmlFallback
{
    public static Task Invoke(HttpContext context)
    {
        var env = context.RequestServices.GetRequiredService<IWebHostEnvironment>();
        var catalog = context.RequestServices.GetRequiredService<SeoRouteCatalog>();
        return WriteAsync(context, env, catalog);
    }

    public static Task WriteNotFound(HttpContext context, SeoRouteCatalog catalog)
    {
        var env = context.RequestServices.GetRequiredService<IWebHostEnvironment>();
        return WriteNotFound(context, env, catalog);
    }

    private static async Task WriteAsync(HttpContext context, IWebHostEnvironment env, SeoRouteCatalog catalog)
    {
        var rawPath = context.Request.Path.Value ?? "/";
        if (rawPath.Length > 1 && rawPath.EndsWith('/'))
        {
            context.Response.Redirect(rawPath.TrimEnd('/') + context.Request.QueryString, permanent: true);
            return;
        }

        var extension = Path.GetExtension(rawPath);
        if (!string.IsNullOrEmpty(extension) && !extension.Equals(".html", StringComparison.OrdinalIgnoreCase))
        {
            context.Response.StatusCode = StatusCodes.Status404NotFound;
            return;
        }

        var shell = ReadShell(env);
        if (string.IsNullOrEmpty(shell))
        {
            context.Response.StatusCode = StatusCodes.Status503ServiceUnavailable;
            context.Response.ContentType = "text/plain; charset=utf-8";
            await context.Response.WriteAsync("SPA shell is not deployed.");
            return;
        }

        var normalized = SeoRouteCatalog.Normalize(rawPath);
        if (IsAdmin(normalized))
        {
            context.Response.StatusCode = StatusCodes.Status200OK;
            await WriteHtml(context, shell);
            return;
        }

        var route = catalog.Match(normalized);
        if (route is null)
        {
            context.Response.StatusCode = StatusCodes.Status404NotFound;
            await WriteHtml(context, NotFoundHtml(shell, catalog, normalized));
            return;
        }

        var prerendered = ReadPrerender(env, route);
        var html = PageMetaInjector.Apply(prerendered ?? shell, route, crawler: true);
        context.Response.StatusCode = StatusCodes.Status200OK;
        await WriteHtml(context, html);
    }

    private static Task WriteNotFound(HttpContext context, IWebHostEnvironment env, SeoRouteCatalog catalog)
    {
        var shell = ReadShell(env);
        var normalized = SeoRouteCatalog.Normalize(context.Request.Path.Value);
        context.Response.StatusCode = StatusCodes.Status404NotFound;
        return WriteHtml(context, string.IsNullOrEmpty(shell)
            ? "SPA shell is not deployed."
            : NotFoundHtml(shell, catalog, normalized));
    }

    private static string NotFoundHtml(string shell, SeoRouteCatalog catalog, string normalized)
    {
        var source = catalog.NotFound;
        return PageMetaInjector.Apply(shell, new SeoRoute
        {
            Title = source.Title,
            Description = source.Description,
            Keywords = source.Keywords,
            Heading = source.Heading,
            Summary = source.Summary,
            Canonical = catalog.Origin.TrimEnd('/') + normalized
        }, crawler: true, robots: "noindex, nofollow");
    }

    private static bool IsAdmin(string path)
    {
        return path.Equals("/poweradmin", StringComparison.Ordinal)
            || path.StartsWith("/poweradmin/", StringComparison.Ordinal);
    }

    private static string ReadShell(IWebHostEnvironment env)
    {
        var root = SpaWebRoot.Resolve(env);
        if (root is null)
        {
            return "";
        }

        var shell = Path.Combine(root, "spa-shell.html");
        return File.Exists(shell) ? File.ReadAllText(shell) : "";
    }

    private static string? ReadPrerender(IWebHostEnvironment env, SeoRoute route)
    {
        var root = SpaWebRoot.Resolve(env);
        if (root is null)
        {
            return null;
        }

        var relative = route.Path == "/"
            ? "index.html"
            : route.Path.Trim('/') + "/index.html";
        var full = Path.Combine(root, relative.Replace('/', Path.DirectorySeparatorChar));
        return File.Exists(full) ? File.ReadAllText(full) : null;
    }

    private static Task WriteHtml(HttpContext context, string html)
    {
        if (!context.Response.ContentType?.Contains("text/html", StringComparison.OrdinalIgnoreCase) ?? true)
        {
            context.Response.ContentType = "text/html; charset=utf-8";
        }

        return context.Response.WriteAsync(html);
    }
}
