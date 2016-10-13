using GolfConnector.Web.Models.Domain;
using System.Collections.Generic;

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
            CreatedByUserId = golfMatch.User.Id;
            Time = golfMatch.Time;
            GolfMatchDateIso = golfMatch.GolfMatchDateIso;
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
