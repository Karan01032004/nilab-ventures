using nilab_ventures.Server.Data;
using nilab_ventures.Server.Email;
using nilab_ventures.Server.Seo;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options => {
    options.AddPolicy("AllowReact", policy => {
        policy.WithOrigins("https://localhost:7047", "https://www.nilabventures.com/")
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(
        connectionString,
        ServerVersion.AutoDetect(connectionString)
    )
);
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});
builder.Services.AddSingleton(sp => SeoRouteCatalog.Load(sp.GetRequiredService<IWebHostEnvironment>()));
builder.Services.AddSingleton<ErrorEmailSender>();

 
var app = builder.Build();
app.UseMiddleware<ExceptionEmailMiddleware>();
app.UseCors("AllowAll");
if (!app.Environment.IsDevelopment())
{
    app.Use(async (context, next) =>
    {
        var path = context.Request.Path.Value ?? "/";
        var isDocument = HttpMethods.IsGet(context.Request.Method) || HttpMethods.IsHead(context.Request.Method);
        if (isDocument && path.Length > 1 && path.EndsWith('/'))
        {
            context.Response.Redirect(path.TrimEnd('/') + context.Request.QueryString, permanent: true);
            return;
        }

        if (isDocument && path.Equals("/spa-shell.html", StringComparison.OrdinalIgnoreCase))
        {
            context.Response.StatusCode = StatusCodes.Status404NotFound;
            await SeoHtmlFallback.WriteNotFound(context, context.RequestServices.GetRequiredService<SeoRouteCatalog>());
            return;
        }

        await next();
    });
}
app.UseDefaultFiles();
app.UseStaticFiles();
if (!app.Environment.IsDevelopment())
{
    var spaRoot = SpaWebRoot.Resolve(app.Environment);
    var webRoot = app.Environment.WebRootPath;
    if (spaRoot is not null &&
        !string.Equals(
            Path.GetFullPath(spaRoot),
            Path.GetFullPath(string.IsNullOrEmpty(webRoot) ? "wwwroot-missing" : webRoot),
            StringComparison.OrdinalIgnoreCase))
    {
        var provider = new PhysicalFileProvider(spaRoot);
        app.UseDefaultFiles(new DefaultFilesOptions { FileProvider = provider });
        app.UseStaticFiles(new StaticFileOptions { FileProvider = provider });
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
     
    app.UseHsts();
}

app.UseHttpsRedirection();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseAuthorization();

if (app.Environment.IsDevelopment())
{
    app.MapGet("/api/debug/exception-email", () =>
    {
        throw new Exception("Exception email test");
    });
}

app.MapControllers();

if (app.Environment.IsDevelopment())
{
    app.MapFallbackToFile("/index.html");
}
else
{
    app.MapFallback(SeoHtmlFallback.Invoke);
}

app.Run();
