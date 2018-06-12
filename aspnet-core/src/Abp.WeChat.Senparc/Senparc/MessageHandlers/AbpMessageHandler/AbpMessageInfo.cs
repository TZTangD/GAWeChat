using System;
using System.Collections.Generic;
using System.Text;

namespace Abp.WeChat.Senparc.MessageHandlers
{
    public class AbpMessageInfo
    {
        public virtual string SubscribeMsg { get; set; }

        public virtual Dictionary<string, string> KeyWords { get; set; }
    }
}
