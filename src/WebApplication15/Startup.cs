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
using GolfConnector.Web.Services.Auth;
using System.IdentityModel.Tokens;
using System.Security.Cryptography;
using System.Diagnostics;
using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Authentication.JwtBearer;
using GolfConnector.Web.Services;
using GolfConnector.Web.Services.Email;
using System.Threading.Tasks;
using Microsoft.AspNet.Http;
using Newtonsoft.Json;
using Microsoft.AspNet.Diagnostics;
using Microsoft.AspNet.Identity;
using GolfConnector.Web.Models;
using Microsoft.Data.Entity;
using Microsoft.AspNet.Identity.EntityFramework;

[assembly: XmlConfigurator(Watch = false)]
namespace GolfConnector.Web
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string email, string subject, string message);
    }
    public class AuthMessageSender : IEmailSender
    {
        public Task SendEmailAsync(string email, string subject, string message)
        {
            // Credentials:          
            var sentFrom = "golfconnector@gmail.com";

            // Configure the client:
            System.Net.Mail.SmtpClient client =
                new System.Net.Mail.SmtpClient("smtp.gmail.com");

            client.Port = 465;
            client.DeliveryMethod = System.Net.Mail.SmtpDeliveryMethod.Network;
            client.UseDefaultCredentials = false;

            // Create the credentials:
            System.Net.NetworkCredential credentials =
                new System.Net.NetworkCredential("golfconnector@gmail.com", "GCpro777");

            client.EnableSsl = true;
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

        public IConfiguration Configuration { get; set; }
        public Startup(IHostingEnvironment env, IApplicationEnvironment appEnv)
        {
            var builder = new ConfigurationBuilder()
                  .AddJsonFile("appsettings.json")
                  .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

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
            services.AddAuthentication();
            //services.AddCaching(); // todo: do we need this?

            // generate new key and save in XML file (test only)
            //var file = RSAKeyUtils.GenerateRsaKeys();
            //File.WriteAllText(@"C:\temp\keys.xml", file);
            services.AddInstance<IConfiguration>(Configuration);

            //RSAParameters keyParams = RSAKeyUtils.GetRandomKey();           
            //key = new RsaSecurityKey(keyParams);
            var stream = new FileStream(@"C:\temp\keys.xml", FileMode.Open);
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
            // Save the token options into an instance so they're accessible to the 
            // controller.
            services.AddInstance<TokenAuthOptions>(tokenOptions);

            services.AddAuthorization(auth =>
            {
                auth.AddPolicy("Bearer", new AuthorizationPolicyBuilder()
                    .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme‌​)
                    .RequireAuthenticatedUser().Build());

                auth.AddPolicy("MustBeJewish", policy => policy.RequireClaim("Religion", "Jewish").Build());
                auth.AddPolicy("MustHaveRole", policy => policy.RequireClaim(ClaimTypes.Role).Build());
                auth.AddPolicy("MustBeAdmin", policy => policy.RequireClaim(ClaimTypes.Role, "administrator").Build());

            });

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

            services.AddScoped<IGolfConnectorDbContext, ApplicationDbContext>();

            // Add framework services.
            services.AddMvc();

            // Add application services.
            services.AddTransient<IEmailSender, AuthMessageSender>();            

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env,
            ILoggerFactory loggerFactory, UserManager<ApplicationUser> userManager)
        {

            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            if (env.IsDevelopment())
            {
                app.UseBrowserLink();
            }
            else
            {
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
                            // todo: reissue a refresh token? 
                            throw new SecurityTokenExpiredException();
                            //return false;
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

            app.UseStaticFiles();

            app.UseMvc();

            app.UseFileServer(new FileServerOptions
            {
                EnableDefaultFiles = true
            });

        }



        public static void Main(string[] args) => WebApplication.Run<Startup>(args);
    }
}
