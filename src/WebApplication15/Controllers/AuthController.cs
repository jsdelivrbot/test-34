using System;
using Microsoft.AspNet.Mvc;
using System.Security.Claims;
using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Identity;
using GolfConnector.Web.Models;
using System.Threading.Tasks;
using System.Net;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNet.Hosting;
using System.IO;
using GolfConnector.Web.Dtos;
using System.Linq;
using GolfConnector.Web.dtos;
using GolfConnector.Web.Models.Domain;

namespace GolfConnector.Web.Controllers
{
    [Route("api/auth")]
    public class AuthController : BaseController
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly TokenAuthOptions tokenOptions;
        private readonly IEmailSender emailSender;
        private readonly IConfiguration configuration;
        private readonly IHostingEnvironment environment;
        private readonly IGolfConnectorDbContext db;
        private string baseUrl = string.Empty;

        public AuthController(TokenAuthOptions tokenOptions, UserManager<ApplicationUser> userManager,
           SignInManager<ApplicationUser> signInManager, IEmailSender emailSender, IHostingEnvironment environment, IGolfConnectorDbContext db)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.tokenOptions = tokenOptions;
            this.emailSender = emailSender;
            this.environment = environment;
            this.db = db;
            // this.configuration = configuration;
            baseUrl = "http://localhost:7001/";
            // baseUrl = this.configuration.GetSection("Server:BaseUrl").Value;
        }

        /// <summary>
        /// Check if currently authenticated. Will throw an exception of some sort which shoudl be caught by a general
        /// exception handler and returned to the user as a 401, if not authenticated. Will return a fresh token if
        /// the user is authenticated, which will reset the expiry.
        /// </summary>
        /// <returns></returns>
        //[HttpPost]
        //[Route("refresh")]
        //[Authorize(Policy = "Bearer")]
        //public async Task<dynamic> Post([FromBody]string refreshtoken)
        //{
        //    // test if password hash changes?

        //    // Checks the password hash sent against the password hash in the database
        //    // 1. this is helpful if someone intercepts a token and tries to use it after the user has updated their password.
        //    // 2. the person who stole the token won't have the matching password so this old refresh token won't be accepted.
        //    // see http://stackoverflow.com/questions/26739167/jwt-json-web-token-automatic-prolongation-of-expiration


        //    // if the app is closed for longer than a week (since the time of the auth or refresh token expiry, then they'll have to login again).
        //    // todo: still vulnerable to replay attacks! (use https) to prevent token from being grabbed.    
        //    string newRefreshToken = null;
        //    DateTime? tokenExpires = default(DateTime?);

        //    // let's decode the token:
        //    var parts = refreshtoken.Split('.');
        //    var header = parts[0];
        //    var payload = parts[1];           

        //    // get the payload           
        //    var payloadJson = Encoding.UTF8.GetString(Base64UrlDecode(payload));
        //    JObject payloadData = JObject.Parse(payloadJson);

        //    string refreshTokenPasswordHash = "";
        //    string uid = "";
        //    string name = "";

        //    // get the claims from the passed in token
        //    foreach (var e in payloadData)
        //    {
        //        if (e.Key == "h")
        //        {
        //            refreshTokenPasswordHash = e.Value.ToString();
        //        }
        //        if (e.Key == "nameid")
        //        {
        //            uid = e.Value.ToString();
        //        }
        //        if (e.Key == "token_expires")
        //        {
        //            tokenExpires = (DateTime)e.Value;
        //        }
        //        if (e.Key == "username")
        //        {
        //            name = e.Value.ToString();
        //        }
        //    }

        //    var appUser = await userManager.FindByIdAsync(uid);

        //    if (appUser != null)
        //    {
        //        // if user has reauth flag, they must authenticate.
        //        if (appUser.Reauth)
        //            return new { authenticated = false };

        //        // lets check the pw hash to make sure it matches db (if an attacker is using a stolen token, but the 
        //        // user has since updated their pw).
        //        if (appUser.PasswordHash != refreshTokenPasswordHash)
        //        {
        //            appUser.Reauth = true;
        //            await userManager.UpdateAsync(appUser);

        //            // not a match! user must change password.
        //            return new { authenticated = false };
        //        }

        //        // safety check to make sure reauth = false because they passed all previous tests.
        //        appUser.Reauth = false;
        //        appUser.LastActivityDate = DateTime.Now;
        //        await userManager.UpdateAsync(appUser);

        //        // get claims of current user
        //        var userClaims = await userManager.GetClaimsAsync(appUser);

        //        // make our new refresh token expiration date
        //        var twoWeeks = (1440 * 7) * 2;
        //        DateTime? newRefreshTokenExpiration = DateTime.UtcNow.AddMinutes(twoWeeks); // 2 weeks from now

        //        // get image   
        //        string bytes = "";
        //        try
        //        {
        //            bytes = Convert.ToBase64String(
        //                System.IO.File.ReadAllBytes(
        //                    Path.Combine(environment.WebRootPath + "\\uploads", appUser.UserName + ".jpeg")));
        //        }
        //        catch (Exception ex)
        //        {

        //            Log.Error(ex.Message);
        //        }



        //        // add new claims specific to the refresh token
        //        ClaimsIdentity claimsIdentity = new ClaimsIdentity(userClaims, "Bearer");

        //        // can only have one club right now - this will be rewritten to accomodate muli clubs and join w/ diff emails.
        //        appUser.Clubs = new List<Club>();
        //        Club club = new Club();
        //        if (db.ClubUserEmails.Any(c => c.UserEmail.ToLower() == appUser.Email.ToLower().Trim()))
        //        {
        //            club = db.ClubUserEmails.Where(c => c.UserEmail == appUser.Email).Select(c => c.Club).First();
        //            appUser.Clubs.Add(club);
        //        }
        //        // update the clients token password hash in case it's been changed
        //        claimsIdentity.AddClaim(new Claim("h", appUser.PasswordHash));
        //        claimsIdentity.AddClaim(new Claim("token_expires", newRefreshTokenExpiration.Value.ToString()));
        //        claimsIdentity.AddClaim(new Claim("displayName", appUser.FirstName + " " + appUser.LastName));
        //        claimsIdentity.AddClaim(new Claim(ClaimTypes.Role, "user"));
        //        claimsIdentity.AddClaim(new Claim(ClaimTypes.Name, appUser.UserName));
        //        claimsIdentity.AddClaim(new Claim("firstName", appUser.FirstName));
        //        claimsIdentity.AddClaim(new Claim("lastName", appUser.LastName));
        //        claimsIdentity.AddClaim(new Claim("username", appUser.UserName));
        //        claimsIdentity.AddClaim(new Claim("club", club.Name));

        //        if (appUser.UserName == "timothy.cushman@guest.us.schott.com")
        //        {
        //            claimsIdentity.AddClaim(new Claim(ClaimTypes.Role, "administrator"));
        //        }

        //        ClaimsPrincipal principal = new ClaimsPrincipal(claimsIdentity);


        //        // create the new refresh token
        //        newRefreshToken = GetToken(appUser.Email, newRefreshTokenExpiration.Value, claimsIdentity);

        //        string role = "";
        //        string userName = principal.GetUserName();

        //        // whatever you want to send explicity (outside of token) to the client
        //        if (userClaims != null)
        //        {
        //            foreach (var c in userClaims)
        //            {
        //                if (c.Type.Contains("role"))
        //                {
        //                    role = c.Value;
        //                }                        
        //            }
        //        }

        //        TokenDto td = new TokenDto();
        //        td.id_token = newRefreshToken;
        //        td.tokenExpires = newRefreshTokenExpiration;
        //        td.image = bytes;
        //        td.authenticated = true;
        //        td.userName = userName;
        //        td.role = role;
        //        td.imagePath = appUser.ImagePath;

        //        return new ObjectResult(td);
        //    }
        //    return new { authenticated = false };
        //}


        // GET: /Token/ConfirmEmail
        [HttpGet]
        [AllowAnonymous]
        [Route("ConfirmEmail")]
        public async Task<IActionResult> ConfirmEmail(string userId, string code)
        {
            if (userId == null || code == null)
            {
                return View("Error");
            }
            var user = await userManager.FindByIdAsync(userId);
            if (user == null)
            {
                // actually, return Error. todo: just for testing
                return Redirect(baseUrl + "#/login?c=0&username=" + user.UserName);

            }
            var result = await userManager.ConfirmEmailAsync(user, code);

            if (result.Succeeded)
            {
                return Redirect(baseUrl + "#/login?c=1&username=" + user.UserName);
            }
            return Ok();
        }



        //
        // POST: /Token/Register
        [HttpPost]
        [AllowAnonymous]
        [Route("signup")]
        public async Task<dynamic> Register([FromBody]RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                //if (db.ClubUserEmails.Any(c => c.UserEmail.ToLower() == model.Email.ToLower().Trim()))
                //{

                //    var user = new ApplicationUser
                //    {

                //        UserName = model.UserName.Trim(),
                //        Email = model.Email.Trim(),
                //        FirstName = model.FirstName.Trim(),
                //        LastName = model.LastName.Trim(),
                //        ImagePath = "IMG_1459.jpg",
                //        IsActive = true,
                //        EmailConfirmed = true

                //    };


                //    IdentityResult result;

                //    try

                //    {

                //        result = await userManager.CreateAsync(user, model.Password);

                //    }

                //    catch (Exception ex)

                //    {
                //        throw;

                //    }


                //    if (result.Succeeded)

                //    {
                //        // add default claims upon registration              
                //        //await userManager.AddClaimsAsync(user, new List<Claim>()
                //        //{
                //        //   new Claim(ClaimTypes.Country, "US"),
                //        //   new Claim(ClaimTypes.Role, "user"),                       
                //        //   new Claim(ClaimTypes.Name, user.UserName),
                //        //   new Claim(ClaimTypes.NameIdentifier, user.Id)

                //        //});

                //        await signInManager.SignInAsync(user, isPersistent: false);

                //        //// Send an email with this link
                //        //var code = await userManager.GenerateEmailConfirmationTokenAsync(user);
                //        //var callbackUrl = Url.Action("ConfirmEmail", "Token", new { userId = user.Id, code = code }, protocol: HttpContext.Request.Scheme);

                //        //try
                //        //{
                //        //    await emailSender.SendEmailAsync(model.Email, user.UserName + ", finish signing up for GolfConnector!",
                //        //  "Almost done! Please confirm your account by clicking: <a href=\"" + callbackUrl + "\">here</a>");
                //        //}
                //        //catch (Exception ex)
                //        //{
                //        //    throw;
                //        //}

                //        //logger.LogInformation(3, "User created a new account with password.");
                //        //return new { authenticated = true };

                //        return Redirect(baseUrl + "#/login?c=1&username=" + user.UserName);





                //    }
                //    // If we got this far, something failed, redisplay form

                //    //AddErrors(result);

                //}

            }


            // If we got this far, something failed, redisplay form
            return Ok(ModelState);


        }


        private async Task<ApplicationUser> GetUserByUserNameOrEmail(string login)
        {
            var appUser = await userManager.FindByNameAsync(login);
            if (appUser == null)
            {
                appUser = await userManager.FindByEmailAsync(login);
            }

            return appUser;
        }

        /// <summary>
        /// Login: Request a new token for a given username/password pair.
        /// </summary>
        /// <param name="req"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("~/auth/login")]
        public async Task<dynamic> Post([FromBody] LoginViewModel credentials)
        {
            if (!ModelState.IsValid)
                return new { authenticated = false, email_verified = false };

            ApplicationUser appUser = GetUserByUserNameOrEmail(credentials.login).Result;

            // verify that the user confirmed their email address, if not return an error
            SignInResult result = new SignInResult();
            if (appUser != null && appUser.EmailConfirmed)
            {
                result = await signInManager
                    .PasswordSignInAsync(appUser.UserName, credentials.password, isPersistent: true, lockoutOnFailure: false);

            }
            else
            {
                return new { authenticated = false, email_verified = false };
            }

            if (result.Succeeded)
            {
                // update login details 
                appUser.Reauth = false;
                appUser.LastActivityDate = DateTime.Now;
                appUser.LastLoginDate = DateTime.Now;

                await userManager.UpdateAsync(appUser);

                // get profile image
                string bytes = "";
                try
                {
                    Log.Info(environment.WebRootPath + "\\uploads");

                    bytes = Convert.ToBase64String(
                   System.IO.File.ReadAllBytes(
                       Path.Combine(environment.WebRootPath + "\\uploads", appUser.UserName + ".jpeg")));
                }
                catch (Exception ex)
                {
                    Log.Info(ex.Message);
                }


                // get clubs
                //appUser.Clubs = new List<Club>();
                //Club club = new Club();
                //if (db.ClubUserEmails.Any(c => c.UserEmail.ToLower() == appUser.Email.ToLower().Trim()))
                //{
                //    // can only have one club right now - this will be rewritten to accomodate muli clubs and join w/ diff emails.
                //    club = db.ClubUserEmails.Where(c => c.UserEmail == appUser.Email).Select(c => c.Club).First();
                //    appUser.Clubs.Add(club);
                //}

                // get claims
                var userClaims = await userManager.GetClaimsAsync(appUser);
                ClaimsIdentity claimsIdentity = new ClaimsIdentity(userClaims, "Bearer");
                claimsIdentity.AddClaim(new Claim(ClaimTypes.Role, "user"));
                claimsIdentity.AddClaim(new Claim(ClaimTypes.Name, appUser.UserName));
                claimsIdentity.AddClaim(new Claim("displayName", appUser.FirstName + " " + appUser.LastName));
                claimsIdentity.AddClaim(new Claim("firstName", appUser.FirstName));
                claimsIdentity.AddClaim(new Claim("lastName", appUser.LastName));
                claimsIdentity.AddClaim(new Claim("userName", appUser.UserName));
                //claimsIdentity.AddClaim(new Claim("club", club.Name));
                claimsIdentity.AddClaim(new Claim("handicap", appUser.Handicap.HasValue ? appUser.Handicap.Value.ToString() : ""));

                // todo: move this to seed?
                if (appUser.UserName == "timothy.cushman@guest.us.schott.com")
                {
                    claimsIdentity.AddClaim(new Claim(ClaimTypes.Role, "administrator"));
                }
                ClaimsPrincipal principal = new ClaimsPrincipal(claimsIdentity);

                //A refresh_token is just another jwt with a longer ttl than the access_token.
                //The refresh tokens is then used to refresh the access_token, either automatically, 
                //whenever the access_token expires, or by calling authService.updateToken() manually.
                //For example, you could set the ttl of the access_token to 1 day and the ttl of the refresh_token to 30 days.
                //As a result,a user stays logged in for 30 days after his last activity.
                DateTime? expires = DateTime.UtcNow.AddMinutes(1440); // 1440 = 1 day 
                TokenDto tokenDto = new TokenDto();

                tokenDto.id_token = GetToken(credentials.login, expires, claimsIdentity, false);
                tokenDto.refresh_token = GetToken(credentials.login, expires, claimsIdentity, true);
                tokenDto.tokenExpires = expires;
                tokenDto.image = bytes;
                tokenDto.authenticated = true;
                tokenDto.userName = appUser.UserName;
                tokenDto.imagePath = appUser.ImagePath;
                tokenDto.displayName = appUser.FirstName + " " + appUser.LastName;
                tokenDto.handicap = appUser.Handicap.HasValue ? appUser.Handicap.Value.ToString() : "";

                return new ObjectResult(tokenDto);

            }
            return new { authenticated = false };
        }

        private string GetToken(string user, DateTime? expires, ClaimsIdentity identity, bool isRefreshToken)
        {
            var handler = new JwtSecurityTokenHandler();

            // todo: find out why refresh token sends null credentials.
            if (isRefreshToken)
            {
                expires = DateTime.UtcNow.AddMinutes(1); // 43800 = 1 mo.
            }
            var securityToken = handler.CreateToken(
                issuer: tokenOptions.Issuer,
                audience: tokenOptions.Audience,
                signingCredentials: tokenOptions.SigningCredentials,
                subject: identity,
                expires: expires,
                notBefore: DateTime.UtcNow.AddMinutes(-1)
                );

            return handler.WriteToken(securityToken);
        }


        //
        // POST: /Token/ForgotPassword
        [HttpPost]
        [Route("forgotPassword")]
        public async Task<IActionResult> ForgotPassword([FromBody]string email)
        {
            if (ModelState.IsValid)
            {
                var user = GetUserByUserNameOrEmail(email).Result;
                if (user == null)
                {
                    // Don't reveal that the user does not exist or is not confirmed
                    return View("ForgotPasswordConfirmation");
                }

                user.Reauth = true;
                await userManager.UpdateAsync(user);

                var code = await userManager.GeneratePasswordResetTokenAsync(user);
                var callbackUrl = baseUrl + "#/resetPassword?email=" + email + "&userId=" + user.Id + "&code=" + WebUtility.UrlEncode(code);

                try
                {
                    await emailSender.SendEmailAsync(email, "Reset Password",
                       "Please reset your password by clicking here: <a href=\"" + callbackUrl + "\">link</a>");

                }

                catch (Exception ex)
                {
                    throw;
                }

                //logger.LogInformation(3, "User created a new account with password.");
                return Ok();

            }

            // If we got this far, something failed, redisplay form
            return View(email);
        }



        //
        // POST: /Token/ResetPassword
        [HttpPost]
        [Route("resetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody]ResetPasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }
            var user = GetUserByUserNameOrEmail(model.Email).Result;
            if (user == null)
            {
                // Don't reveal that the user does not exist - todo: test this
                return RedirectToAction(nameof(AuthController.ResetPasswordConfirmation));
            }
            var result = await userManager.ResetPasswordAsync(user, model.Code, model.Password);
            if (result.Succeeded)
            {
                user.Reauth = true;
                await userManager.UpdateAsync(user);
                return View("ResetPasswordConfirmation");
            }
            AddErrors(result);
            return View();
        }

        //
        // GET: /Token/ResetPasswordConfirmation
        [HttpGet]
        [Route("resetPasswordConfirmation")]
        public IActionResult ResetPasswordConfirmation()
        {
            return View();
        }

        [Authorize(Policy = "MustBeAdmin")]
        public async Task<IActionResult> ChangePasswordAdmin(string userId, string newPassword)
        {
            try
            {
                var user = await userManager.FindByIdAsync(userId);

                // validate password using PasswordValidator.Validate
                var pv = new PasswordValidator<ApplicationUser>();
                await pv.ValidateAsync(userManager, user, newPassword);

                user.PasswordHash = new PasswordHasher<ApplicationUser>().HashPassword(user, newPassword);

                await userManager.UpdateAsync(user);

                return Ok();
            }

            catch (Exception ex)
            {
                // todo: log
                return HttpBadRequest(ex);
            }

        }

        #region Helpers
        // from JWT spec
        private static byte[] Base64UrlDecode(string input)
        {
            var output = input;
            output = output.Replace('-', '+'); // 62nd char of encoding
            output = output.Replace('_', '/'); // 63rd char of encoding
            switch (output.Length % 4) // Pad with trailing '='s
            {
                case 0: break; // No pad chars in this case
                case 2: output += "=="; break; // Two pad chars
                case 3: output += "="; break; // One pad char
                default: throw new System.Exception("Illegal base64url string!");
            }
            var converted = Convert.FromBase64String(output); // Standard base64 decoder
            return converted;
        }

        static byte[] GetBytes(string str)
        {
            byte[] bytes = new byte[str.Length * sizeof(char)];
            System.Buffer.BlockCopy(str.ToCharArray(), 0, bytes, 0, bytes.Length);
            return bytes;
        }

        private async Task<ApplicationUser> GetCurrentUserAsync()
        {
            return await userManager.FindByIdAsync(HttpContext.User.GetUserId());
        }
       
        #endregion


    }
}
