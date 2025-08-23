using apiProperties.Models;
using apiProperties.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.Configure<MongoDbSettings>(
    builder.Configuration.GetSection("MongoDbSettings")
);

builder.Services.AddOpenApi();
builder.Services.AddControllers();
builder.Services.AddSingleton<OwnerService>();
builder.Services.AddSingleton<PropertyService>();
builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwaggerUi(option=>
    {
        option.Path = "/swagger";
        option.DocumentPath = "/openapi/v1.json";
    });
}

app.UseHttpsRedirection();
app.MapControllers();
app.Run();

