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

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowedOrigins", policy =>
    {
        policy.WithOrigins(
            "http://localhost:3000",
            "https://yellow-sand-045d4620f.1.azurestaticapps.net"
        )
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Use CORS policy
app.UseCors("AllowedOrigins");

app.UseAuthorization();

app.MapControllers();

app.Run();
