using System.Text.Json;

namespace nilab_ventures.Server.Email;

public sealed class ExceptionEmailMiddleware
{
    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase
    };

    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionEmailMiddleware> _logger;
    private readonly ErrorEmailSender _sender;

    public ExceptionEmailMiddleware(
        RequestDelegate next,
        ILogger<ExceptionEmailMiddleware> logger,
        ErrorEmailSender sender)
    {
        _next = next;
        _logger = logger;
        _sender = sender;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unhandled exception: {Message}", ex.Message);

            var statusCode = MapStatus(ex);
            await _sender.TrySendAsync(context, ex, statusCode, context.RequestAborted);

            if (context.Response.HasStarted)
                return;

            if (context.Request.Path.StartsWithSegments("/api"))
            {
                context.Response.StatusCode = statusCode;
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsync(JsonSerializer.Serialize(new
                {
                    message = "An error occurred processing your request."
                }, JsonOptions));
                return;
            }

            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
            context.Response.ContentType = "text/plain; charset=utf-8";
            await context.Response.WriteAsync("An error occurred processing your request.");
        }
    }

    private static int MapStatus(Exception exception) => exception switch
    {
        UnauthorizedAccessException => StatusCodes.Status401Unauthorized,
        KeyNotFoundException => StatusCodes.Status404NotFound,
        ArgumentException => StatusCodes.Status400BadRequest,
        InvalidOperationException => StatusCodes.Status400BadRequest,
        _ => StatusCodes.Status500InternalServerError
    };
}
