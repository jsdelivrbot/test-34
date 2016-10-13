using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GolfConnector.Web.Models.Domain
{
    public class GolfMatchPlayer
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int GolfMatchPlayerId { get; set; }

        // FK
        [ForeignKey("UserId")]
        public virtual ApplicationUser User { get; set; }

        public int GolfMatchId { get; set; }
        [ForeignKey("GolfMatchId")]
        public GolfMatch GolfMatch { get; set; }

        public DateTime? InviteDate { get; set; }
        public DateTime? JoinDate { get; set; }
        public bool IsConfirmed { get; set; }
    }
    public class GolfMatch
    {
        public GolfMatch()
        {
            Players = new HashSet<GolfMatchPlayer>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int GolfMatchId { get; set; }

        // created by
        [ForeignKey("UserId")]
        public virtual ApplicationUser User { get; set; }

        // default 4
        public int NumberOfPlayers { get; set; }

        // default 18
        public int NumberOfHoles { get; set; }

        public string GolfMatchDateIso { get; set; }
        public string Comments { get; set; }

        [Required]
        public string StartDate { get; set; }
        public string Time { get; set; }

        // FKs
        public int ClubId { get; set; }
        [ForeignKey("ClubId")]
        public Club Club { get; set; }

        public virtual ICollection<GolfMatchPlayer> Players { get; set; }

    }
    public class ClubMemberEmail
    {
        public ClubMemberEmail()
        {

        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ClubMemberEmailId { get; set; }

        // FKs
        public int ClubId { get; set; }
        [ForeignKey("ClubId")]
        public Club Club { get; set; }

        public string Email { get; set; }
        public bool IsAdmin { get; set; }
        public bool IsActiveMember { get; set; }
    }
    public class Club
    {
        public Club()
        {
            ClubMemberEmails = new HashSet<ClubMemberEmail>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ClubId { get; set; }

        [Required]
        public string Name { get; set; }
        public bool IsActive { get; set; }
        public string City { get; set; }
        public string State { get; set; }

        public virtual ICollection<ClubMemberEmail> ClubMemberEmails { get; set; }
    }
}

