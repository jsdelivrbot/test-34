using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Hosting;
using GolfConnector.Web.Models;
using Microsoft.AspNet.Identity;
using GolfConnector.Web.dtos;
using GolfConnector.Web.Models.Domain;
using System.Linq.Expressions;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace GolfConnector.Web.Controllers
{
    

    [Route("api/[controller]")]
    public class GolfMatchController : Controller
    {
        private IGolfConnectorDbContext _db;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IHostingEnvironment environment;

        public static readonly Expression<Func<GolfMatch, GolfMatchDto>> AsGolfMatchDto =
             x => new GolfMatchDto()
             {
                 GolfMatchId = x.GolfMatchId,
                 StartDate = x.StartDate,
                 NumberOfHoles = x.NumberOfHoles,
                 NumberOfPlayers = x.NumberOfPlayers,
                 Comments = x.Comments,
                 Time = x.Time,
                 UserName = x.User.FirstName + " " + x.User.LastName,
                 GolfMatchDateIso = x.GolfMatchDateIso
             };

        public GolfMatchController(UserManager<ApplicationUser> userManager, IHostingEnvironment environment, IGolfConnectorDbContext db)
        {
            this.userManager = userManager;
            this.environment = environment;
            _db = db;
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public IActionResult PostGolfMatch([FromBody]GolfMatchDto match)
        {
            if (!ModelState.IsValid)
                return HttpBadRequest(ModelState);

            try
            {
                var createdByUser = userManager.FindByNameAsync(match.UserName).Result;

                // get club id of selected club
                var club = _db.Clubs.Where(c => c.Name == match.ClubName).Single();

                var d = DateTime.Parse(match.StartDate + " " + match.Time);
                var newGolfMatch = new GolfMatch()
                {
                    GolfMatchDateIso = d.ToUniversalTime().ToString("o"),
                    StartDate = match.StartDate,
                    Time = DateTime.Parse(match.Time).ToString("HH:mm:ss"),
                    NumberOfPlayers = match.NumberOfPlayers,
                    NumberOfHoles = match.NumberOfHoles,
                    Comments = match.Comments,
                    User = createdByUser,
                    ClubId = club.ClubId
                };

                _db.GolfMatches.Add(newGolfMatch);
                _db.SaveChanges();


                foreach (var player in match.Players)
                {
                    var appPlayer = userManager.FindByIdAsync(player.UserId).Result;

                    if (appPlayer == null)
                        appPlayer = userManager.FindByNameAsync(player.DisplayName).Result;

                    if (appPlayer != null)
                    {
                        _db.GolfMatchPlayers.Add(new GolfMatchPlayer()
                        {
                            GolfMatchId = newGolfMatch.GolfMatchId,
                            User = appPlayer,
                            IsConfirmed = false

                        });
                    }
                }

                _db.SaveChanges();


                return new ObjectResult(newGolfMatch);
            }
            catch (Exception ex)
            {
                // Log.Error(e.Message);
                return new ObjectResult(ex.Message);
            }

        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
