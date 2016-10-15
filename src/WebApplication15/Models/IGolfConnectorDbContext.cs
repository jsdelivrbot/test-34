using GolfConnector.Web.Models.Domain;
using Microsoft.Data.Entity;

namespace GolfConnector.Web.Models
{
    public interface IGolfConnectorDbContext
    {
        DbSet<GolfMatchPlayer> GolfMatchPlayers { get; set; }
        DbSet<GolfMatch> GolfMatches { get; }
        DbSet<ClubMemberEmail> ClubMemberEmails { get; set; }
        DbSet<Club> Clubs { get; set; }
        DbSet<InviteStatus> InviteStatus { get; set; }
        DbSet<PlayerQueue> PlayerQueue { get; set; }

        int SaveChanges();
    }
}
