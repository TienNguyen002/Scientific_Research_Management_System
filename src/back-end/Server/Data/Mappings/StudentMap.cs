using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Mappings
{
    public class StudentMap : IEntityTypeConfiguration<Student>
    {
        public void Configure(EntityTypeBuilder<Student> builder)
        {
            builder.ToTable("Students");

            builder.HasKey(s => s.Id);

            builder.Property(s => s.StudentId)
                .IsRequired()
                .HasMaxLength(10);

            builder.Property(s => s.FullName)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(s => s.UrlSlug) 
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(s => s.DoB)
                .HasColumnType("datetime");

            builder.Property(s => s.ImageUrl)
                .HasMaxLength(500);

            builder.Property(s => s.Phone)
                .HasMaxLength(11);

            builder.Property(s => s.Class)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(s => s.Year)
                .IsRequired()
                .HasMaxLength(50);

            builder.Property(s => s.Address)
                .HasMaxLength(200);

            builder.HasOne(d => d.Department)
                .WithMany(s => s.Students)
                .HasForeignKey(d => d.DepartmentId)
                .HasConstraintName("FK_Students_Departments")
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
