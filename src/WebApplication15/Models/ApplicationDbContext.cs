using GolfConnector.Web.Models.Domain;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Data.Entity;

namespace GolfConnector.Web.Models
{
    public class ApplicationDbContext
        : IdentityDbContext<ApplicationUser>, IGolfConnectorDbContext
    {
        public ApplicationDbContext()
        {
             Database.EnsureCreated();
        }

        public DbSet<GolfMatchPlayer> GolfMatchPlayers { get; set; }
        public DbSet<ClubMemberEmail> ClubMemberEmails { get; set; }
        public DbSet<Club> Clubs { get; set; }
        public DbSet<GolfMatch> GolfMatches { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseSqlServer(@"Server=(localdb)\MSSQLLocalDB;Database=GolfConnectorPro; Trusted_Connection=True; MultipleActiveResultSets=true");
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ApplicationUser>().ToTable("Users")
                .Property(p => p.Id).HasColumnName("UserId");
        }

    }
}
