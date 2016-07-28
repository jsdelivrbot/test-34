using Microsoft.AspNet.Mvc;
using System.Web.Http;
using System.Net.Http;
using System.Net;
using log4net;
using System.Reflection;
using System.Collections;
using Microsoft.AspNet.Mvc.ModelBinding;
using System.Linq;
using Microsoft.AspNet.Identity;

namespace MRB.Web.Controllers
{
    [Route("api/[controller]")]
    public class BaseController : Controller
    {        
        public static readonly string LogPath = @"C:\inetpub\wwwroot\MRB_Logs\";

        public static readonly ILog Log = LogManager.GetLogger(
            MethodBase.GetCurrentMethod().DeclaringType);

        protected void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }
        }
        protected Hashtable GetErrorsFromModelState(ModelStateDictionary modelState)
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
