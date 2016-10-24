using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Hosting;
using GolfConnector.Web.Models;
using Microsoft.AspNet.Identity;
using GolfConnector.Web.dtos;
using GolfConnector.Web.Models.Domain;
using System.Linq.Expressions;
using System.IO;

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
                 GolfMatchDateIso = x.GolfMatchDateIso,
                 ClubName = x.Club.Name,
               
             };

        public GolfMatchController(UserManager<ApplicationUser> userManager, IHostingEnvironment environment, IGolfConnectorDbContext db)
        {
            this.userManager = userManager;
            this.environment = environment;
            _db = db;
        }
        // GET: api/GolfMatch
        [HttpGet("daterange/{start}/{end}")]
        public IEnumerable<GolfMatchDto> GetMatchesByDate(long start, long end)
        {
            DateTime unixEpoch = DateTime.ParseExact("1970-01-01", "yyyy-MM-dd", System.Globalization.CultureInfo.InvariantCulture);
            DateTime convertedStart = unixEpoch.AddMilliseconds(start);
            DateTime convertedEnd = unixEpoch.AddMilliseconds(end);

            // get the upcoming (current) golf matches
            var matches = _db.GolfMatches
               .Where(s => DateTime.Parse(s.GolfMatchDateIso).ToLocalTime() >= convertedStart && DateTime.Parse(s.GolfMatchDateIso).ToLocalTime() <= convertedEnd)
               .OrderBy(s => s.GolfMatchDateIso)
               .Select(AsGolfMatchDto)
               .ToList();

            foreach (var s in matches)
            {
                s.Time = DateTime.Parse(s.Time).ToString("HH:mm");
                s.StartDate = DateTime.Parse(s.StartDate).ToShortDateString();
                s.GolfMatchDateIso = DateTime.Parse(s.GolfMatchDateIso).ToLocalTime().ToString();

                var users = (from su in _db.GolfMatchPlayers
                             where su.GolfMatchId == s.GolfMatchId
                             select new GolfMatchPlayerDto
                             {
                                 User = su.User,
                                 DisplayName = su.User.FirstName + " " + su.User.LastName,
                                 IsInMatch = true,
                                 Handicap = su.User.Handicap,
                                 InviteDate = su.InviteDate.Value,
                                 InviteStatusName = su.InviteStatus.Name,

                             }).ToList();

                foreach (var user in users)
                {
                    string bytes = "";
                    try
                    {
                        //bytes = Convert.ToBase64String(
                        //    System.IO.File.ReadAllBytes(
                        //        Path.Combine(environment.WebRootPath + "\\uploads", user.User.UserName + ".jpeg")));

                        //user.ImageBytes = "data:image/jpeg;base64," + bytes;

                        if ((user.User.FirstName + " " + user.User.LastName) == s.UserName)
                        {
                            user.IsMatchCreator = true;
                        }
                    }
                    catch (Exception ex)
                    {
                        // Log.Error(ex.Message);
                    }

                }

                s.Players = new List<GolfMatchPlayerDto>();
                s.Players.AddRange(users);
            }

            return matches;
        }


        // GET: api/GolfMatch
        [HttpGet]
        public IEnumerable<GolfMatchDto> Get()
        {
            // get the upcoming (current) golf matches
            var matches = _db.GolfMatches
               .Where(s => DateTime.Parse(s.StartDate + " " + s.Time) >= DateTime.Now.AddMinutes(-5))
               .OrderBy(s => s.GolfMatchDateIso).Select(AsGolfMatchDto).ToList();

            foreach (var s in matches)
            {
                s.Time = DateTime.Parse(s.Time).ToString("HH:mm");
                s.StartDate = DateTime.Parse(s.StartDate).ToShortDateString();
                s.GolfMatchDateIso = DateTime.Parse(s.GolfMatchDateIso).ToLocalTime().ToString();

                var users = (from su in _db.GolfMatchPlayers
                             where su.GolfMatchId == s.GolfMatchId
                             select new GolfMatchPlayerDto
                             {
                                 User = su.User,
                                 DisplayName = su.User.FirstName + " " + su.User.LastName,
                                 IsInMatch = true,
                                 Handicap = su.User.Handicap,
                                 InviteDate = su.InviteDate.Value,
                                 InviteStatusName = su.InviteStatus.Name,

                             }).ToList();

                foreach (var user in users)
                {
                    string bytes = "";
                    try
                    {
                        //bytes = Convert.ToBase64String(
                        //    System.IO.File.ReadAllBytes(
                        //        Path.Combine(environment.WebRootPath + "\\uploads", user.User.UserName + ".jpeg")));

                        //user.ImageBytes = "data:image/jpeg;base64," + bytes;

                        if ((user.User.FirstName + " " + user.User.LastName) == s.UserName)
                        {
                            user.IsMatchCreator = true;
                        }
                    }
                    catch (Exception ex)
                    {
                        // Log.Error(ex.Message);
                    }

                }

                s.Players = new List<GolfMatchPlayerDto>();
                s.Players.AddRange(users);
            }

            return matches;
        }
       
        // GET api/GolfMatch/5    
        [HttpGet("{id}")]
        public IActionResult GetGolfMatch(int id)
        {
            GolfMatchDto golfMatch = _db.GolfMatches
                .Where(i => i.GolfMatchId == id)
                .Select(AsGolfMatchDto)
                .FirstOrDefault();

            if (golfMatch == null)
            {
                return HttpNotFound();
            }

            var users = (from su in _db.GolfMatchPlayers
                         where su.GolfMatchId == golfMatch.GolfMatchId
                         select new GolfMatchPlayerDto
                         {
                             User = su.User,
                             DisplayName = su.User.FirstName + " " + su.User.LastName,
                             IsInMatch = true,
                             Handicap = su.User.Handicap,
                             InviteDate = su.InviteDate.Value,
                             InviteStatusName = su.InviteStatus.Name,
                             IsMatchCreator = su.IsMatchCreator
                         }).ToList();

            foreach (var user in users)
            {
                string bytes = "";
                try
                {
                    bytes = Convert.ToBase64String(
                        System.IO.File.ReadAllBytes(
                            Path.Combine(environment.WebRootPath + "\\uploads", user.User.UserName + ".jpeg")));

                    user.ImageBytes = "data:image/jpeg;base64," + bytes;


                }
                catch (Exception ex)
                {
                    //Log.Error(ex.Message);
                }

            }

            golfMatch.GolfMatchDateIso = DateTime.Parse(golfMatch.GolfMatchDateIso).ToLocalTime().ToString();

            golfMatch.Players = new List<GolfMatchPlayerDto>();
            golfMatch.Players.AddRange(users);

            return new ObjectResult(golfMatch);
        }
       
        // GET api/GolfMatch/10292016/BakerHill
        [HttpGet("{date}/{clubName}")]
        public IActionResult GetGolfMatchByDateTime(DateTime date, string clubName)
        {
            var startDate = date.ToUniversalTime().ToString("yyyy-MM-dd");
            var time = date.ToUniversalTime().ToString("HH:mm:ss");

            GolfMatchDto golfMatch = _db.GolfMatches
                .Where(i => i.StartDate == startDate
                && i.Time == time
                && i.Club.Name == clubName)
                .Select(AsGolfMatchDto)
                .FirstOrDefault();

            if (golfMatch == null)
            {
                return HttpNotFound();
            }
            var users = (from su in _db.GolfMatchPlayers
                         where su.GolfMatchId == golfMatch.GolfMatchId
                         select new GolfMatchPlayerDto
                         {
                             User = su.User,
                             DisplayName = su.User.FirstName + " " + su.User.LastName,
                             IsInMatch = true,
                             Handicap = su.User.Handicap,
                             IsMatchCreator = su.IsMatchCreator

                         }).ToList();

            foreach (var user in users)
            {
                string bytes = "";
                try
                {
                    bytes = Convert.ToBase64String(
                        System.IO.File.ReadAllBytes(
                            Path.Combine(environment.WebRootPath + "\\uploads", user.User.UserName + ".jpeg")));

                    user.ImageBytes = "data:image/jpeg;base64," + bytes;
                }
                catch (Exception ex)
                {

                    // Log.Error(ex.Message);
                }

            }

            golfMatch.GolfMatchDateIso = DateTime.Parse(golfMatch.GolfMatchDateIso).ToLocalTime().ToString();

            golfMatch.Players = new List<GolfMatchPlayerDto>();
            golfMatch.Players.AddRange(users);

            return new ObjectResult(golfMatch);
        }
               

        // GET: api/GolfMatch/joinable/{username}
        [HttpGet]
        [Route("joinable/{userName}")]
        public IEnumerable<GolfMatchDto> GetJoinableGolfMatchesForCurrentUser(string userName)
        {
            List<GolfMatchDto> scheduleDtos = new List<GolfMatchDto>();

            var appUser = userManager.FindByNameAsync(userName).Result;

            // get the upcoming (current) matches
            var matches = (from s in _db.GolfMatches
                             join u in _db.GolfMatchPlayers on s.GolfMatchId equals u.GolfMatchId
                             where DateTime.Parse(s.StartDate) >= DateTime.Now 
                             && u.User.Id != appUser.Id
                             select s).ToList();

            foreach (var s in matches)
            {
                s.Time = DateTime.Parse(s.Time).ToLocalTime().ToString();
                s.StartDate = DateTime.Parse(s.StartDate).ToLocalTime().ToString();
                s.GolfMatchDateIso = DateTime.Parse(s.StartDate).ToLocalTime().ToString("yyyy-MM-ddTHH:mm:ssZ");

                var users = (from su in _db.GolfMatchPlayers
                             where su.GolfMatchId == s.GolfMatchId
                             select new GolfMatchPlayerDto
                             {
                                 User = su.User,
                                 DisplayName = su.User.FirstName + " " + su.User.LastName,
                                 IsInMatch = true,
                                 Handicap = su.User.Handicap,
                                 IsMatchCreator = su.IsMatchCreator
                             }).ToList();

                var currentUserFound = false;
                foreach (var user in users)
                {
                    if (user.User.Id == appUser.Id)
                        currentUserFound = true;

                    string bytes = "";
                    try
                    {
                        bytes = Convert.ToBase64String(
                            System.IO.File.ReadAllBytes(
                                Path.Combine(environment.WebRootPath + "\\uploads", user.User.UserName + ".jpeg")));

                        user.ImageBytes = "data:image/jpeg;base64," + bytes;
                    }
                    catch (Exception ex)
                    {
                      //  Log.Error(ex.Message);
                    }

                }
                if (currentUserFound == false)
                {
                    var scheduleDto = new GolfMatchDto();

                    scheduleDto.Comments = s.Comments;
                    scheduleDto.GolfMatchId = s.GolfMatchId;
                    scheduleDto.NumberOfHoles = s.NumberOfHoles;
                    scheduleDto.NumberOfPlayers = s.NumberOfPlayers;
                    scheduleDto.Time = s.Time;                
                    scheduleDto.StartDate = s.StartDate;
                    scheduleDto.GolfMatchDateIso = s.GolfMatchDateIso;

                    scheduleDto.Players = new List<GolfMatchPlayerDto>();
                    scheduleDto.Players.AddRange(users);

                    scheduleDtos.Add(scheduleDto);
                }
            }

            return scheduleDtos;
        }


        [HttpGet]
        [Route("upcoming/{userName}")]
        public IEnumerable<GolfMatchDto> GetUpcomingGolfMatchesForCurrentUser(string userName)
        {
            List<GolfMatchDto> golfMatchDtos = new List<GolfMatchDto>();

            var appUser = userManager.FindByNameAsync(userName).Result;

            // get the upcoming (current) golf matches
            var golfMatches = (from s in _db.GolfMatches
                             join u in _db.GolfMatchPlayers on s.GolfMatchId equals u.GolfMatchId
                             where DateTime.Parse(s.StartDate) >= DateTime.Now
                             && u.User.Id == appUser.Id
                             select s).ToList();

            foreach (var s in golfMatches)
            {
                s.Time = DateTime.Parse(s.Time).ToLocalTime().ToString();
                s.StartDate = DateTime.Parse(s.StartDate).ToLocalTime().ToString();

                var players = (from su in _db.GolfMatchPlayers
                             where su.GolfMatchId == s.GolfMatchId
                             select new GolfMatchPlayerDto
                             {
                                 User = su.User,
                                 DisplayName = su.User.FirstName + " " + su.User.LastName,
                                 IsInMatch = true,
                                 Handicap = su.User.Handicap,
                                 IsMatchCreator = su.IsMatchCreator

                             }).ToList();

                foreach (var user in players)
                {
                    string bytes = "";
                    try
                    {
                        bytes = Convert.ToBase64String(
                            System.IO.File.ReadAllBytes(
                                Path.Combine(environment.WebRootPath + "\\uploads", user.User.UserName + ".jpeg")));

                        user.ImageBytes = "data:image/jpeg;base64," + bytes;
                    }
                    catch (Exception ex)
                    {

                       // Log.Error(ex.Message);
                    }

                }

                var golfMatchDto = new GolfMatchDto();

                golfMatchDto.Comments = s.Comments;
                golfMatchDto.GolfMatchId = s.GolfMatchId;
                golfMatchDto.NumberOfHoles = s.NumberOfHoles;
                golfMatchDto.NumberOfPlayers = s.NumberOfPlayers;
                golfMatchDto.Time = s.Time;            
                golfMatchDto.StartDate = s.StartDate;
                golfMatchDto.GolfMatchDateIso = s.GolfMatchDateIso;

                golfMatchDto.Players = new List<GolfMatchPlayerDto>();
                golfMatchDto.Players.AddRange(players);

                golfMatchDtos.Add(golfMatchDto);
            }

            return golfMatchDtos;
        }

        // GET: api/GolfMatch/created/{username}
        [HttpGet]
        [Route("created/{userName}")]
        public IEnumerable<GolfMatchDto> GetCreatedGolfMatchesByCurrentUser(string userName)
        {
            List<GolfMatchDto> golfMatchDtos = new List<GolfMatchDto>();

            var appUser = userManager.FindByNameAsync(userName).Result;

            // get the upcoming (current) golf matches
            var golfMatches = (from s in _db.GolfMatches
                             join u in _db.GolfMatchPlayers on s.GolfMatchId equals u.GolfMatchId
                             where DateTime.Parse(s.StartDate) >= DateTime.Now 
                             && u.User.Id == appUser.Id && u.IsMatchCreator
                             select s).ToList();

            foreach (var s in golfMatches)
            {
                s.Time = DateTime.Parse(s.Time).ToLocalTime().ToString();
                s.StartDate = DateTime.Parse(s.StartDate).ToLocalTime().ToString();

                var users = (from su in _db.GolfMatchPlayers
                             where su.GolfMatchId == s.GolfMatchId
                             select new GolfMatchPlayerDto
                             {
                                 User = su.User,
                                 DisplayName = su.User.FirstName + " " + su.User.LastName,
                                 IsInMatch = true,
                                 Handicap = su.User.Handicap,
                                 InviteDate = su.InviteDate.Value,
                                 InviteStatusName = su.InviteStatus.Name,
                                 IsMatchCreator = su.IsMatchCreator

                             }).ToList();

                foreach (var user in users)
                {
                    string bytes = "";
                    try
                    {
                        bytes = Convert.ToBase64String(
                            System.IO.File.ReadAllBytes(
                                Path.Combine(environment.WebRootPath + "\\uploads", user.User.UserName + ".jpeg")));

                        user.ImageBytes = "data:image/jpeg;base64," + bytes;
                    }
                    catch (Exception ex)
                    {

                        // Log.Error(ex.Message);
                    }
                }

                var golfMatchDto = new GolfMatchDto
                {
                    Comments = s.Comments,
                    GolfMatchId = s.GolfMatchId,
                    NumberOfHoles = s.NumberOfHoles,
                    NumberOfPlayers = s.NumberOfPlayers,
                    Time = s.Time,                  
                    StartDate = s.StartDate,
                    GolfMatchDateIso = s.GolfMatchDateIso
                };

                golfMatchDto.Players = new List<GolfMatchPlayerDto>();
                golfMatchDto.Players.AddRange(users);

                golfMatchDtos.Add(golfMatchDto);
            }

            return golfMatchDtos;
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
                var club = _db.Clubs.Where(c => c.Name == "BakerHill").Single();
               
                var newGolfMatch = new GolfMatch()
                {
                    GolfMatchDateIso = DateTime.Parse(match.StartDate + " " + match.Time).ToUniversalTime().ToString("o"),
                    StartDate = match.StartDate,
                    Time = DateTime.Parse(match.Time).ToString("HH:mm:ss"),
                    NumberOfPlayers = 4,
                    NumberOfHoles = match.NumberOfHoles,
                    Comments = match.Comments,                   
                    ClubId = club.ClubId
                };

                _db.GolfMatches.Add(newGolfMatch);
                _db.SaveChanges();

                foreach (var player in match.Players)
                {
                    var appPlayer = GetPlayer(player);

                    if (appPlayer != null)
                    {                         
                        bool isMatchCreator = false;
                        if (appPlayer == createdByUser)
                            isMatchCreator = true;

                        _db.GolfMatchPlayers.Add(new GolfMatchPlayer()
                        {
                            GolfMatchId = newGolfMatch.GolfMatchId,
                            User = appPlayer,
                            IsMatchCreator = isMatchCreator,
                            InviteStatus = new InviteStatus()
                            {
                                Name = isMatchCreator ? InviteStatusName.Accepted.ToString() : InviteStatusName.Pending.ToString()
                            },
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

        public ApplicationUser GetPlayer(GolfMatchPlayerDto player)
        {
            var appPlayer = userManager.FindByIdAsync(player.UserId).Result;

            if (appPlayer == null)
                appPlayer = userManager.FindByNameAsync(player.DisplayName).Result;

            return appPlayer;
        }

        [HttpPut("remove-player/{id}")]
        public IActionResult PutRemovePlayer(int id, [FromBody]string playerId)
        {
            var player = _db.GolfMatchPlayers.Where(u => u.GolfMatchId == id && u.User.Id == playerId).Select(u => u).SingleOrDefault();

            if (player != null && !player.IsMatchCreator)
            {
                _db.GolfMatchPlayers.Remove(player);
                _db.SaveChanges();
            }

            return Ok();
        }


        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]GolfMatchDto golfMatch)
        {
            if (!ModelState.IsValid)
                return HttpBadRequest(ModelState);

            if (id != golfMatch.GolfMatchId)
            {
                return HttpBadRequest();
            }

            var editedGolfMatch = _db.GolfMatches
                .FirstOrDefault(s => s.GolfMatchId == golfMatch.GolfMatchId);

            if (editedGolfMatch == null)
                return HttpBadRequest();
            
            editedGolfMatch.NumberOfHoles = golfMatch.NumberOfHoles;
            editedGolfMatch.StartDate = golfMatch.StartDate;
            editedGolfMatch.Time = golfMatch.Time;

            var d = DateTime.Parse(golfMatch.StartDate + " " + golfMatch.Time);
            editedGolfMatch.GolfMatchDateIso = d.ToUniversalTime().ToString("o");

            if (golfMatch.Players != null)
            {
                // foreach player in schedule, if IsInMatch = false add to scheduleusers
                foreach (var p in golfMatch.Players)
                {                   
                    DateTime? inviteDate = null;
                    string inviteStatus;

                    // if they're not yet in the match, add them
                    if (!p.IsInMatch)
                    {
                        if (p.JoinedByThemselves)
                        {
                            // if the person being added is the same name as the current user, then already confirmed (they added themselves)
                            inviteStatus = InviteStatusName.Accepted.ToString();
                        }
                        else
                        {
                            inviteStatus = InviteStatusName.Pending.ToString();
                            inviteDate = DateTime.Now;
                        }

                        var player = userManager.FindByNameAsync(p.UserName).Result;

                        if (player == null)
                            player = userManager.FindByIdAsync(p.UserId).Result;

                        if (player != null)
                        {
                            _db.GolfMatchPlayers.Add(new GolfMatchPlayer
                            {
                                InviteStatus = new InviteStatus() {
                                    Name = inviteStatus
                                },
                                GolfMatchId = golfMatch.GolfMatchId,
                                User = player,                                
                                InviteDate = inviteDate
                            });
                        }
                    }
                }
            }
            
            _db.SaveChanges();

            return new NoContentResult();

        }

        // DELETE api/GolfMatch/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            GolfMatch golfMatch = _db.GolfMatches.Where(i => i.GolfMatchId == id).First();

            if (golfMatch == null)
                return HttpNotFound();

            _db.GolfMatches.Remove(golfMatch);
            _db.SaveChanges();

            return Ok(golfMatch);
        }
    }
}