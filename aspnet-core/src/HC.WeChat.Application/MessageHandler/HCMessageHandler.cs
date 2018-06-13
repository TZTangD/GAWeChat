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

        //private int? _tenantId = 0;
        private int? _tenantId;


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

        /// <summary>
        /// 订阅（关注）事件
        /// </summary>
        public override IResponseMessageBase OnEvent_SubscribeRequest(RequestMessageEvent_Subscribe requestMessage)
        {
            try
            {
                if (MessageInfo == null)
                {
                    return new SuccessResponseMessage();
                }
                var sinfo = GetWechatSubscribe();
                if (sinfo != null)
                {
                    if (sinfo.MsgType == WechatEnums.MsgTypeEnum.文字消息)
                {
                    var responseMessage = ResponseMessageBase.CreateFromRequestMessage<ResponseMessageText>(requestMessage);
                    responseMessage.Content = MessageInfo.SubscribeMsg;
                    Subscribe(requestMessage);
                    return responseMessage;
                }
                else
                {
                    var responseMessagePic = ResponseMessageBase.CreateFromRequestMessage<ResponseMessageNews>(requestMessage);
                    responseMessagePic.ArticleCount = 1;
                    responseMessagePic.Articles.Add(GetPicSubscribe());
                    Subscribe(requestMessage);
                    return responseMessagePic;
                }
            }
                return null;
            ////var responseMessage = ResponseMessageBase.CreateFromRequestMessage<ResponseMessageText>(requestMessage);
            ////responseMessage.Content = MessageInfo.SubscribeMsg;
            ////修改成图文消息
            //var responseMessage = ResponseMessageBase.CreateFromRequestMessage<ResponseMessageNews>(requestMessage);
            //responseMessage.ArticleCount = 1;
            //responseMessage.Articles.Add(GetPicSubscribe());
            ////关注消息
            //Subscribe(requestMessage);
            //return responseMessage;
        }
            catch (Exception ex)
            {
                Logger.ErrorFormat("微信关注推送消息失败 error：{0} Exception：{1}", ex.Message, ex);
                return null;
            }
        }

        /// <summary>
        /// 从数据库中获取图文配置
        /// </summary>
        /// <returns></returns>
        public virtual Article GetPicSubscribe()
        {
            //var subscribe = _wechatsubscribeRepository.GetAll().FirstOrDefault();
            var subscribe = GetWechatSubscribe();
            return new Article()
            {
                Title = subscribe.Title,
                Description = subscribe.Desc,
                PicUrl = subscribe.PicLink,
                Url = subscribe.Content
            };
        }
    }
}
