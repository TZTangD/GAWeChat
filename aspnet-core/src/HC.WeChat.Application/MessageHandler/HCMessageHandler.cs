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

        /// <summary>
        /// 返回图文消息主体
        /// </summary>
        ///
        public static string Message_News_Main
        {
            get
            {
                return @"<xml>
    <ToUserName><![CDATA[{0}]]></ToUserName>
    <FromUserName><![CDATA[{1}]]></FromUserName>
    <CreateTime>{2}</CreateTime>
    <MsgType><![CDATA[news]]></MsgType>
    <ArticleCount>{3}</ArticleCount>
    <Articles>
    {4}
    </Articles>
    </xml> ";
            }
        }
        /// <summary>
        /// 发送关注时的图文消息
        /// </summary>
        /// <param name="requestXML"></param>
        private void SendWelComeMsg(RequestXML requestXML)
        {
            String responseContent = String.Empty;

            string newdate = DateTime.Now.Subtract(new DateTime(1970, 1, 1, 8, 0, 0)).TotalSeconds.ToString();

            //图片的链接地址
            string PUrlfileName = "http://mmbiz.qpic.cn/mmbiz/7iaiaRJE9s3HAbvxtjqbE85wqmektib1xnwdl8dniaFuK5BMnVhehWzTlK2zW0YVzFfLKjexQfgj12SJcwicGSFOyvw/640?wx_fmt=jpeg&wxfrom=5";

            responseContent = string.Format(ResponseXMl.Message_News_Main, requestXML.FromUserName, requestXML.ToUserName, newdate, "1",

           //参数分别代表发送图文的标题，简介，以及图文的链接地址
           string.Format(ResponseXMl.Message_News_Item, "欢迎关注我的测试号", "2016年新的机遇和挑战...", PUrlfileName, "http://mp.weixin.qq.com/s?__biz=MzA4NjIwMTg5Nw==&tempkey=1D1FlQbenM0RdbGL7jPebIYV7OWGdyEY8DClNjaJHJ3yoGh1t3KfoVvK2FGXjgeuTMemMzu4GASlT2p4yyPT4oZp8bVWH1kF3BxYJGHGHnPpcr%2Bb8zdejjshCRSr8V18HPS9gh%2Fa0wKarCp%2B2mYOEA%3D%3D&#rd"));


            HttpContext.Current.Response.ContentType = "text/xml";
            HttpContext.Current.Response.ContentEncoding = Encoding.UTF8;
            HttpContext.Current.Response.Write(responseContent);
            HttpContext.Current.Response.End();
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
                        {
                            SendWelComeMsg(requestXML);//关注时返回的图文消息
                            //string url = host + "/GAWX/Authorization?page=304&param=" + Id.ToString();
                            MessageInfo.Url = "<a href='wwww.baidu.com'>渠江烟语操作指南</a>";
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
    }
}
