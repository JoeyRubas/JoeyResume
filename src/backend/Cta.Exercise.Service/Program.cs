using Cta.Exercise.Application.Services;
using Cta.Exercise.Core.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<IBaseRepository, BaseRepository>();
builder.Services.AddScoped<IBaseService, BaseService>();
builder.Services.AddMemoryCache();

// Add GitHub service as singleton - it will preload in constructor
Console.WriteLine("Registering GitHub service - will preload at startup...");
builder.Services.AddSingleton<IGitHubService, GitHubService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        if (builder.Environment.IsDevelopment())
        {
            // Allow specific origins in development for credentials support
            policy.WithOrigins(
                    "http://localhost:5173",           
                    "https://localhost:5173",
                    "http://127.0.0.1:5173",
                    "https://127.0.0.1:5173",
                    "http://localhost:3000",
                    "http://localhost:5000"
                  )
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
        }
        else
        {
            // Specific origins in production
            policy.WithOrigins(
                    "http://localhost:5173",           
                    "https://localhost:5173",        
                    "https://yellow-sand-045d4620f.1.azurestaticapps.net",
                    "https://joeyrubas.com",
                    "https://www.joeyrubas.com"
                  )
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
        }
    });
});

var app = builder.Build();

// Force initialization of GitHubService at startup - trigger async preloading
_ = Task.Run(() =>
{
    using var scope = app.Services.CreateScope();
    var gitHubService = scope.ServiceProvider.GetRequiredService<IGitHubService>();
    Console.WriteLine($"GitHub service initialized with username: {gitHubService.GetUsername()}");
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");

// Only use HTTPS redirection in production
if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
