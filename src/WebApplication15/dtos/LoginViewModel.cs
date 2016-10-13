using System.ComponentModel.DataAnnotations;

namespace GolfConnector.Web.Dtos
{
    public class LoginViewModel
    {
        public string login { get; set; }


        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        public string password { get; set; }

    }
}
