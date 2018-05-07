using System;
using System.Collections.Generic;
using System.Text;

namespace HC.WeChat.ActivityForms.Dtos
{
  public  class ActivityFormForWechat
    {
        /// <summary>
        /// 活动申请单列表
        /// </summary>
        public List<ActivityFormListDto> ActivityFormListDtos { get; set; }
        /// <summary>
        ///单数
        /// </summary>
        public int Count { get; set; }
        /// <summary>
        /// OpenId
        /// </summary>
        public string OpenId { get; set; }
    }
}
