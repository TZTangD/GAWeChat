using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using HC.WeChat.Authorization;

namespace HC.WeChat
{
    [DependsOn(
        typeof(WeChatCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class WeChatApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<WeChatAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(WeChatApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddProfiles(thisAssembly)
            );
        }
    }
}
