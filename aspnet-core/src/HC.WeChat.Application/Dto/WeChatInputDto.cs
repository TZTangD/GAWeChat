using System;
using System.Collections.Generic;
using System.Text;

namespace HC.WeChat.Dto
{
    public class WeChatInputDto
    {
        public virtual string OpenId { get; set; }

        public virtual int? TenantId { get; set; }
    }
}
