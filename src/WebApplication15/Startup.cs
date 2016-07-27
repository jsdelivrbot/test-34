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

[assembly: XmlConfigurator(Watch = false)]
namespace AureliaTemplate.Web
{
    public class Startup
    {
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
                services.AddSingleton(provider => Configuration); 

                // Add framework services.
                services.AddMvc();

                // Add application services.                              
                

            }
            catch (Exception ex)
            {

            }
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env,
            ILoggerFactory loggerFactory)
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
            

            app.UseRuntimeInfoPage("/info");
            

            // looks at every request to see if there's any windows identity information
            app.UseIISPlatformHandler(options => options.AuthenticationDescriptions.Clear());

            app.Use(async (context, next) =>
            {
                try
                {
                   
                    await next.Invoke();
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
            
            app.UseMvc();

            app.UseFileServer(new FileServerOptions
            {
                EnableDefaultFiles = true
            });
            
        }        
   
        public static void Main(string[] args) => WebApplication.Run<Startup>(args);
    }
}
