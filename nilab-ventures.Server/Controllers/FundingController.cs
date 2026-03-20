using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using nilab_ventures.Server.Data;
using nilab_ventures.Server.DTOs;
using nilab_ventures.Server.Models;
using System.Net;
using System.Net.Mail;
using System.Text.Json;

namespace nilab_ventures.Server.Controllers
{
    [Route("api/Funding")]
    [ApiController]
    public class FundingController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FundingController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("submit")]
        public async Task<IActionResult> SubmitApplication([FromBody] FundingDTO dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var entity = new Funding
                {
                    Name = string.IsNullOrWhiteSpace(dto.Name) ? null : dto.Name.Trim(),
                    Email = string.IsNullOrWhiteSpace(dto.Email) ? null : dto.Email.Trim(),
                    Linkedin = string.IsNullOrWhiteSpace(dto.Linkedin) ? null : dto.Linkedin.Trim(),
                    Description = string.IsNullOrWhiteSpace(dto.Description) ? null : dto.Description.Trim(),
                    Stage = string.IsNullOrWhiteSpace(dto.Stage) ? null : dto.Stage,

                    funding_types = dto.funding_types != null && dto.funding_types.Any()
                        ? JsonSerializer.Serialize(dto.funding_types)
                        : null,

                    Problem = string.IsNullOrWhiteSpace(dto.Problem) ? null : dto.Problem.Trim(),
                    Amount = dto.Amount ?? null,

                    Milestones = dto.Milestones != null && dto.Milestones.Any()
                        ? JsonSerializer.Serialize(dto.Milestones)
                        : null,

                    market_size = string.IsNullOrWhiteSpace(dto.market_size) ? null : dto.market_size,
                    Revenue = string.IsNullOrWhiteSpace(dto.Revenue) ? null : dto.Revenue,

                    team_exp = dto.team_exp != null && dto.team_exp.Any()
                        ? JsonSerializer.Serialize(dto.team_exp)
                        : null,

                    competitive_advantage = string.IsNullOrWhiteSpace(dto.competitive_advantage)
                        ? null : dto.competitive_advantage,

                    Equity = string.IsNullOrWhiteSpace(dto.Equity) ? null : dto.Equity,

                    profitability_timeline = string.IsNullOrWhiteSpace(dto.profitability_timeline)
                        ? null : dto.profitability_timeline,

                    competitive_landscape = dto.competitive_landscape ?? null,

                    Roi = string.IsNullOrWhiteSpace(dto.Roi) ? null : dto.Roi,

                    submitted_at = DateTime.UtcNow,
                    updated_at = DateTime.UtcNow,
                    Status = "pending",
                    visible=true
                };

                _context.Funding.Add(entity);
                await _context.SaveChangesAsync();
                var fundingTypes = entity.funding_types != null
    ? string.Join(", ", JsonSerializer.Deserialize<List<string>>(entity.funding_types))
    : "-";

                var milestones = entity.Milestones != null
                    ? string.Join(", ", JsonSerializer.Deserialize<List<string>>(entity.Milestones))
                    : "-";

                var teamExp = entity.team_exp != null
                    ? string.Join("<br/>", JsonSerializer
                        .Deserialize<Dictionary<string, string>>(entity.team_exp)
                        .Select(x => $"{x.Key}: {x.Value}"))
                    : "-";
                string body = $@"
<div style='font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;'>

  <div style='max-width:700px; margin:auto; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 2px 10px rgba(0,0,0,0.08);'>
    
    <!-- HEADER -->
    <div style='background:#0f172a; color:#ffffff; padding:20px; text-align:center;'>
    <img src='https://www.nilabventures.com/assets/nilab-ventures-brand-ghX4eQvw.webp' 
         style='height:40px;' />
     
      <p style='margin:5px 0 0; font-size:14px;'>New Funding Application Received</p>
    </div>

    <!-- BODY -->
    <div style='padding:20px;'>

      <h3 style='border-bottom:1px solid #eee; padding-bottom:8px;'>👤 Basic Information</h3>
      <p><b>Name:</b> {entity.Name}</p>
      <p><b>Email:</b> {entity.Email}</p>
      <p><b>LinkedIn:</b> {entity.Linkedin}</p>
      <p><b>Stage:</b> {entity.Stage}</p>

      <h3 style='border-bottom:1px solid #eee; padding-bottom:8px; margin-top:20px;'>📊 Venture Details</h3>
      <p><b>Description:</b><br/>{entity.Description}</p>
      <p><b>Problem:</b><br/>{entity.Problem}</p>

      <h3 style='border-bottom:1px solid #eee; padding-bottom:8px; margin-top:20px;'>💰 Funding</h3>
      <p><b>Funding Types:</b> {fundingTypes}</p>
      <p><b>Amount:</b> ₹ {entity.Amount}</p>
      <p><b>Milestones:</b> {milestones}</p>

      <h3 style='border-bottom:1px solid #eee; padding-bottom:8px; margin-top:20px;'>📈 Market</h3>
      <p><b>Market Size:</b> {entity.market_size}</p>
      <p><b>Revenue:</b> {entity.Revenue}</p>

      <h3 style='border-bottom:1px solid #eee; padding-bottom:8px; margin-top:20px;'>👥 Team</h3>
      <p>{teamExp}</p>

      <h3 style='border-bottom:1px solid #eee; padding-bottom:8px; margin-top:20px;'>⚡ Financials</h3>
      <p><b>Competitive Advantage:</b> {entity.competitive_advantage}</p>
      <p><b>Equity Offered:</b> {entity.Equity}</p>
      <p><b>ROI:</b> {entity.Roi}</p>
      <p><b>Timeline:</b> {entity.profitability_timeline}</p>
      <p><b>Competition Rating:</b> {entity.competitive_landscape}</p>

    </div>

    <!-- FOOTER -->
    <div style='background:#f1f5f9; padding:15px; text-align:center; font-size:12px; color:#555;'>
      <p style='margin:0;'>© {DateTime.Now.Year} Nilab Ventures</p>
      <p style='margin:5px 0 0;'>This is an automated notification</p>
    </div>

  </div>
</div>
";
                //             string body = $@"
                //     <h2>Nilab Ventures</h2>

                //     <b>Name:</b> {entity.Name}<br/><br/>
                //     <b>Email:</b> {entity.Email}<br/><br/>
                //     <b>LinkedIn Profile:</b> {entity.Linkedin}<br/><br/>

                //     <b>Describe business or venture:</b><br/>{entity.Description}<br/><br/>
                //     <b>Current Venture Stage:</b> {entity.Stage}<br/><br/>
                //     <b>Type of funding sought:</b> {fundingTypes}<br/>
                //     <b>Primary problem venture aims to solve:</b><br/>{entity.Problem}<br/><br/>
                //<b>Amount of funding:</b> {entity.Amount}<br/><br/>
                //<b>milestones to achieve Funding:</b> {milestones}<br/><br/>

                //     <b>Target Market Size:</b> {entity.market_size}<br/>
                //     <b>Projected revenue for next 1–3 years:</b> {entity.Revenue}<br/><br/>
                //     <b>Core team experience in relevant industry sectors:</b> {teamExp}<br/><br/>

                //     <b>competitive advantage:</b> {entity.competitive_advantage}<br/><br/>
                //     <b>Percentage of equity willing to offer:</b> {entity.Equity}<br/><br/>
                //     <b>Expected ROI:</b> {entity.Roi}<br/>
                //     <b>Estimated timeline for achieving profitability:</b> {entity.profitability_timeline}<br/><br/>
                //     <b>Current competitive landscape rating:</b> {entity.competitive_landscape}<br/><br/>
                //     ";

                // ✅ SMTP CONFIG (DIRECT)
                var smtp = new SmtpClient("mail.nilabventures.com")
                {
                    Port = 99,
                    Credentials = new NetworkCredential("noreply@nilabventures.com", "72wf^jR65"),
                    //EnableSsl = true,
                };

                var message = new MailMessage
                {
                    From = new MailAddress("noreply@nilabventures.com"),
                    Subject = "New Funding Application 🚀",
                    Body = body,
                    IsBodyHtml = true
                };

                // 👉 Admin ko mail
                message.To.Add("partner@nilabventures.com");

                await smtp.SendMailAsync(message);
                 
                return Ok(new
                {
                    message = "Application submitted successfully ✅",
                    id = entity.Id
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Error while saving data ❌",
                    error = ex.Message
                });
            }
        }
 
        [HttpGet("{id}")]
        public async Task<IActionResult> GetApplicationById(int id)
        {
            try
            {
                // 1. Pehle Database se Raw data fetch karein (Bina JSON logic ke)
                var rawData = await _context.Funding
                    .Where(x => x.Id == id)
                    .FirstOrDefaultAsync();

                if (rawData == null)
                {
                    return NotFound(new { message = "Application not found ❌" });
                }

                // 2. Ab Memory mein Deserialize karein (Ab error nahi aayega)
                var formattedData = new
                {
                    rawData.Id,
                    rawData.Name,
                    rawData.Email,
                    rawData.Linkedin,
                    rawData.Description,
                    rawData.Stage,

                    // JSON fields handling (Safe Deserialize)
                    funding_types = !string.IsNullOrEmpty(rawData.funding_types)
                        ? JsonSerializer.Deserialize<List<string>>(rawData.funding_types)
                        : new List<string>(),

                    rawData.Problem,
                    rawData.Amount,

                    milestones = !string.IsNullOrEmpty(rawData.Milestones)
                        ? JsonSerializer.Deserialize<List<string>>(rawData.Milestones)
                        : new List<string>(),

                    rawData.market_size, // Aapke DB schema ke hisaab se correct case
                    rawData.Revenue,

                    team_exp = !string.IsNullOrEmpty(rawData.team_exp)
                        ? JsonSerializer.Deserialize<Dictionary<string, string>>(rawData.team_exp)
                        : new Dictionary<string, string>(),

                    rawData.competitive_advantage,
                    rawData.Equity,
                    rawData.profitability_timeline,
                    rawData.competitive_landscape,
                    rawData.Roi,
                    rawData.submitted_at,
                    rawData.updated_at,
                    rawData.Status
                };

                return Ok(formattedData);
            }
            catch (Exception ex)
            {
                // InnerException check karna debugging ke liye best hai
                var errorDetail = ex.InnerException != null ? ex.InnerException.Message : ex.Message;
                return StatusCode(500, new
                {
                    message = "Error fetching details ❌",
                    error = errorDetail
                });
            }
        }
        [HttpGet("count")]
        public async Task<IActionResult> GetFundingCount()
        {
            try
            {
                var count = await _context.Funding.CountAsync();

                return Ok(new
                {
                    total = count
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Error fetching count ❌",
                    error = ex.Message
                });
            }
        }
        [HttpGet("list")]
        public async Task<IActionResult> GetAllApplications()
        {
            try
            {
                var data = await _context.Funding.Where(x => x.visible == true)
                   .OrderByDescending(x => x.Id)
                    .Select(x => new
                    {
                        x.Id,
                        x.Name,
                        x.Email
                    })
                    .ToListAsync();

                return Ok(data);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Error fetching list ❌",
                    error = ex.Message
                });
            }
        }

        [HttpGet("listapp")]
        public async Task<IActionResult> GetApplications()
        {
            try
            {
                var data = await _context.Funding.Where(x => x.visible == false)
                 .OrderByDescending(x => x.Id)
                    .Select(x => new
                    {
                        x.Id,
                        x.Name,
                        x.Email
                    })
                    .ToListAsync();

                return Ok(data);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Error fetching list ❌",
                    error = ex.Message
                });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteApplication(int id)
        {
            try
            {
                var data = await _context.Funding.FindAsync(id);

                if (data == null)
                {
                    return NotFound(new { message = "Application not found ❌" });
                }

                _context.Funding.Remove(data);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    message = "Application deleted successfully 🗑️"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Error deleting data ❌",
                    error = ex.Message
                });
            }
        }

        [HttpPut("mark-attended/{id}")]
        public async Task<IActionResult> MarkAsAttended(int id)
        {
            try
            {
                var data = await _context.Funding.FindAsync(id);

                if (data == null)
                {
                    return NotFound(new { message = "Application not found ❌" });
                }

                data.visible = false; // 🔥 MAIN LOGIC
                data.updated_at = DateTime.UtcNow;

                await _context.SaveChangesAsync();

                return Ok(new
                {
                    message = "Marked as attended ✅"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Error updating status ❌",
                    error = ex.Message
                });
            }
        }
    }
}
