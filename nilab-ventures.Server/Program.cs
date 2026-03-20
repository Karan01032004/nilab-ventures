using nilab_ventures.Server.Data;
using Microsoft.EntityFrameworkCore;

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

 
var app = builder.Build();
app.UseCors("AllowAll");
app.UseDefaultFiles();
app.UseStaticFiles();

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
//app.Use(async (context, next) =>
//{   
//    context.Response.Headers["Content-Security-Policy"] =
//        "default-src 'self'; " +
//        "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; " +
//        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
//        "font-src 'self' https://fonts.gstatic.com; " +
//        "img-src 'self' data: https:; " +
//        "connect-src 'self' https:;";

//    await next();
//});
app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
