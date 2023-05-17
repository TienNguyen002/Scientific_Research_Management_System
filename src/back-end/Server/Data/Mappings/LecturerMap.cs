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
    public class LecturerMap : IEntityTypeConfiguration<Lecturer>
    {
        public void Configure(EntityTypeBuilder<Lecturer> builder)
        {
            builder.ToTable("Lecturers");

            builder.HasKey(l => l.Id);

            builder.Property(l => l.FullName)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(l => l.UrlSlug)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(l => l.Qualification)
                .HasMaxLength(100);

            builder.Property(l => l.DoB)
                .HasColumnType("datetime");

            builder.Property(l => l.ImageUrl)
                .HasMaxLength(500);

            builder.HasOne(d => d.Department)
                .WithMany(l => l.Lecturers)
                .HasForeignKey(d => d.DepartmentId)
                .HasConstraintName("FK_Lecturers_Departments")
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
