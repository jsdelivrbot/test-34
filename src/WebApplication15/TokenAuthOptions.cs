﻿using System.IdentityModel.Tokens;

namespace AureliaTemplate.Web
{
    public class TokenAuthOptions
    {
        public string TokenEndpointPath { get; set; }
        public string Audience { get; set; }
        public string Issuer { get; set; }
        public SigningCredentials SigningCredentials { get; set; }
    }
}