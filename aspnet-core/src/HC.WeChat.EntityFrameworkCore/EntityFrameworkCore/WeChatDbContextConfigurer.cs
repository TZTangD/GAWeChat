using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace HC.WeChat.EntityFrameworkCore
{
    public static class WeChatDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<WeChatDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString, option => option.UseRowNumberForPaging() );
            //builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<WeChatDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection, option => option.UseRowNumberForPaging());
            //builder.UseSqlServer(connection);
        }
    }
}
