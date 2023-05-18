using WebApi.Mapsters;
using WebApi.Extensions;
using WebApi.Validations;
using TatBlog.WebApi.Extensions;
using Carter;

var builder = WebApplication.CreateBuilder(args);
{
    builder.ConfigureCors()
        .ConfigureNLog()
        .ConfigureServices()
        .ConfigureMapster()
        .ConfigureSwaggerOpenApi()
        .ConfigureFluentValidation();
}

var app = builder.Build();
{
    app.SetupRequestPipeline();
    app.UseDataSeeder();
    app.MapCarter();
    app.Run();
}