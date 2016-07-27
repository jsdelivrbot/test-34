using Microsoft.AspNet.Mvc;
using System.Web.Http;
using System.Net.Http;
using System.Net;
using log4net;
using System.Reflection;

namespace AureliaTemplate.Web.Controllers
{
    [Route("api/[controller]")]
    public class BaseController : Controller
    {        
        public static readonly string LogPath = @"C:\inetpub\wwwroot\AureliaTemplate_Logs\";

        public static readonly ILog Log = LogManager.GetLogger(
            MethodBase.GetCurrentMethod().DeclaringType);


        /// <summary>
        ///     Creates an <see cref="HttpResponseException" /> to be thrown by the api.
        /// </summary>
        /// <param name="reason">Explanation text, also added to the body.</param>
        /// <param name="code">The HTTP status code.</param>
        /// <returns>
        ///     A new <see cref="HttpResponseException" />
        /// </returns>
        protected static HttpResponseException CreateHttpResponseException(string reason)
        {
            var response = new HttpResponseMessage
            {
                StatusCode = HttpStatusCode.BadRequest,
                ReasonPhrase = reason,
                Content = new StringContent(reason)
            };
            throw new HttpResponseException(response);
        }
    }
}
