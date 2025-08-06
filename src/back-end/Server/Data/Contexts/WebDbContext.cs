using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Data.Contexts
{
    public class WebDbContext : DbContext
    {
        public DbSet<Department> Departments { get; set; }
        public DbSet<Lecturer> Lecturers { get; set; }
        public DbSet<Status> Status { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Topic> Topics { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }

        public WebDbContext(DbContextOptions<WebDbContext> options) : base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=DeviceWeb;Trusted_Connection=True;Encrypt=False;MultipleActiveResultSets=true");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.ApplyConfigurationsFromAssembly(typeof(TopicMap).Assembly);
        }
    }
}
