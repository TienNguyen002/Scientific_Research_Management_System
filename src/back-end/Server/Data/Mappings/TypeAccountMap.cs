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
    public class TypeAccountMap : IEntityTypeConfiguration<TypeAccount>
    {
        public void Configure(EntityTypeBuilder<TypeAccount> builder)
        {
            builder.ToTable("TypeAccounts");

            builder.HasKey(t => t.Id);

            builder.Property(t => t.Type)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(t => t.UrlSlug)
                .IsRequired()
                .HasMaxLength(100);
        }
    }
}
