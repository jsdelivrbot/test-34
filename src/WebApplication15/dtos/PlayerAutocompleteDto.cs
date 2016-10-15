using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GolfConnector.Web.dtos
{
    public class PlayerAutocompleteDto
    {
        // userid
        public string value { get; set; }

        // user first name last name and email
        public string label { get; set; }

        // user profile image
        public string icon { get; set; }
    }
}
