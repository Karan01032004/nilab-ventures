using System.Net;
using System.Net.Mail;

namespace nilab_ventures.Server.Email;

public sealed class ErrorEmailSender
{
    private static readonly Dictionary<string, DateTime> Throttle = new();
    private static readonly object ThrottleLock = new();

    private readonly IConfiguration _configuration;
    private readonly IHostEnvironment _environment;
    private readonly ILogger<ErrorEmailSender> _logger;

    public ErrorEmailSender(
        IConfiguration configuration,
        IHostEnvironment environment,
        ILogger<ErrorEmailSender> logger)
    {
        _configuration = configuration;
        _environment = environment;
        _logger = logger;
    }

    public async Task TrySendAsync(
        HttpContext context,
        Exception exception,
        int statusCode,
        CancellationToken cancellationToken = default)
    {
        try
        {
            var notifications = _configuration.GetSection("ErrorNotifications");
            var enabled = notifications.GetValue<bool?>("Enabled") ?? !_environment.IsDevelopment();
            if (!enabled)
                return;

            var minStatus = notifications.GetValue("MinStatusCodeToEmail", 500);
            if (statusCode < minStatus)
                return;

            var smtp = _configuration.GetSection("Smtp:Error");
            var host = smtp["Host"];
            var fromEmail = smtp["FromEmail"];
            if (string.IsNullOrWhiteSpace(host) || string.IsNullOrWhiteSpace(fromEmail))
            {
                _logger.LogWarning("Error SMTP is not configured; skipping error notification email.");
                return;
            }

            var throttleMinutes = Math.Max(1, notifications.GetValue("ThrottleMinutes", 5));
            var path = context.Request.Path.Value ?? "/";
            var key = $"{exception.GetType().FullName}|{path}";
            var now = DateTime.UtcNow;
            lock (ThrottleLock)
            {
                var window = TimeSpan.FromMinutes(throttleMinutes);
                if (Throttle.TryGetValue(key, out var last) && (now - last) < window)
                {
                    _logger.LogInformation("Error email throttled for {ExceptionType} {Path}", exception.GetType().Name, path);
                    return;
                }

                var expired = Throttle.Where(pair => (now - pair.Value) >= window).Select(pair => pair.Key).ToList();
                foreach (var old in expired)
                    Throttle.Remove(old);

                Throttle[key] = now;
            }

            var recipients = _configuration["AppSettings:ErrorEmailRecipients"];
            if (string.IsNullOrWhiteSpace(recipients))
                recipients = "testing@yourwebsitepreview.com";

            var subject = $"API Error {statusCode} — {path}";
            var body = BuildHtml(context, exception, statusCode);

            var port = smtp.GetValue("Port", 99);
            var sendTask = SendAsync(
                host,
                port,
                smtp["Username"],
                smtp["Password"],
                smtp.GetValue("EnableSsl", false),
                fromEmail,
                smtp["FromName"] ?? "Nilab Ventures",
                recipients,
                subject,
                body,
                cancellationToken);

            var finished = await Task.WhenAny(sendTask, Task.Delay(TimeSpan.FromSeconds(15), cancellationToken));
            if (finished != sendTask)
            {
                _logger.LogError("Error notification email timed out.");
                return;
            }

            await sendTask;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send error notification email.");
        }
    }

    private async Task SendAsync(
        string host,
        int port,
        string? username,
        string? password,
        bool enableSsl,
        string fromEmail,
        string fromName,
        string recipients,
        string subject,
        string body,
        CancellationToken cancellationToken)
    {
        using var client = new SmtpClient(host, port)
        {
            Credentials = new NetworkCredential(username, password),
            EnableSsl = enableSsl
        };

        foreach (var address in recipients.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries))
        {
            using var message = new MailMessage
            {
                From = new MailAddress(fromEmail, fromName),
                Subject = subject,
                Body = body,
                IsBodyHtml = true
            };
            message.To.Add(address);
            await client.SendMailAsync(message, cancellationToken);
            _logger.LogInformation("Error notification email sent to {To}", address);
        }
    }

    private string BuildHtml(HttpContext context, Exception exception, int statusCode)
    {
        var occurred = DateTime.UtcNow.ToString("yyyy-MM-dd HH:mm:ss 'UTC'");
        var path = context.Request.Path.Value ?? "(unknown)";
        var query = context.Request.QueryString.HasValue ? context.Request.QueryString.Value : "";
        var method = context.Request.Method ?? "(unknown)";
        var env = _environment.EnvironmentName;
        var ip = context.Connection.RemoteIpAddress?.ToString();
        var userAgent = context.Request.Headers.UserAgent.ToString();
        var trace = context.TraceIdentifier;
        var exType = exception.GetType().FullName ?? exception.GetType().Name;
        var message = exception.Message;
        var inner = exception.InnerException?.ToString() ?? "";
        var stack = exception.StackTrace ?? "";
        if (stack.Length > 8000)
            stack = stack[..8000];

        var details = $"{exType}: {message}\n\n" +
                      $"Env: {env}\n" +
                      $"Time: {occurred}\n" +
                      $"Request: {method} {path}{query}\n" +
                      $"IP: {(string.IsNullOrWhiteSpace(ip) ? "(unknown)" : ip)}\n" +
                      $"UA: {(string.IsNullOrWhiteSpace(userAgent) ? "(unknown)" : userAgent)}\n" +
                      $"TraceId: {trace}\n\n" +
                      (string.IsNullOrWhiteSpace(inner) ? "" : $"Inner:\n{inner}\n\n") +
                      (string.IsNullOrWhiteSpace(stack) ? "" : $"Stack:\n{stack}\n");

        return $@"<!doctype html>
<html lang='en'>
  <head>
    <meta charset='UTF-8' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    <title>Nilab Ventures Error</title>
  </head>
  <body style='margin:0;background:#fff8db;font-family:Segoe UI,Arial,sans-serif;'>
    <div style='max-width:760px;margin:0 auto;padding:24px;'>
      <div style='background:#111;border-radius:10px;padding:18px 20px;'>
        <div style='color:#ffd54a;font-weight:800;letter-spacing:.12em;'>NILAB VENTURES</div>
        <div style='color:#fff;font-size:18px;margin-top:6px;'>Application Error Notification</div>
      </div>
      <div style='background:#fff;border:1px solid #ffe08a;border-radius:10px;padding:18px 20px;margin-top:14px;'>
        <div style='display:inline-block;background:#fff3b0;color:#5a4200;padding:4px 10px;border-radius:999px;font-weight:800;'>
          STATUS: {statusCode}
        </div>
        <h2 style='margin:14px 0 6px;color:#222;font-size:18px;'>Error details</h2>
        <div style='color:#333;line-height:1.6;font-size:14px;'>
          <div><b>Environment:</b> {WebUtility.HtmlEncode(env)}</div>
          <div><b>Time (UTC):</b> {occurred}</div>
          <div><b>Request:</b> {WebUtility.HtmlEncode(method)} {WebUtility.HtmlEncode(path)}{WebUtility.HtmlEncode(query)}</div>
          <div><b>IP:</b> {WebUtility.HtmlEncode(string.IsNullOrWhiteSpace(ip) ? "(unknown)" : ip)}</div>
          <div><b>TraceId:</b> {WebUtility.HtmlEncode(trace)}</div>
        </div>
        <pre style='margin-top:14px;background:#111;color:#ffe08a;padding:14px;border-radius:10px;overflow:auto;white-space:pre-wrap;'>{WebUtility.HtmlEncode(details)}</pre>
      </div>
    </div>
  </body>
</html>";
    }
}
