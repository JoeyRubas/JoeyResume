using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace Cta.Exercise.Service.Middleware
{
    public class AuthMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly string _jwtSecret;

        public AuthMiddleware(RequestDelegate next, IConfiguration configuration)
        {
            _next = next;
            _jwtSecret = Environment.GetEnvironmentVariable("JWT_SECRET") ?? 
                        configuration["JwtSecret"] ?? 
                        "your-super-secret-jwt-key-that-should-be-at-least-32-characters-long";
        }

        public async Task InvokeAsync(HttpContext context)
        {
            // Only protect POST, PUT, DELETE operations on skill/hobby endpoints
            var path = context.Request.Path.Value?.ToLower();
            var method = context.Request.Method.ToUpper();
            
            var isProtectedEndpoint = (path?.Contains("/skill") == true || path?.Contains("/hobby") == true) &&
                                    (method == "POST" || method == "PUT" || method == "DELETE");
            
            if (isProtectedEndpoint)
            {
                var token = context.Request.Cookies["auth_token"] ?? 
                           context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
                
                if (string.IsNullOrEmpty(token) || !ValidateJwtToken(token))
                {
                    context.Response.StatusCode = 401;
                    await context.Response.WriteAsync("Unauthorized");
                    return;
                }
            }

            await _next(context);
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
}
