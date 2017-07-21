using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(DeliberateLearning.Startup))]
namespace DeliberateLearning
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
