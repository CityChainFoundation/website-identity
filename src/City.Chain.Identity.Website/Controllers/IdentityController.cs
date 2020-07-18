using AspNetCore.Proxy;
using AspNetCore.Proxy.Options;
using City.Chain.Identity.Website.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace City.Chain.Identity.Website.Controllers
{
    [ApiController]
    [Route("api/identity")]
    public class IdentityController : ControllerBase
    {
        private readonly NodeService node;
        private HttpProxyOptions options;

        public IdentityController(NodeService node)
        {
            this.node = node;

            options = HttpProxyOptionsBuilder.Instance.WithBeforeSend((c, hrm) =>
            {
                hrm.Headers.Add("Node-Api-Key", node.NodeApiKey); 
                return Task.CompletedTask;
            }).Build();
        }

        /// <summary>
        /// Get the profile of an identity.
        /// </summary>
        /// <param name="address"></param>
        /// <returns></returns>
        [HttpGet("{address}")]
        public Task Get([FromRoute] string address)
        {
            return this.HttpProxyAsync($"{node.NodeApiUrl}/identity/{address}", options);
        }

        /// <summary>
        /// Persist the profile of an identity.
        /// </summary>
        /// <param name="address"></param>
        /// <returns></returns>
        [HttpPut("{address}")]
        public Task PutIdentity([FromRoute] string address)
        {
            return this.HttpProxyAsync($"{node.NodeApiUrl}/identity/{address}", options);
        }

        /// <summary>
        /// Remove the profile of an identity.
        /// </summary>
        /// <param name="address"></param>
        /// <returns></returns>
        [HttpDelete("{address}")]
        public Task DeleteIdentity([FromRoute] string address, [FromBody] string document)
        {
            return this.HttpProxyAsync($"{node.NodeApiUrl}/identity/{address}", options);
        }
    }
}
