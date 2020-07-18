using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using City.Chain.Identity.Website.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using RestSharp;

namespace City.Chain.Identity.Website.Controllers
{
    [ApiController]
    [Route("api/identity")]
    public class IdentityController : ControllerBase
    {
        private readonly NodeService node;

        public IdentityController(NodeService node)
        {
            this.node = node;
        }

        [HttpGet("{address}")]
        public IActionResult Get([FromRoute] string address)
        {
            RestClient client = node.CreateClient();

            // Get the identity, if it exists.
            var request = new RestRequest($"/identity/{address}");
            IRestResponse<string> response = client.Get<string>(request);

            if (response.StatusCode != System.Net.HttpStatusCode.OK)
            {
                throw new ApplicationException(response.ErrorMessage);
            }

            return Ok(response.Content);
        }

        /// <summary>
        /// Persist the profile of an identity.
        /// </summary>
        /// <param name="address"></param>
        /// <returns></returns>
        [HttpPut("{address}")]
        public async Task<IActionResult> PutIdentity([FromRoute] string address, [FromBody] string document)
        {
            RestClient client = node.CreateClient();

            // Get the identity, if it exists.
            var request = new RestRequest($"/identity/{address}");
            request.AddJsonBody(document);
            IRestResponse<string> response = client.Put<string>(request);

            if (response.StatusCode != System.Net.HttpStatusCode.OK)
            {
                throw new ApplicationException(response.ErrorMessage);
            }

            return Ok(response.Content);
        }

        /// <summary>
        /// Remove the profile of an identity.
        /// </summary>
        /// <param name="address"></param>
        /// <returns></returns>
        [HttpDelete("{address}")]
        public async Task<IActionResult> DeleteIdentity([FromRoute] string address, [FromBody] string document)
        {
            RestClient client = node.CreateClient();

            // Get the identity, if it exists.
            var request = new RestRequest($"/identity/{address}");
            request.AddJsonBody(document);
            IRestResponse<string> response = client.Delete<string>(request);

            if (response.StatusCode != System.Net.HttpStatusCode.OK)
            {
                throw new ApplicationException(response.ErrorMessage);
            }

            return Ok(response.Content);
        }
    }
}
