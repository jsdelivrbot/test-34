using log4net;
using System.Collections.Generic;
using System.DirectoryServices.AccountManagement;
using System.Reflection;

namespace AureliaTemplate.Web.ADAuthentication
{
    
    public interface IADService
    {
        bool AuthenticateAD(string username, string password);

        List<GroupPrincipal> GetGroups(string userName);

        bool IsInAdminGroup(List<GroupPrincipal> groups);
    }
    
    public class ADService : IADService
    {
        public static readonly string LogPath = @"C:\inetpub\wwwroot\ProdTracker_Logs\";

        public static readonly ILog Log = LogManager.GetLogger(
            MethodBase.GetCurrentMethod().DeclaringType);

        public static PrincipalContext DomainContext = new PrincipalContext(
              ContextType.Domain, "Schott", "dc=schott, dc=org", ContextOptions.Negotiate, "SCHOTT\\adminxsx", "B33fcake");

        public string applicationGroupName = "prodtracker"; //prodtracker
        public string adminGroupIdentifier = "prodtracker_admin"; // admin

        public bool AuthenticateAD(string username, string password)
        {
            using (var context = new PrincipalContext(ContextType.Domain, "SCHOTT"))
            {
                // attempts to bind using Kerberos, falls back to NTLM.
                var validCreds = context.ValidateCredentials(username, password);

                var prodTrackerGroups = GetGroups(username);
                
                if(validCreds && prodTrackerGroups.Count > 0)
                {
                    return true;
                }

                return false;

            }
        }
        public bool IsInAdminGroup(List<GroupPrincipal> groups)
        {
            foreach(var g in groups)
            {
                if (g.Name.ToLower().Contains(adminGroupIdentifier.ToLower()))
                    return true;
            }

            return false;
        }


        /*
          Finds any membership in Prodtracker groups in order to set appropriate claim for incoming user.
        */
        public List<GroupPrincipal> GetGroups(string userName)
        {
            List<GroupPrincipal> result = new List<GroupPrincipal>();                      
          
            UserPrincipal user = UserPrincipal.FindByIdentity(DomainContext, userName);
           
            if (user != null)
            {
                PrincipalSearchResult<Principal> groups = user.GetAuthorizationGroups();
                               
                foreach (Principal p in groups)
                {                   
                    if (p is GroupPrincipal)
                    {
                        // We're only interested in the application groups.
                        if (p.Name.ToLower().Contains(applicationGroupName.ToLower()) || p.Name.ToLower().Contains(adminGroupIdentifier.ToLower()))
                        {
                            //Log.Info(userName + " is in " + p.Name.ToLower());

                            result.Add((GroupPrincipal)p);
                        }
                    }
                }
            }

            return result;
        }
    }
}
