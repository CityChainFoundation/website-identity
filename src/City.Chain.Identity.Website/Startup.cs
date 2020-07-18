using AspNetCore.Proxy;
using City.Chain.Identity.Website.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using System;

namespace City.Chain.Identity.Website
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();

            services.AddProxies();

            services.AddSingleton<NodeService>();

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });

            services.AddSwaggerGen(
                options =>
                {
                    string assemblyVersion = typeof(Startup).Assembly.GetName().Version.ToString();

                    options.SwaggerDoc("indexer",
                               new OpenApiInfo
                               {
                                   Title = "City Chain Identity API",
                                   Version = assemblyVersion,
                                   Description = ".",
                                   Contact = new OpenApiContact
                                   {
                                       Name = "City Chain Identity",
                                       Url = new Uri("https://identity.city-chain.org/")
                                   }
                               });

                    //if (File.Exists(XmlCommentsFilePath))
                    //{
                    //    options.IncludeXmlComments(XmlCommentsFilePath);
                    //}

                    options.DescribeAllEnumsAsStrings();

                    options.DescribeStringEnumsInCamelCase();

                    options.EnableAnnotations();
                });

            services.AddSwaggerGenNewtonsoftSupport(); // explicit opt-in - needs to be placed after AddSwaggerGen()
        }


        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }

            app.UseStaticFiles();

            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();

            app.UseSwagger(c =>
            {
                c.RouteTemplate = "docs/{documentName}/openapi.json";
            });

            app.UseSwaggerUI(c =>
            {
                c.RoutePrefix = "docs";
                c.SwaggerEndpoint("/docs/indexer/openapi.json", "City Chain Identity API");
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
