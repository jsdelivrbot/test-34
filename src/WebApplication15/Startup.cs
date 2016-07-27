using System;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.AspNet.StaticFiles;
using System.IO;
using log4net.Config;
using Microsoft.Extensions.PlatformAbstractions;
using System.Security.Claims;
using AureliaTemplate.Web.Services.Auth;
using System.IdentityModel.Tokens;
using System.Security.Cryptography;
using System.Diagnostics;
using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Authentication.JwtBearer;
using AureliaTemplate.Web.Services;
using AureliaTemplate.Web.Services.Email;
using System.Threading.Tasks;
using Microsoft.AspNet.Http;
using Newtonsoft.Json;
using Microsoft.AspNet.Diagnostics;
using Microsoft.AspNet.Identity;
using AureliaTemplate.Web.Models;
using Microsoft.Data.Entity;
using Microsoft.AspNet.Identity.EntityFramework;

[assembly: XmlConfigurator(Watch = false)]
namespace AureliaTemplate.Web
{
    public class AuthMessageSender : IEmailSender
    {
        private readonly IConfiguration configuration;

        public AuthMessageSender(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        string IEmailSender.adminEmail
        {
            get
            {
                return configuration.Get<string>("AdminEmail");
            }
        }

        public Task SendEmailAsync(string email, string subject, string message)
        {
            // Credentials:          
            var sentFrom = "no-reply@guest.us.schott.com";

            // Configure the client:
            System.Net.Mail.SmtpClient client =
                new System.Net.Mail.SmtpClient("10.28.68.134");

            client.Port = 25;
            client.DeliveryMethod = System.Net.Mail.SmtpDeliveryMethod.Network;
            client.UseDefaultCredentials = false;

            // Create the credentials:
            // TODO: user secret pw
            System.Net.NetworkCredential credentials =
                new System.Net.NetworkCredential("SCHOTT\\adminprogram", "");

            client.EnableSsl = false;
            client.Credentials = credentials;

            // Create the message:
            var mail =
                new System.Net.Mail.MailMessage(sentFrom, email);

            mail.Subject = subject;
            mail.Body = message;
            mail.IsBodyHtml = true;
            try
            {
                return client.SendMailAsync(mail);

            }
            catch (Exception ex)
            {

                throw;
            }
        }
    }

    public class Startup
    {
        const string TokenAudience = "";
        const string TokenIssuer = "LOCAL AUTHORITY";
        public static RsaSecurityKey key;
        private TokenAuthOptions tokenOptions;
        public static ClaimsPrincipal sessionUser = null;

        public static IConfiguration Configuration { get; set; }
        public Startup(IHostingEnvironment env, IApplicationEnvironment appEnv)
        {
            var builder = new ConfigurationBuilder()
                  .AddJsonFile("appsettings.json");

            if (env.IsDevelopment())
            {
                // For more details on using the user secret store see http://go.microsoft.com/fwlink/?LinkID=532709
                builder.AddUserSecrets();
            }

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();

            XmlConfigurator.Configure(new FileInfo(Path.Combine(appEnv.ApplicationBasePath, "log4net.xml")));
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            try
            {
                services.AddAuthentication();
                services.AddSingleton(provider => Configuration);
               

                // generate new key and save in XML file (test only)
                //var file = RSAKeyUtils.GenerateRsaKeys();
                //File.WriteAllText(@"C:\keys\keys.xml", file);

                //RSAParameters keyParams = RSAKeyUtils.GetRandomKey();           
                //key = new RsaSecurityKey(keyParams);
                var stream = new FileStream(@"C:\keys\keys.xml", FileMode.Open);

                using (var textReader = new StreamReader(stream))
                {
                    RSACryptoServiceProvider publicAndPrivate = new RSACryptoServiceProvider();
                    publicAndPrivate.FromXmlString(textReader.ReadToEnd());

                    key = new RsaSecurityKey(publicAndPrivate.ExportParameters(true));

                    Debug.Write(key);
                }
                
                tokenOptions = new TokenAuthOptions()
                {
                    Audience = Configuration["Server:BaseUrl"],
                    Issuer = TokenIssuer,
                    SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.RsaSha256Signature)
                };

                services.AddInstance(tokenOptions);

                services.AddAuthorization(auth =>
                {
                    auth.AddPolicy("Bearer", new AuthorizationPolicyBuilder()
                        .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme‌​)
                        .RequireAuthenticatedUser().Build());

                    auth.AddPolicy("MustHaveRole", policy => policy.RequireClaim(ClaimTypes.Role).Build());
                    auth.AddPolicy("MustBeAdmin", policy => policy.RequireClaim(ClaimTypes.Role, "admin").Build());
                });




                // TODO: uncomment when ApplicationDbContext is created
                // Add framework services.
                services.AddEntityFramework()
                    .AddSqlServer()
                    .AddDbContext<ApplicationDbContext>(options =>
                        options.UseSqlServer(Configuration["Data:DefaultConnection:ConnectionString"]));

                services.AddIdentity<ApplicationUser, IdentityRole>(options => options.Password = new PasswordOptions
                {
                    RequireDigit = false,
                    RequireLowercase = false,
                    RequireUppercase = false,
                    RequireNonLetterOrDigit = false
                })
                    .AddEntityFrameworkStores<ApplicationDbContext>()
                    .AddDefaultTokenProviders();

                // Add framework services.
                services.AddMvc();

                // Add application services.           
                services.AddSingleton<IADService, ADService>();
                services.AddTransient<IEmailSender, AuthMessageSender>();
            }
            catch (Exception ex)
            {

            }
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env,
            ILoggerFactory loggerFactory, UserManager<ApplicationUser> userManager)
        {
            // seed the database here
            //sampleData.InitializeDataAsync();           

            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
            }
            else
            {
                // TODO: uncomment when ApplicationDbContext is created
                // For more details on creating database during deployment see http://go.microsoft.com/fwlink/?LinkID=615859
                try
                {
                    using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>()
                        .CreateScope())
                    {
                        serviceScope.ServiceProvider.GetService<ApplicationDbContext>()
                             .Database.Migrate();
                    }
                }
                catch { }
            }


            app.UseRuntimeInfoPage("/info");
            

            // looks at every request to see if there's any windows identity information
            app.UseIISPlatformHandler(options => options.AuthenticationDescriptions.Clear());

            app.Use(async (context, next) =>
            {
                try
                {
                   
                    await next.Invoke();
                }
                catch (SecurityTokenInvalidLifetimeException ex)
                {
                    // If the headers have already been sent, you can't replace the status code.
                    // In this case, throw an exception to close the connection.       
                    if (context.Response.HasStarted)
                    {
                        throw;
                    }
                    context.Response.StatusCode = 401;
                }
                catch (Exception ex)
                {
                    // If the headers have already been sent, you can't replace the status code.
                    // In this case, throw an exception to close the connection.       
                    if (context.Response.HasStarted)
                    {
                        throw;
                    }
                    context.Response.StatusCode = 401;
                }

            });
            // Register simple error handler to catch token expiries and change them to a 202* 
            // *(should be 401 but front end can't catch those).
            app.UseExceptionHandler(appBuilder =>
            {
                appBuilder.Use(async (context, next) =>
                {
                    var error = context.Features[typeof(IExceptionHandlerFeature)] as IExceptionHandlerFeature;

                    if (error != null && error.Error is SecurityTokenExpiredException)
                    {
                        // token expired. (called from LiftTime validator exception)
                        context.Response.StatusCode = 202;

                        context.Response.ContentType = "application/json";

                        await context.Response.WriteAsync(
                            JsonConvert.SerializeObject(
                                new { authenticated = false, tokenExpired = true }));
                    }

                    else if (error != null && error.Error != null)
                    {
                        // token expired. (called when LifeTime validator returing false).
                        if (error.Error.ToString().Contains("IDX10230: Lifetime validation failed."))
                        {
                            // return 202 so aurelia ajax can pick it up and reissue a request for a new token       
                            context.Response.StatusCode = 202;
                            context.Response.ContentType = "application/json";

                            await context.Response.WriteAsync(
                                 JsonConvert.SerializeObject
                                 (new { success = false }));
                        }

                        // no token exists - return 401.
                        if (error.Error.ToString().Contains("No SecurityTokenValidator available for token: null"))
                        {
                            context.Response.StatusCode = 401;
                            context.Response.ContentType = "application/json";
                            // TODO: Shouldn't pass the exception message straight out, change this.
                            await context.Response.WriteAsync(
                                JsonConvert.SerializeObject
                                (new { success = false, error = error.Error.Message }));
                        }
                        //if (error.Error.ToString().Contains("IDX10503: Signature validation failed"))
                        //{
                        //    context.Response.StatusCode = 202;
                        //    context.Response.ContentType = "application/json";
                        //    // TODO: Shouldn't pass the exception message straight out, change this.
                        //    await context.Response.WriteAsync(
                        //        JsonConvert.SerializeObject
                        //        (new { success = false, error = error.Error.Message }));
                        //}

                    }

                    // We're not trying to handle anything else so just let the default 
                    // handler handle.
                    else await next();
                });
            });

            app.UseJwtBearerAuthentication(options =>
            {
                options.Audience = Configuration.GetSection("Server:BaseUrl").Value;
                //options.Authority = "http://localhost:7001";
                options.AutomaticAuthenticate = true;
                options.RequireHttpsMetadata = false;

                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    LifetimeValidator = (DateTime? notBefore, DateTime? expires, SecurityToken securityToken, TokenValidationParameters validationParameters) =>
                    {
                        if (expires.Value <= DateTime.UtcNow.AddMinutes(-1))
                        {
                            throw new SecurityTokenExpiredException();
                        }
                        return true;
                    },
                    IssuerSigningKey = key,
                    ValidAudience = tokenOptions.Audience,
                    ValidIssuer = tokenOptions.Issuer,
                    ValidateSignature = true,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.FromMinutes(10)
                };
            });

            app.UseIdentity();

            app.UseMvc();

            app.UseFileServer(new FileServerOptions
            {
                EnableDefaultFiles = true
            });
            
        }


        #region create sample data (sample)
        //private static async Task CreateSampleData(IServiceProvider applicationServices)
        //{
        //    using (var dbContext = applicationServices.GetService<IProdTrackerDbContext>())
        //    {
        //        var sqlServerDatabase = dbContext.Database as SqlServerDatabase;
        //        if (sqlServerDatabase != null)
        //        {
        //            // Create database in user root (c:\users\your name)
        //            if (await sqlServerDatabase.EnsureCreatedAsync())
        //            {
        //                // add some movies
        //                var movies = new List<Movie>
        //        {
        //            new Movie {Title="Star Wars", Director="Lucas"},
        //            new Movie {Title="King Kong", Director="Jackson"},
        //            new Movie {Title="Memento", Director="Nolan"}
        //        };
        //                movies.ForEach(m => dbContext.Movies.AddAsync(m));

        //                // add some users
        //                var userManager = applicationServices.GetService<UserManager<ApplicationUser>>();

        //                // add editor user
        //                var stephen = new ApplicationUser
        //                {
        //                    UserName = "Stephen"
        //                };
        //                var result = await userManager.CreateAsync(stephen, "P@ssw0rd");
        //                await userManager.AddClaimAsync(stephen, new Claim("CanEdit", "true"));

        //                // add normal user
        //                var bob = new ApplicationUser
        //                {
        //                    UserName = "Bob"
        //                };
        //                await userManager.CreateAsync(bob, "P@ssw0rd");
        //            }

        //        }
        //    }
        //}
        #endregion


        // Entry point for the application.
        public static void Main(string[] args) => WebApplication.Run<Startup>(args);
    }
}
