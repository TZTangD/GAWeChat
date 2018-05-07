using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using HC.WeChat.Configuration;
using HC.WeChat.Web;

namespace HC.WeChat.EntityFrameworkCore
{
    /* This class is needed to run "dotnet ef ..." commands from command line on development. Not used anywhere else */
    public class WeChatDbContextFactory : IDesignTimeDbContextFactory<WeChatDbContext>
    {
        public WeChatDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<WeChatDbContext>();
            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());

            WeChatDbContextConfigurer.Configure(builder, configuration.GetConnectionString(WeChatConsts.ConnectionStringName));

            return new WeChatDbContext(builder.Options);
        }
    }
}
