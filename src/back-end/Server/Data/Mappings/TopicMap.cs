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
    public class TopicMap : IEntityTypeConfiguration<Topic>
    {
        public void Configure(EntityTypeBuilder<Topic> builder)
        {
            builder.ToTable("Topics");

            builder.HasKey(t => t.Id);

            builder.Property(t => t.Title)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(t => t.UrlSlug)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(t => t.Description)
                .IsRequired()
                .HasMaxLength(1000);

            builder.Property(t => t.Note)
                .HasMaxLength(1000);

            builder.Property(t => t.RegistrationDate)
                .HasColumnType("datetime");

            builder.Property(t => t.EndDate)
                .HasColumnType("datetime");

            builder.Property(t => t.StudentNumbers)
                .IsRequired();

            builder.Property(t => t.Price)
                .IsRequired();

            builder.Property(t => t.ViewCount)
                .HasMaxLength(10);

            builder.Property(t => t.OutlineUrl)
                .HasMaxLength(10000);

            builder.Property(t => t.ResultUrl)
                .HasMaxLength(10000);

            builder.Property(t => t.Point)
                .HasMaxLength(3);

            builder.HasOne(d => d.Department)
                .WithMany(t => t.Topics)
                .HasForeignKey(d => d.DepartmentId)  
                .HasConstraintName("FK_Topics_Departments")
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(l => l.Lecturer)
                .WithMany(t => t.Topics)
                .HasForeignKey(l => l.LecturerId)
                .HasConstraintName("FK_Topics_Lecturers")
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(s => s.Status)
                .WithMany(t => t.Topics)
                .HasForeignKey(s => s.StatusId)
                .HasConstraintName("FK_Topics_Status")
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(s => s.Students)
                .WithMany(t => t.Topics)
                .UsingEntity(pt => pt.ToTable("TopicStudents"));
        }
    }
}
