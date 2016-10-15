using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Identity;
using GolfConnector.Web.Models;
using Microsoft.AspNet.Hosting;
using System.Linq.Expressions;
using GolfConnector.Web.dtos;
using Microsoft.AspNet.Http;
using System.Drawing;
using System.IO;
using System.Text.RegularExpressions;

namespace GolfConnector.Web.Controllers
{
    [Route("api/[controller]")]
    public class UserController : BaseController
    {
        private readonly UserManager<ApplicationUser> userManager;
        private IGolfConnectorDbContext _db;
        private IHostingEnvironment _environment;

        public static readonly Expression<Func<ApplicationUser, UserDto>> AsUserDto =
             x => new UserDto
             {
                 DisplayName = x.UserName,
                 FirstName = x.FirstName,
                 LastName = x.LastName,
                 LastActivityDate = x.LastActivityDate,
                 LastLoginDate = x.LastLoginDate
             };
        public UserController(IHostingEnvironment environment, IGolfConnectorDbContext db, UserManager<ApplicationUser> userManager)
        {
            _environment = environment;
            this.userManager = userManager;
            _db = db;
        }


        // TODO: is this needed?
        [HttpGet]
        [Route("refresh")]
        public HttpStatusCodeResult Get(string code)
        {
            return new HttpStatusCodeResult(202);
        }

        // GET: api/values
        [HttpGet]
        [Route("all")]
        //[Authorize(Policy = "MustBeAdmin")]
        public IEnumerable<ApplicationUser> Get()
        {
            var users = userManager.Users;

            return users.Where(u => u.IsActive).ToList();

        }
        // GET: api/values
        [HttpGet]
        [Route("autocomplete")]
        //[Authorize(Policy = "MustBeAdmin")]
        public JsonResult GetAutocomplete(string clubName)
        {
            var clubMembers = new List<PlayerAutocompleteDto>();

            // first get all the users
            var users = userManager.Users.Where(u => u.IsActive);

            // then, get all the emails for this clubname
            var clubMemberEmails = _db.ClubMemberEmails.Where(u => u.Club.Name == clubName).Select(u => u.Email);

            // then get all the users for each email
            foreach (var email in clubMemberEmails)
            {
                foreach (var user in users)
                {
                    if (user.Email == email)
                    {
                        var appUser = userManager.FindByIdAsync(user.Id).Result;
                        var bytes = Convert.ToBase64String(
                    System.IO.File.ReadAllBytes(
                        Path.Combine(_environment.WebRootPath + "\\uploads", appUser.UserName + ".jpeg")));
                        clubMembers.Add(new PlayerAutocompleteDto()
                        {
                            value = user.Id,
                            label = user.FirstName + " " + user.LastName,
                            icon = "data:image/jpeg;base64," + bytes // TODO
                        });
                    }

                }
            }

            return Json(clubMembers.ToList());

        }
        private static string GetFileName(IFormFile file) => file.ContentDisposition.Split(';')
                                                              .Select(x => x.Trim())
                                                              .Where(x => x.StartsWith("filename="))
                                                              .Select(x => x.Substring(9).Trim('"'))
                                                              .First();

        public Image Base64ToImage(string base64String)
        {
            // Convert Base64 String to byte[]
            Image image;
            byte[] imageBytes = Convert.FromBase64String(base64String);
            using (MemoryStream memory = new MemoryStream(imageBytes, 0,
              imageBytes.Length))
            {
                using (FileStream fs = new FileStream(User.Identity.Name, FileMode.Create, FileAccess.ReadWrite))
                {

                    memory.Write(imageBytes, 0, imageBytes.Length);
                    image = Image.FromStream(memory, true);

                }
            }

            return image;

        }


        // POST api/values
        [HttpPost]
        //[Authorize(Policy = "Bearer")]
        [Route("")]
        public async Task<dynamic> Post([FromBody]UserDto user)
        {
            // update user fields
            var appUser = await userManager.FindByNameAsync(user.UserName);

            if (appUser != null)
            {
                if (user.Handicap == "")
                {
                    user.Handicap = "0";
                };

                appUser.FirstName = user.FirstName;
                appUser.LastName = user.LastName;
                appUser.ImagePath = user.ImagePath;
                appUser.Handicap = Convert.ToInt16(user.Handicap);

                var result = await userManager.UpdateAsync(appUser);
                if (result.Succeeded)
                {
                    return Ok(appUser);
                }
                else
                {
                    return HttpBadRequest();
                }
            }
            else
            {
                return HttpBadRequest();
            }

        }


        // POST api/values
        [HttpPost]
        //[Authorize(Policy = "Bearer")]
        [Route("profile/image")]
        public IActionResult Post([FromBody]AttachmentDto fileSelect)
        {
            try
            {
                string fileType = fileSelect.FileAsString.Substring(fileSelect.FileAsString.IndexOf("/") + 1, fileSelect.FileAsString.IndexOf(";") - (fileSelect.FileAsString.IndexOf("/") + 1)).ToLower();

                if (fileType != "jpg" && fileType != "jpeg" && fileType != "gif" && fileType != "png")
                {
                    return HttpBadRequest("Bad file type");
                }
                string imgString = Regex.Replace(fileSelect.FileAsString, @"data:image/[A-Z,a-z]{3,};base64,", "");
                byte[] imageBytes = Convert.FromBase64String(imgString);

                Image image;

                using (MemoryStream memory = new MemoryStream(imageBytes, 0,
                  imageBytes.Length))
                {
                    memory.Write(imageBytes, 0, imageBytes.Length);
                    image = Image.FromStream(memory, true);

                    var path = _environment.WebRootPath + "\\uploads";
                    var fileName = User.Identity.Name + ".jpeg";

                    var uploads = Path.Combine(path, fileName);
                    var filePath = path + "\\" + User.Identity.Name + ".jpeg";
                    //if (System.IO.File.Exists(filePath)){
                    //    System.IO.File.Delete(filePath);
                    //}
                    image.Save(uploads, System.Drawing.Imaging.ImageFormat.Jpeg);
                }
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
            }

            return Ok("Image Uploaded successfully");

        }

    }
}
