using System;

namespace GolfConnector.Web.dtos
{
    public class UserDto
    {
        public UserDto()
        {
        }

        public string ImagePath { get; set; }
        public string UserName { get; set; }
        public string UserId { get; set; }
        public string DisplayName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Initials { get; set; }
        public bool IsAdmin { get; set; }
        public bool IsActive { get; set; }
        public DateTime LastActivityDate { get; set; }
        public DateTime LastLoginDate { get; set; }
        public ClubDto Club { get; set; }
        public string Handicap { get; set; }
    }
}