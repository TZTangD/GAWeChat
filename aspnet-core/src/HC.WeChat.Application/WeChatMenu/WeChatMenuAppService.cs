using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Abp.Authorization;
using HC.WeChat.Authorization;
using HC.WeChat.Dto;
using HC.WeChat.WechatAppConfigs;
using HC.WeChat.WechatAppConfigs.Dtos;
using Senparc.Weixin.Entities;
using Senparc.Weixin.MP;
using Senparc.Weixin.MP.CommonAPIs;
using Senparc.Weixin.MP.Containers;
using Senparc.Weixin.MP.Entities;
using Senparc.Weixin.MP.Entities.Menu;

namespace HC.WeChat.WeChatMenu
{
    [AbpAuthorize(AppPermissions.Pages)]
    public class WeChatMenuAppService : WeChatAppServiceBase, IWeChatMenuAppService
    {
        public int? TenantId { get; set; }
        public WechatAppConfigInfo AppConfig { get; set; }

        IWechatAppConfigAppService _wechatAppConfigAppService;
        public WeChatMenuAppService(IWechatAppConfigAppService wechatAppConfigAppService)
        {
            _wechatAppConfigAppService = wechatAppConfigAppService;
            TenantId = 2;
            AppConfig = _wechatAppConfigAppService.GetWechatAppConfig(TenantId).Result;
        }

        public async Task<APIResultDto> CreateMenu(GetMenuResultFull GetMenuResultFull)
        {
            try
            {
                //GetMenuResultFull resultFull = Newtonsoft.Json.JsonConvert.DeserializeObject<GetMenuResultFull>(fullJson);
                //重新整理按钮信息
                WxJsonResult result = null;
                IButtonGroupBase buttonGroup = null;

                buttonGroup = CommonApi.GetMenuFromJsonResult(GetMenuResultFull, new ButtonGroup()).menu;
                var accessToken = await AccessTokenContainer.TryGetAccessTokenAsync(AppConfig.AppId, AppConfig.AppSecret);
                result = CommonApi.CreateMenu(accessToken, buttonGroup);

                return new APIResultDto() { Code = 0, Msg = "上传菜单成功", Data = result };
            }
            catch (Exception ex)
            {
                return new APIResultDto() { Code = 901, Msg = "更新菜单失败", Data = ex.Message };
            }
        }

        public WxJsonResult DeleteMenu(string accessTokenOrAppId)
        {
            throw new NotImplementedException();
        }

        public GetMenuResult GetMenu()
        {
            return CommonApi.GetMenu(AppConfig.AppId);
        }

        public GetMenuResult GetMenuFromJson(string jsonString)
        {
            throw new NotImplementedException();
        }
    }
}
