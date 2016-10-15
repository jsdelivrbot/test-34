using GolfConnector.Web.Models.Domain;
using System;
using System.Collections.Generic;

namespace GolfConnector.Web.Dtos
{
    public class TokenDto
    {
        public string id_token { get; set; }
        public string refresh_token { get; set; }
        public string isAuthenticated { get; set; }
        public DateTime? tokenExpires { get; set; }
        public string image { get; set; }
        public bool authenticated { get; set; }
        public string userName { get; set; }
        public string[] roles { get; set; }
        public string imagePath { get; set; }
        public Club[] clubs { get; set; }
        public string displayName { get; set; }
        public string handicap { get; set; }
    }
}
