using HC.WeChat.ActivityBanquets.Dtos;
using Senparc.Weixin.MP.Helpers;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace HC.WeChat.Models.WeChat
{
    public class ActivityBanquetModel
    {
        public ActivityBanquetModel()
        {
        }
        public JsSdkUiPackage JsSdkApiConfig { get; set; }

        public ActivityBanquetWeChatDto BanquetWeChat { get; set; }

        public List<string> PhotoUrls
        {
            get
            {
                if (BanquetWeChat != null && BanquetWeChat.PhotoUrl != null)
                {
                    var srcs = BanquetWeChat.PhotoUrl.Split(',');
                    return srcs.ToList();
                }
                return new List<string>();
            }
        }
    }
}
