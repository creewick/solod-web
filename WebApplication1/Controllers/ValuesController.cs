using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Firebase.Database;
using Firebase.Database.Query;
using Newtonsoft.Json;

namespace solod_web_app.Controllers
{
    public class ValuesController : ApiController
    {
        // GET api/type
        [HttpGet]
        public async Task<string> Get(string id)
        {
            var database = new FirebaseClient(
                "https://solod-web.firebaseio.com/",
                new FirebaseOptions
                    { AuthTokenAsyncFactory = () => Task.FromResult("1qpnWeEw14Q0Pn7AapJnbaZTjJlcl5rt3r6PTB8e") }
            );
            var data = await database
                .Child(id)
                .OnceSingleAsync<Dictionary<string, Dictionary<string, string>>>();
            return JsonConvert.SerializeObject(data);
        }

        // POST api/type
        [HttpPost]
        public async Task Post(string id, [FromBody] Dictionary<string, string> value)
        {
            var database = new FirebaseClient(
                "https://solod-web.firebaseio.com/",
                new FirebaseOptions
                    { AuthTokenAsyncFactory = () => Task.FromResult("1qpnWeEw14Q0Pn7AapJnbaZTjJlcl5rt3r6PTB8e") }
            );
            await database
                .Child(id)
                .PostAsync(value);
        }
    }
}
