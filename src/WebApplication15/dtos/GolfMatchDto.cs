using GolfConnector.Web.Models.Domain;
using System.Collections.Generic;
using System.Linq;

namespace GolfConnector.Web.dtos
{
    public class GolfMatchDto
    {
        public GolfMatchDto()
        {

        }
        public GolfMatchDto(GolfMatch golfMatch)
        {
            GolfMatchId = golfMatch.GolfMatchId;
            StartDate = golfMatch.StartDate;
            Comments = golfMatch.Comments;
            NumberOfHoles = golfMatch.NumberOfHoles;
            NumberOfPlayers = golfMatch.NumberOfPlayers;
            //CreatedByUserId = golfMatch.User.Id;
            Time = golfMatch.Time;
            GolfMatchDateIso = golfMatch.GolfMatchDateIso;

            golfMatch.Players.ToList().ForEach(p => Players.Add(new GolfMatchPlayerDto()
            {
                DisplayName = p.User.FirstName + " " + p.User.LastName,
                Email = p.User.Email,
                Handicap = p.User.Handicap,
              //  IsInMatch    = p.IsConfirmed
            }));

        }

        public int GolfMatchId { get; set; }
        public string GolfMatchDateIso { get; set; }
        public string StartDate { get; set; }
        public int NumberOfPlayers { get; set; }
        public int NumberOfHoles { get; set; }
        public string UserName { get; set; }
        public string Comments { get; set; }
        public string Time { get; set; }
        public string ClubName { get; set; }
        public string CreatedByUserId { get; set; }

        public List<GolfMatchPlayerDto> Players { get; set; } = new List<GolfMatchPlayerDto>();
    }
}
