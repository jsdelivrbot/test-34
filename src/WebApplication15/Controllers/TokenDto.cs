using System;
using System.Collections.Generic;

namespace AureliaTemplate.Web.Controllers
{
    public class TokenDto
    {
        public string id_token { get; set;  }
        public bool authenticated { get; set; }
        public DateTime? tokenExpires { get; set; }
        public string image { get; set; }
        public string username { get; set; }
        public List<string> roles { get; set; }
    }
}
