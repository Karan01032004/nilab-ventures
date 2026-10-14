using System.Text.Json;

namespace nilab_ventures.Server.Seo;

public sealed class SeoRoute
{
    public string Path { get; set; } = "/";
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public string Keywords { get; set; } = "";
    public string Canonical { get; set; } = "";
    public bool Prerender { get; set; }
    public bool Sitemap { get; set; }
    public string Heading { get; set; } = "";
    public string Summary { get; set; } = "";
}

public sealed class SeoRouteCatalog
{
    public string Origin { get; init; } = "https://www.nilabventures.com";
    public IReadOnlyList<SeoRoute> Routes { get; init; } = [];
    public SeoRoute NotFound { get; init; } = new();

    public SeoRoute? Match(string? path)
    {
        var normalized = Normalize(path);
        return Routes.FirstOrDefault(route => Normalize(route.Path) == normalized);
    }

    public static string Normalize(string? path)
    {
        if (string.IsNullOrWhiteSpace(path))
        {
            return "/";
        }

        var value = path.Split('?', 2)[0].Trim();
        if (!value.StartsWith('/'))
        {
            value = "/" + value;
        }

        if (value.Length > 1)
        {
            value = value.TrimEnd('/');
        }

        return value.ToLowerInvariant();
    }

    public static SeoRouteCatalog Load(IWebHostEnvironment env)
    {
        var file = FindCatalog(env);
        if (file is null)
        {
            return new SeoRouteCatalog();
        }

        var parsed = JsonSerializer.Deserialize<SeoCatalogFile>(File.ReadAllText(file), new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        });

        if (parsed is null)
        {
            return new SeoRouteCatalog();
        }

        var origin = string.IsNullOrWhiteSpace(parsed.Origin)
            ? "https://www.nilabventures.com"
            : parsed.Origin.TrimEnd('/');

        return new SeoRouteCatalog
        {
            Origin = origin,
            Routes = parsed.Routes ?? [],
            NotFound = parsed.NotFound ?? new SeoRoute()
        };
    }

    private static string? FindCatalog(IWebHostEnvironment env)
    {
        foreach (var directory in SpaWebRoot.Candidates(env))
        {
            var candidate = Path.Combine(directory, "seo-routes.json");
            if (File.Exists(candidate))
            {
                return candidate;
            }
        }

        var sourceCatalog = Path.GetFullPath(Path.Combine(env.ContentRootPath, "..", "nilab-ventures.client", "public", "seo-routes.json"));
        return File.Exists(sourceCatalog) ? sourceCatalog : null;
    }

    private sealed class SeoCatalogFile
    {
        public string Origin { get; set; } = "";
        public List<SeoRoute>? Routes { get; set; }
        public SeoRoute? NotFound { get; set; }
    }
}
