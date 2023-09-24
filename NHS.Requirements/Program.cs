using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using NHS.Api.DAL;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

CreateDb(builder);

var app = builder.Build();

app.UseCors();

using var scope = app.Services.CreateScope();
var context = scope.ServiceProvider.GetRequiredService<RequirementContext>();
context.Database.EnsureCreated();

// Configure the HTTP request pipeline.

app.UseAuthorization();

app.MapControllers();

app.Run();

static void CreateDb(WebApplicationBuilder builder)
{
    string dir = Path.Combine(Environment.CurrentDirectory, "db");

    if (!Directory.Exists(dir))
    {
        Directory.CreateDirectory(dir);
    }

    string path = Path.Combine(Environment.CurrentDirectory, @"db\requirements.db");

    builder.Services.AddDbContext<RequirementContext>(options =>
        options.UseSqlite($"Data Source={path}"));
}