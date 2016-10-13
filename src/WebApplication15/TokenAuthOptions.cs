using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens;
using System.Linq;
using System.Threading.Tasks;

namespace GolfConnector.Web
{
    public class TokenAuthOptions
    {
        public string TokenEndpointPath { get; set; }
        public string Audience { get; set; }
        public string Issuer { get; set; }
        public SigningCredentials SigningCredentials { get; set; }
    }
}
