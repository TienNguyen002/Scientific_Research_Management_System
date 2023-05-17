using Core.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Contexts
{
    public class WebDbContext : DbContext
    {
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<Lecturer> Lecturers { get; set; }
        public DbSet<Process> Processes { get; set; }
        public DbSet<Status> Status { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Topic> Topics { get; set; }
        public DbSet<TypeAccount> TypeAccounts { get; set; }

        public WebDbContext(DbContextOptions<WebDbContext> options) : base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=.\SQLEXPRESS;Database=NCKHSV;Trusted_Connection=True;Encrypt=False;MultipleActiveResultSets=true");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.ApplyConfigurationsFromAssembly(typeof(TopicMap).Assembly);
        }
    }
}
