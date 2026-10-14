namespace nilab_ventures.Server.Seo;

public static class SpaWebRoot
{
    public static string? Resolve(IWebHostEnvironment env)
    {
        foreach (var candidate in Candidates(env))
        {
            if (File.Exists(Path.Combine(candidate, "spa-shell.html")))
            {
                return candidate;
            }
        }

        return null;
    }

    public static IEnumerable<string> Candidates(IWebHostEnvironment env)
    {
        if (!string.IsNullOrWhiteSpace(env.WebRootPath))
        {
            yield return env.WebRootPath;
        }

        yield return Path.Combine(env.ContentRootPath, "wwwroot");
        yield return Path.Combine(AppContext.BaseDirectory, "wwwroot");
        yield return Path.GetFullPath(Path.Combine(env.ContentRootPath, "..", "nilab-ventures.client", "dist"));
    }
}
