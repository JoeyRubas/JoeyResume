using Cta.Exercise.Application.ServiceClients;
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
builder.Services.AddHttpClient<ICatFactServiceClient, CatFactServiceClient>(client =>
{
    client.BaseAddress = new Uri("https://catfact.ninja");
});
builder.Services.AddHttpClient<IRandomFactServiceClient, RandomFactServiceClient>(client =>
{
    client.BaseAddress = new Uri("https://uselessfacts.jsph.pl/");
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        if (builder.Environment.IsDevelopment())
        {
            // Allow any origin in development
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
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

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
