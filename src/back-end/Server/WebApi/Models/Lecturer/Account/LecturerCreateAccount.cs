namespace WebApi.Models.Lecturer.Account
{
    public class LecturerCreateAccount
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
    }
}
