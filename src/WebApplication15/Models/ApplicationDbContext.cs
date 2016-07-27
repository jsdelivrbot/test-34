using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Data.Entity;

namespace AureliaTemplate.Web.Models
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext()
        {
            //  Database.EnsureCreated();
        }

        // examples:
        //public DbSet<Stock> Stock { get; set; }

        //public void MarkAsModified(PartTrayConfig partTrayConfig)
        //{
        //    Entry(partTrayConfig).State = EntityState.Modified;
        //}
        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
//#if (DEBUG)
//            options.UseSqlServer(@"Server=susxsxsweb2;Database=ProdTracker_TEST;Trusted_Connection=True;MultipleActiveResultSets=true");
//            // options.UseSqlServer(@"Server=(localdb)\MSSQLLocalDb;Database=ProdTracker;Trusted_Connection=True;MultipleActiveResultSets=true");
//#else
//            options.UseSqlServer(@"Server=susxsxsweb2;Database=ProdTracker;Trusted_Connection=True;MultipleActiveResultSets=true");
//#endif
           
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
            //modelBuilder.Entity<ApplicationUser>().ToTable("Users")
            //    .Property(p => p.Id).HasColumnName("UserId");

            //modelBuilder.Entity<Serial>()
            //  .HasIndex(b => b.SerialNumber);

            //modelBuilder.Entity<Serial>()
            // .HasIndex(b => b.TrayId);



            //modelBuilder.Entity<Tray>()
            //  .HasIndex(b => b.TrayNumber);
            //modelBuilder.Entity<Tray>()
            //  .HasIndex(b => b.PartId);
            //modelBuilder.Entity<Tray>()
            //             .HasIndex(b => b.StockId);

            //modelBuilder.Entity<Serial>()
            //    .Property(s => s.SerialNumber)
            //    .IsRequired(false)
            //    .HasColumnType("varchar")
            //    .HasMaxLength(20);

            //modelBuilder.Entity<Part>()
            //    .Property(s => s.PartNumber)
            //    .IsRequired(true)
            //    .HasColumnType("varchar")
            //    .HasMaxLength(20);

        }

    }
}
