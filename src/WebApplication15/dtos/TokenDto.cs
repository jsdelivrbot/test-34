using System;
using System.Collections.Generic;

namespace GolfConnector.Web.Dtos
{
    public class TokenDto
    {
        public string id_token { get; set;  }
        public bool authenticated { get; set; }
        public DateTime? tokenExpires { get; set; }
        public string image { get; set; }
        public string username { get; set; }
        public string displayname { get; set; }
        public List<string> roles { get; set; }
    }
}
