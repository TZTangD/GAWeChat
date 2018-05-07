using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using HC.WeChat.Configuration;

namespace HC.WeChat.Web.Host.Startup
{
    [DependsOn(
       typeof(WeChatWebCoreModule))]
    public class WeChatWebHostModule: AbpModule
    {
        private readonly IHostingEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public WeChatWebHostModule(IHostingEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(WeChatWebHostModule).GetAssembly());
        }
    }
}
