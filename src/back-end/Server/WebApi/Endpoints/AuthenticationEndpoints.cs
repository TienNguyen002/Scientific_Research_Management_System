using BCrypt.Net;
using Carter;
using Core.Entities;
using MapsterMapper;
using Microsoft.IdentityModel.Tokens;
using Services.Apps.Lecturers;
using Services.Apps.Students;
using SlugGenerator;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;
using WebApi.Filters;
using WebApi.Models;
using WebApi.Models.Account;
using WebApi.Models.Topic;

namespace WebApi.Endpoints
{
    public class AuthenticationEndpoints : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            var routeGroupBulder = app.MapGroup("/api/auth");

            routeGroupBulder.MapPost("/register", Register)
                .WithName("Register")
                .Accepts<RegisterRequest>("multipart/form-data")
                .Produces(401)
                .Produces<ApiResponse<AccountDto>>();

            routeGroupBulder.MapPost("/login-student", LoginStudent)
                .WithName("LoginStudent")
                .Accepts<LoginRequest>("multipart/form-data")
                .Produces(401)
                .Produces<ApiResponse<TokenDto>>();

            routeGroupBulder.MapPost("/login-lecturer", LoginLecturer)
                .WithName("LoginLecturer")
                .Accepts<LoginRequest>("multipart/form-data")
                .Produces(401)
                .Produces<ApiResponse<TokenDto>>();
        }

        private static async Task<IResult> Register(
            HttpContext context,
            IStudentRepository studentRepository,
            IMapper mapper)
        {
            var model = await RegisterRequest.BindAsync(context);
            var slug = model.FullName.GenerateSlug();
            if (model.ConfirmPassword != model.Password)
            {
                return Results.Ok(ApiResponse.Fail(HttpStatusCode.Conflict, $"Mật khẩu không trùng khớp"));
            }
            if (await studentRepository.IsStudentEmailExitedAsync(0, model.Email))
            {
                return Results.Ok(ApiResponse.Fail(HttpStatusCode.Conflict, $"Đã tồn tại email {model.Email}"));
            }
            var student = new Student()
            {
                FullName = model.FullName,
                UrlSlug = model.FullName.GenerateSlug(),
                Email = model.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(model.Password),
                RoleId = 1,
            };
            await studentRepository.Register(student);
            return Results.Ok(ApiResponse.Success(mapper.Map<AccountDto>(student), HttpStatusCode.Created));
        }

        private static async Task<IResult> LoginStudent(
            HttpContext context,
            IStudentRepository studentRepository,
            IMapper mapper,
            IConfiguration configuration)
        {
            var model = await LoginRequest.BindAsync(context);
            if(!await studentRepository.IsStudentEmailExitedAsync(0, model.Email))
            {
                return Results.Ok(ApiResponse.Fail(HttpStatusCode.Conflict, $"Không tồn tại sinh viên có email {model.Email}"));
            }
            var student = await studentRepository.GetStudentByEmailAsync(model.Email);
            if(!BCrypt.Net.BCrypt.Verify(model.Password, student.Password))
            {
                return Results.Ok(ApiResponse.Fail(HttpStatusCode.Conflict, $"Sai mật khẩu"));
            }
            string token = CreateStudentToken(student, configuration);
            var result = new TokenDto()
            {
                Token = token,
                UrlSlug = student.UrlSlug,
            };
            return Results.Ok(ApiResponse.Success(mapper.Map<TokenDto>(result), HttpStatusCode.Created));
        }

        private static async Task<IResult> LoginLecturer(
            HttpContext context,
            ILecturerRepository lecturerRepository,
            IMapper mapper,
            IConfiguration configuration)
        {
            var model = await LoginRequest.BindAsync(context);
            if (!await lecturerRepository.IsLecturerEmailExitedAsync(0, model.Email))
            {
                return Results.Ok(ApiResponse.Fail(HttpStatusCode.Conflict, $"Không tồn tại giảng viên có email {model.Email}"));
            }
            var lecturer = await lecturerRepository.GetLecturerByEmailAsync(model.Email);
            if (!BCrypt.Net.BCrypt.Verify(model.Password, lecturer.Password))
            {
                return Results.Ok(ApiResponse.Fail(HttpStatusCode.Conflict, $"Sai mật khẩu"));
            }
            string token = CreateLecturerToken(lecturer, configuration);
            return Results.Ok(ApiResponse.Success(token));
        }

        private static string CreateStudentToken(Student student, IConfiguration configuration)
        {
            List<Claim> claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Email, student.Email),
                new Claim(ClaimTypes.Name, student.FullName),
                new Claim(ClaimTypes.Role, student.Role.Name),
            };
            var key = new SymmetricSecurityKey(Encoding.UTF32.GetBytes(configuration.GetSection("AppSettings:Token").Value!));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);
            var token = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.Now.AddDays(1),
                    signingCredentials: cred
                );
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }

        private static string CreateLecturerToken(Lecturer lecturer, IConfiguration configuration)
        {
            List<Claim> claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Email, lecturer.Email),
                new Claim(ClaimTypes.Name, lecturer.FullName),
                new Claim(ClaimTypes.Role, lecturer.Role.Name)
            };
            var key = new SymmetricSecurityKey(Encoding.UTF32.GetBytes(configuration.GetSection("AppSettings:Token").Value!));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);
            var token = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.Now.AddDays(1),
                    signingCredentials: cred
                );
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }
    }
}
