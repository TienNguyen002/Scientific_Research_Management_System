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
    public class AccountMap : IEntityTypeConfiguration<Account>
    {
        public void Configure(EntityTypeBuilder<Account> builder)
        {
            builder.ToTable("Accounts");

            builder.HasKey(a => a.Id);

            builder.Property(a => a.Name)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(a => a.Email)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(a => a.Password)
                .IsRequired()
                .HasMaxLength(100);

            builder.HasOne(t => t.TypeAccount)
                .WithMany(a => a.Accounts)
                .HasForeignKey(t => t.TypeAccountId)
                .HasConstraintName("FK_Accounts_TypeAccounts")
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(t => t.Student)
                .WithMany(a => a.Accounts)
                .HasForeignKey(t => t.StudentId)
                .HasConstraintName("FK_Accounts_Students")
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(l => l.Lecturer)
                .WithMany(a => a.Accounts)
                .HasForeignKey(t => t.LecturerId)
                .HasConstraintName("FK_Accounts_Lecturers")
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
