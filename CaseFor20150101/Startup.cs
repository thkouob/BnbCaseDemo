using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(CaseFor20150101.Startup))]
namespace CaseFor20150101
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
