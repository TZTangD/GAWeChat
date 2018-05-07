using Abp.Domain.Repositories;
using Abp.WeChat.Senparc.MessageHandlers;
using Castle.Core.Logging;
using HC.WeChat.WechatAppConfigs;
using HC.WeChat.WechatMessages;
using HC.WeChat.WechatSubscribes;
using HC.WeChat.WeChatUsers;
using HC.WeChat.WeChatUsers.DomainServices;
using Senparc.Weixin.MP.Entities;
using Senparc.Weixin.MP.Entities.Request;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace HC.WeChat.MessageHandler
{
    public class HCMessageHandler : AbpMessageHandler
    {
        private readonly IRepository<WechatMessage, Guid> _wechatmessageRepository;
        private readonly IRepository<WechatSubscribe, Guid> _wechatsubscribeRepository;
        private readonly IWeChatUserManager _wechatUserManager;
        public ILogger Logger { protected get; set; }

        private int? _tenantId = 0;

        public HCMessageHandler(IRepository<WechatMessage, Guid> wechatmessageRepository, 
            IRepository<WechatSubscribe, Guid> wechatsubscribeRepository,
            IWeChatUserManager wechatUserManager,
            int? tenantId, Stream inputStream, 
            PostModel postModel, 
            int maxRecordCount = 0) : base(inputStream, postModel, maxRecordCount)
        {
            _wechatmessageRepository = wechatmessageRepository;
            _wechatsubscribeRepository = wechatsubscribeRepository;
            _wechatUserManager = wechatUserManager;
            Logger = NullLogger.Instance;
            _tenantId = tenantId;
        }

        private WechatSubscribe GetWechatSubscribe()
        {
            return _wechatsubscribeRepository.GetAll().Where(w => w.TenantId == _tenantId).FirstOrDefault();
        }

        private List<WechatMessage> GetWechatMessageList()
        {
            
            //先处理文字消息
            return _wechatmessageRepository.GetAll().Where(w => w.TenantId == _tenantId && w.MsgType == WechatEnums.MsgTypeEnum.文字消息).ToList();
        }

        public override void ConfigurationMessageInfo(RequestMessageText requestMessage)
        {
            MessageInfo = new AbpMessageInfo();
            MessageInfo.KeyWords = new Dictionary<string, string>();
            var keyWordList = GetWechatMessageList();
            if (keyWordList.Count > 0)
            {
                MessageInfo.KeyWords = keyWordList.ToDictionary(key => key.KeyWord, value => value.Content);
            }

            var sinfo = GetWechatSubscribe();
            if (sinfo != null)
            {
                switch (sinfo.MsgType)
                {
                    case WechatEnums.MsgTypeEnum.文字消息:
                        {
                            MessageInfo.SubscribeMsg = sinfo.Content;
                        }
                        break;
                    case WechatEnums.MsgTypeEnum.图文消息:
                        break;
                    default:
                        break;
                }    
            }
        }

        public override void Unsubscribe(RequestMessageEvent_Unsubscribe requestMessage)
        {
            Logger.InfoFormat("取消关注:{0}", requestMessage);
            //取消关注
            _wechatUserManager.UnsubscribeAsync(requestMessage.FromUserName, _tenantId);
        }

        public override void Subscribe(RequestMessageEvent_Subscribe requestMessage)
        {
            Logger.InfoFormat("关注:{0}", requestMessage);
            //获取微信用户信息
            var wechatUser = Senparc.Weixin.MP.AdvancedAPIs.UserApi.Info(appId, requestMessage.FromUserName);

            Logger.InfoFormat("关注用户:{0}", wechatUser);
            //关注公众号
            _wechatUserManager.SubscribeAsync(requestMessage.FromUserName, wechatUser.nickname, wechatUser.headimgurl, _tenantId);
        }
    }
}
