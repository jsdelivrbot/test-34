using Microsoft.AspNet.Identity.EntityFramework;
using System;

namespace GolfConnector.Web.Models
{
    public class ApplicationUser : IdentityUser
    {
        public int? Handicap { get; set; }
        public bool Reauth { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime LastActivityDate { get; set; }
        public DateTime LastLoginDate { get; set; }
        public string ImagePath { get; set; }
        public bool IsActive { get; set; }
    }

    public static class ApplicationUserExtensions
    {
        public static string ToDisplayName(this ApplicationUser user)
        {
            return $"{user.FirstName} {user.LastName}";            
        }
    }
}
