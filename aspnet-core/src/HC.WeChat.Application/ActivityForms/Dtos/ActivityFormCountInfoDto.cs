using System;
using System.Collections.Generic;
using System.Text;

namespace HC.WeChat.ActivityForms.Dtos
{
    public class ActivityFormCountInfoDto
    {
        /// <summary>
        /// 申请单总数
        /// </summary>
        public int? IsCheckedCount { get; set; }
        /// <summary>
        /// 已审核申请商品
        /// </summary>
        public int? GoodsCount { get; set; }
        /// <summary>
        /// 未申请申请单
        /// </summary>
        public int? CheckCount { get; set; }
        /// <summary>
        /// 微信关注数
        /// </summary>
        public int? WeiChatAttention { get; set; }
    }
}
