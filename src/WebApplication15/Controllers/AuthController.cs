using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using AureliaTemplate.Web.Models;
using Microsoft.AspNet.Identity;
using System.Security.Claims;
using Microsoft.AspNet.Mvc.ModelBinding;
using System.Collections;
using System.IdentityModel.Tokens.Jwt;
using AureliaTemplate.Web.Services.Auth;
using AureliaTemplate.Web.Services.Email;
using Microsoft.AspNet.Hosting;
using AureliaTemplate.Web.Services;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace AureliaTemplate.Web.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : BaseController
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly TokenAuthOptions tokenOptions;
        private readonly IEmailSender emailSender;
        private readonly IConfiguration configuration;
        private readonly IADService adService;
        private readonly IHostingEnvironment environment;
        private string baseUrl = string.Empty;

        public AuthController(TokenAuthOptions tokenOptions, UserManager<ApplicationUser> userManager,
           SignInManager<ApplicationUser> signInManager, IEmailSender emailSender,
           IConfiguration configuration, IADService adService, IHostingEnvironment environment)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.tokenOptions = tokenOptions;
            this.emailSender = emailSender;
            this.configuration = configuration;
            this.adService = adService;
            this.environment = environment;

            baseUrl = this.configuration.GetSection("Server:BaseUrl").Value;
        }


             
        /// <summary>
        /// Get login depending on whether they entered a username or email.
        /// </summary>
        /// <param name="login"></param>
        /// <returns></returns>
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
        public async Task<dynamic> Post([FromBody] LoginViewModel req)
        {
            if (!ModelState.IsValid)
                return new HttpUnauthorizedResult();

            var login = req.login.Replace("SCHOTT\\", "");
            Log.Info("Creds: " + login + " " + req.password);

            try
            {
                // verify AD credentials and login     
                if (adService.AuthenticateAD(login, req.password))
                {
                    Log.Info("Login Success: " + login);

                    SignInResult result = new SignInResult();
                    var appUser = GetUserByUserNameOrEmail(login).Result;

                    // if it's null then it can't find the user in the database.
                    // Create the user if this is the first time logging in.
                    if (appUser == null)
                    {
                        appUser = new ApplicationUser
                        {
                            UserName = req.login,
                            EmailConfirmed = true,
                            IsActive = true
                        };

                        IdentityResult identityResult;

                        identityResult = await userManager.CreateAsync(appUser, req.password);

                        if (identityResult.Errors.Count() > 0)
                        {
                            AddErrors(identityResult);

                            var errors = GetErrorsFromModelState(ModelState);
                            return Json(new { success = false, errors });
                        }
                    }

                    appUser.Reauth = false;
                    appUser.LastActivityDate = DateTime.Now;
                    appUser.LastLoginDate = DateTime.Now;

                    await userManager.UpdateAsync(appUser);

                    DateTime? expires = DateTime.UtcNow.AddMinutes(1440 * 7); // 2 weeks

                    // add more claims now that they are logged in
                    var userClaims = await userManager.GetClaimsAsync(appUser);

                    ClaimsIdentity claimsIdentity = new ClaimsIdentity(userClaims, "Bearer");
                    claimsIdentity.AddClaim(new Claim(ClaimTypes.Role, "user"));
                    claimsIdentity.AddClaim(new Claim(ClaimTypes.Name, appUser.UserName));
                    claimsIdentity.AddClaim(new Claim("displayName", appUser.UserName));
                    claimsIdentity.AddClaim(new Claim("username", appUser.UserName));

                    // if user is a member of prodtracker_admin, add admin claim to user.             
                    var groups = adService.GetGroups(appUser.UserName);
                    var isAdmin = adService.IsInAdminGroup(groups);

                    if (isAdmin)
                        claimsIdentity.AddClaim(new Claim(ClaimTypes.Role, "admin"));

                    ClaimsPrincipal principal = new ClaimsPrincipal(claimsIdentity);

                    var token = GetToken(login, expires, claimsIdentity);
                    List<string> roles = GetRoles(userClaims);

                    TokenDto td = new TokenDto();
                    td.id_token = token;
                    td.tokenExpires = expires;
                    td.authenticated = true;
                    td.username = appUser.UserName;
                    td.roles = roles;

                    return new ObjectResult(td);
                }
                else
                {
                    return new { authenticated = false };
                }
            }
            catch (Exception ex)
            {
                Log.Fatal(ex.Message);
                await emailSender.SendEmailAsync(emailSender.adminEmail, "Authentication error in ProdTracker - check logs", ex.Message);

                return new { authenticated = false };
            }
        }

        private static List<string> GetRoles(IList<Claim> userClaims)
        {
            List<string> roles = new List<string>();
            if (userClaims != null)
            {
                foreach (var c in userClaims)
                {
                    if (c.Type.Contains("role"))
                    {
                        roles.Add(c.Value);
                    }
                }
            }

            return roles;
        }

        private string GetToken(string user, DateTime? expires, ClaimsIdentity identity)
        {
            var handler = new JwtSecurityTokenHandler();

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


        
       

      
        #region Helpers
        private Hashtable GetErrorsFromModelState(ModelStateDictionary modelState)
        {
            var errors = new Hashtable();
            foreach (var pair in ModelState)
            {
                if (pair.Value.Errors.Count > 0)
                {
                    errors[pair.Key] = pair.Value.Errors.Select(error => error.ErrorMessage).ToList();
                }
            }

            return errors;
        }
        private async Task<ApplicationUser> GetCurrentUserAsync()
        {
            return await userManager.FindByIdAsync(HttpContext.User.GetUserId());
        }
        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }
        }
        #endregion


    }
}
