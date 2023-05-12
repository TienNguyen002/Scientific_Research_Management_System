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
    public class GroupMap : IEntityTypeConfiguration<Group>
    {
        public void Configure(EntityTypeBuilder<Group> builder)
        {
            builder.ToTable("Groups");

            builder.HasKey(g => g.Id);

            builder.Property(g => g.Name)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(g => g.UrlSlug)
                .IsRequired()
                .HasMaxLength(100);

            builder.HasOne(d => d.Department)
                .WithMany(g => g.Groups)
                .HasForeignKey(d => d.DepartmentId)
                .HasConstraintName("FK_Groups_Departments")
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
