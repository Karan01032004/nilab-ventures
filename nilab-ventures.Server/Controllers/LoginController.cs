using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using nilab_ventures.Server.Data;
using nilab_ventures.Server.DTOs;

namespace nilab_ventures.Server.Controllers
{
    [Route("api/login")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly AppDbContext _db;

        public LoginController(AppDbContext db)
        {
            _db = db;
        }

        [HttpPost]
        public IActionResult Login(LoginDTO dto)
        {
            // 1. Find user by USERNAME
            var user = _db.Admin.FirstOrDefault(x => x.username == dto.username);

            if (user == null)
                return Unauthorized(new { message = "Invalid username or password" });

            // 2. Plain text password check
            if (dto.password != user.password)
                return Unauthorized(new { message = "Invalid username or password" });

            // 3. Success
            return Ok(new
            {
                message = "Login successful",
                userId = user.Id,
                username = user.username,
                email = user.Email
            });
        }
    }
}
