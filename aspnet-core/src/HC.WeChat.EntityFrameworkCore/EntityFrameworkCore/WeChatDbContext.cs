using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using HC.WeChat.Authorization.Roles;
using HC.WeChat.Authorization.Users;
using HC.WeChat.MultiTenancy;
using HC.WeChat.WechatAppConfigs;
using HC.WeChat.WechatMessages;
using HC.WeChat.WechatSubscribes;
using HC.WeChat.Activities;
using HC.WeChat.ActivityBanquets;
using HC.WeChat.ActivityDeliveryInfos;
using HC.WeChat.ActivityForms;
using HC.WeChat.ActivityFormLogs;
using HC.WeChat.ActivityGoodses;
using HC.WeChat.Employees;
using HC.WeChat.Retailers;
using HC.WeChat.WeChatUsers;
using HC.WeChat.Advises;
using HC.WeChat.UserAnswers;
using HC.WeChat.UserQuestions;

namespace HC.WeChat.EntityFrameworkCore
{
    public class WeChatDbContext : AbpZeroDbContext<Tenant, Role, User, WeChatDbContext>
    {
        /* Define a DbSet for each entity of the application */
        
        public WeChatDbContext(DbContextOptions<WeChatDbContext> options)
            : base(options)
        {
        }


        public virtual DbSet<WechatAppConfig> WechatAppConfigs { get; set; }

        public virtual DbSet<WechatMessage> WechatMessages { get; set; }

        public virtual DbSet<WechatSubscribe> WechatSubscribes { get; set; }

        public virtual DbSet<Activity> Activities { get; set; }

        public virtual DbSet<ActivityBanquet> ActivityBanquets { get; set; }

        public virtual DbSet<ActivityDeliveryInfo> ActivityDeliveryInfos { get; set; }

        public virtual DbSet<ActivityForm> ActivityForms { get; set; }

        public virtual DbSet<ActivityFormLog> ActivityFormLogs { get; set; }

        public virtual DbSet<ActivityGoods> ActivityGoodses { get; set; }

        public virtual DbSet<Employee> Employees { get; set; }

        public virtual DbSet<Retailer> Retailers { get; set; }

        public virtual DbSet<WeChatUser> WeChatUsers { get; set; }

        public virtual DbSet<Advise> Advises { get; set; }

        public virtual DbSet<UserAnswer> UserAnswers { get; set; }

        public virtual DbSet<UserQuestion> UserQuestions { get; set; }

    }
}
