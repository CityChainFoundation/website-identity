using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using City.Chain.Identity.Website.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace City.Chain.Identity.Website.Controllers
{
    [ApiController]
    [Route("api/registry")]
    public class RegistryController : ControllerBase
    {
        private readonly NodeService node;

        public RegistryController(NodeService node)
        {
            this.node = node;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok();
        }
    }
}
