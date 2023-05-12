using WebApi.Mapsters;
using WebApi.Extensions;
using WebApi.Validations;
using TatBlog.WebApi.Extensions;

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
    app.Run();
}