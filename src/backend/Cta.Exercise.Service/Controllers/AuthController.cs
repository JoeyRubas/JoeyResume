using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace Cta.Exercise.Service.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly string _adminPassword;
        private readonly string _jwtSecret;

        public AuthController(IConfiguration configuration)
        {
            _configuration = configuration;
            _adminPassword = Environment.GetEnvironmentVariable("ADMIN_PASSWORD") ?? 
                           _configuration["AdminPassword"] ?? 
                           "fallback-dev-password";
            _jwtSecret = Environment.GetEnvironmentVariable("JWT_SECRET") ?? 
                        _configuration["JwtSecret"] ?? 
                        "your-super-secret-jwt-key-that-should-be-at-least-32-characters-long";
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            if (string.IsNullOrEmpty(request.Password) || request.Password != _adminPassword)
            {
                return Unauthorized(new { message = "Invalid credentials" });
            }

            var token = GenerateJwtToken();
            
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = !_configuration.GetValue<bool>("Development:AllowInsecureCookies"), // Only allow insecure in dev
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddHours(24)
            };
            
            Response.Cookies.Append("auth_token", token, cookieOptions);
            
            return Ok(new { 
                message = "Login successful",
                token = token,
                expiresAt = DateTime.UtcNow.AddHours(24)
            });
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("auth_token");
            return Ok(new { message = "Logout successful" });
        }

        [HttpGet("verify")]
        public IActionResult VerifyToken()
        {
            var token = Request.Cookies["auth_token"] ?? 
                       Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            
            if (string.IsNullOrEmpty(token))
            {
                return Unauthorized(new { message = "No token provided" });
            }

            if (ValidateJwtToken(token))
            {
                return Ok(new { message = "Token is valid", isAuthenticated = true });
            }

            return Unauthorized(new { message = "Invalid token", isAuthenticated = false });
        }

        private string GenerateJwtToken()
        {
            var key = Encoding.ASCII.GetBytes(_jwtSecret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("role", "admin"),
                    new Claim("user", "admin")
                }),
                Expires = DateTime.UtcNow.AddHours(24),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private bool ValidateJwtToken(string token)
        {
            try
            {
                var key = Encoding.ASCII.GetBytes(_jwtSecret);
                var tokenHandler = new JwtSecurityTokenHandler();
                
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                return true;
            }
            catch
            {
                return false;
            }
        }
    }

    public class LoginRequest
    {
        public string Password { get; set; } = string.Empty;
    }
}
