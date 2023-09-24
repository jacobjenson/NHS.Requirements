using Microsoft.EntityFrameworkCore;
using NHS.Api.Models;

namespace NHS.Api.DAL
{
    public class RequirementContext : DbContext
    {
        public DbSet<Requirement> Requirements { get; set; }

        public DbSet<Staff> Staff { get; set; }

        public RequirementContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Requirement>(entity =>
            {
                var enumValues = Enum.GetValues(typeof(Status))
                 .Cast<int>()
                 .Select(value => value.ToString());

                entity.ToTable(
                    nameof(Requirement),
                    t => t.HasCheckConstraint("CK_Requirements_Status", $"{nameof(Requirement.Status)} IN ({string.Join(", ", enumValues)})"));
            });

            // Value conversions
            modelBuilder
                .Entity<Requirement>()
                   .Property(e => e.Status)
                   .HasConversion<int>();
        }
    }
}