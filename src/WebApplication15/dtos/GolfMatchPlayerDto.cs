using GolfConnector.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GolfConnector.Web.dtos
{
    public class GolfMatchPlayerDto
    {        
        public int GolfMatchPlayerId { get; set; }       
        public DateTime? InviteDate { get; set; }
        public DateTime? JoinDate { get; set; }
        public string DisplayName { get; set; }
        public string UserName { get; set; }
        public string ImageBytes { get; set; }
        public bool IsInMatch { get; set; }
        public bool IsMatchCreator { get; set; }
        public bool JoinedByInvite { get; set; }
        public bool JoinedByThemselves { get; set; }
        public string UserId { get; set; }
        public int? Handicap { get; set; }
    }
}
