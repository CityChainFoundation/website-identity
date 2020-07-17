using Microsoft.Extensions.Configuration;
using RestSharp;
using RestSharp.Serializers.NewtonsoftJson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace City.Chain.Identity.Website.Services
{
    public class NodeService
    {
        private string nodeApiKey;

        public NodeService(IConfiguration configuration)
        {
            nodeApiKey = configuration.GetValue<string>("NodeApiKey");
        }

        public RestClient CreateClient()
        {
            var client = new RestClient($"http://localhost:4335/api");
            client.UseNewtonsoftJson();
            client.CachePolicy = new System.Net.Cache.RequestCachePolicy(System.Net.Cache.RequestCacheLevel.NoCacheNoStore);
            client.AddDefaultHeader("Node-Api-Key", nodeApiKey);

            return client;
        }
    }
}
