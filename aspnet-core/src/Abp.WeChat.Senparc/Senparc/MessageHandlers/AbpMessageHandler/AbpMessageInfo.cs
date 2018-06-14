using Senparc.Weixin.MP.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Abp.WeChat.Senparc.MessageHandlers
{
    public class AbpMessageInfo
    {
        public virtual string SubscribeMsg { get; set; }
        public virtual string PicLink { get; set; }
        public virtual string Title { get; set; }
        public virtual string Desc { get; set; }

        public virtual Dictionary<string, Article> KeyWordsPic { get; set; }
        public virtual Dictionary<string, string> KeyWords { get; set; }
    }
}
