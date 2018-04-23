using Abp.Application.Services;
using HC.WeChat.Dto;
using Senparc.Weixin;
using Senparc.Weixin.Entities;
using Senparc.Weixin.MP;
using Senparc.Weixin.MP.Entities;
using Senparc.Weixin.MP.Entities.Menu;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace HC.WeChat.WeChatMenu
{
    public interface IWeChatMenuAppService : IApplicationService
    {
        Task<APIResultDto> CreateMenu(GetMenuResultFull fullJson);

        GetMenuResult GetMenuFromJson(string jsonString);

        GetMenuResult GetMenu();

        WxJsonResult DeleteMenu(string accessTokenOrAppId);
    }
}
