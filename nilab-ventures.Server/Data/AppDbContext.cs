using Microsoft.EntityFrameworkCore;
using nilab_ventures.Server.Models;
using System.Collections.Generic;

namespace nilab_ventures.Server.Data
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
           : base(options) { }

        public DbSet<Admin> Admin { get; set; }
        public DbSet<Funding> Funding { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Funding>()
                .ToTable("Funding");

            base.OnModelCreating(modelBuilder);
        }
    }
}
