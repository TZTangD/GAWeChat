/*----------------------------------------------------------------
    Copyright (C) 2018 Senparc

    文件名：CustomMessageHandler.cs
    文件功能描述：微信公众号自定义MessageHandler


    创建标识：Senparc - 20150312

    修改标识：Senparc - 20171027
    修改描述：v14.8.3 添加OnUnknownTypeRequest()方法Demo

----------------------------------------------------------------*/

using System.Collections.Generic;
using System.IO;
using System.Linq;
using Senparc.Weixin.MP.Entities;
using Senparc.Weixin.MP.Entities.Request;
using Senparc.Weixin.MP.MessageHandlers;
using Senparc.Weixin.MP.Helpers;
using Senparc.Weixin.Entities.Request;
using Senparc.Weixin;
using System;
using System.Threading.Tasks;

namespace Abp.WeChat.Senparc.MessageHandlers
{
    /// <summary>
    /// 自定义MessageHandler
    /// 把MessageHandler作为基类，重写对应请求的处理方法
    /// </summary>
    public abstract class AbpMessageHandler : MessageHandler<AbpMessageContext>
    {
        public string appId = "appId";
        //private string appSecret = "appSecret";

        public AbpMessageInfo MessageInfo { get; set; }

        public abstract void Subscribe(RequestMessageEvent_Subscribe requestMessage);
        /// <summary>
        /// 取消关注
        /// </summary>
        public abstract void Unsubscribe(RequestMessageEvent_Unsubscribe requestMessage);
        /// <summary>
        /// 设置用户信息
        /// </summary>
        public abstract void ConfigurationMessageInfo(RequestMessageText requestMessage);


        public AbpMessageHandler(Stream inputStream, PostModel postModel, int maxRecordCount = 0)
            : base(inputStream, postModel, maxRecordCount)
        {
            //这里设置仅用于测试，实际开发可以在外部更全局的地方设置，
            //比如MessageHandler<MessageContext>.GlobalWeixinContext.ExpireMinutes = 3。
            WeixinContext.ExpireMinutes = 3;

            if (!string.IsNullOrEmpty(postModel.AppId))
            {
                appId = postModel.AppId;//通过第三方开放平台发送过来的请求
            }

            //在指定条件下，不使用消息去重
            base.OmitRepeatedMessageFunc = requestMessage =>
            {
                var textRequestMessage = requestMessage as RequestMessageText;
                if (textRequestMessage != null && textRequestMessage.Content == "容错")
                {
                    return false;
                }
                return true;
            };
        }

        public AbpMessageHandler(RequestMessageBase requestMessage)
            : base(requestMessage)
        {
        }

        public override void OnExecuting()
        {
            if (CurrentMessageContext.StorageData == null)
            {
                CurrentMessageContext.StorageData = 0;
            }
            base.OnExecuting();
        }

        public override void OnExecuted()
        {
            base.OnExecuted();
            CurrentMessageContext.StorageData = ((int)CurrentMessageContext.StorageData) + 1;
        }

        /// <summary>
        /// 处理文字请求
        /// </summary>
        /// <returns></returns>
        public override IResponseMessageBase OnTextRequest(RequestMessageText requestMessage)
        {
            //说明：实际项目中这里的逻辑可以交给Service处理具体信息，参考OnLocationRequest方法或/Service/LocationSercice.cs
            var defaultResponseMessage = base.CreateResponseMessage<ResponseMessageText>();

            var requestHandler = requestMessage.StartHandler();
                
            foreach (var item in this.MessageInfo.KeyWords)
            {
                if (item.Key == "默认")
                {
                    requestHandler.Default(() =>
                    {
                        var responseMessage = this.CreateResponseMessage<ResponseMessageText>();
                        responseMessage.Content = this.MessageInfo.KeyWords["默认"];
                        return responseMessage;
                    });
                }
                else
                {
                    //如果有逗号表示数组
                    if (item.Key.Contains(','))
                    {
                        requestHandler.Keywords(item.Key.Split(','), () =>
                        {
                            var responseMessage = this.CreateResponseMessage<ResponseMessageText>();
                            responseMessage.Content = item.Value;
                            return responseMessage;
                        });
                    }
                    //表示关键字
                    else
                    {
                        requestHandler.Keyword(item.Key, () =>
                        {
                            var responseMessage = this.CreateResponseMessage<ResponseMessageText>();
                            responseMessage.Content = item.Value;
                            return responseMessage;
                        });
                    }
                }
            }

            return requestHandler.GetResponseMessage() as IResponseMessageBase;
        }

        public override IResponseMessageBase DefaultResponseMessage(IRequestMessageBase requestMessage)
        {
            /* 所有没有被处理的消息会默认返回这里的结果，
            * 因此，如果想把整个微信请求委托出去（例如需要使用分布式或从其他服务器获取请求），
            * 只需要在这里统一发出委托请求，如：
            * var responseMessage = MessageAgent.RequestResponseMessage(agentUrl, agentToken, RequestDocument.ToString());
            * return responseMessage;
            */
            if (this.MessageInfo.KeyWords.Keys.Contains("默认"))
            {
                var responseMessage = this.CreateResponseMessage<ResponseMessageText>();
                responseMessage.Content = this.MessageInfo.KeyWords["默认"];
                return responseMessage;
            }
            return new SuccessResponseMessage();
        }


        public override IResponseMessageBase OnUnknownTypeRequest(RequestMessageUnknownType requestMessage)
        {
            /*
             * 此方法用于应急处理SDK没有提供的消息类型，
             * 原始XML可以通过requestMessage.RequestDocument（或this.RequestDocument）获取到。
             * 如果不重写此方法，遇到未知的请求类型将会抛出异常（v14.8.3 之前的版本就是这么做的）
             */
            var msgType = MsgTypeHelper.GetRequestMsgTypeString(requestMessage.RequestDocument);
            var responseMessage = this.CreateResponseMessage<ResponseMessageText>();
            responseMessage.Content = "未知消息类型：" + msgType;

            WeixinTrace.SendCustomLog("未知请求消息类型", requestMessage.RequestDocument.ToString());//记录到日志中

            return responseMessage;
        }

        /// <summary>
        /// 订阅（关注）事件
        /// </summary>
        /// <returns></returns>
        public override IResponseMessageBase OnEvent_SubscribeRequest(RequestMessageEvent_Subscribe requestMessage)
        {
            if (MessageInfo == null)
            {
                return new SuccessResponseMessage();
            }
            var responseMessage = ResponseMessageBase.CreateFromRequestMessage<ResponseMessageText>(requestMessage);
            responseMessage.Content = MessageInfo.SubscribeMsg;
            //关注消息
            Subscribe(requestMessage);
            return responseMessage;
        }

        public override IResponseMessageBase OnEvent_UnsubscribeRequest(RequestMessageEvent_Unsubscribe requestMessage)
        {
            //取消关注
            Unsubscribe(requestMessage);
            return base.OnEvent_UnsubscribeRequest(requestMessage);
        }

        public override IResponseMessageBase OnTextOrEventRequest(RequestMessageText requestMessage)
        {
            // 预处理文字或事件类型请求。
            // 这个请求是一个比较特殊的请求，通常用于统一处理来自文字或菜单按钮的同一个执行逻辑，
            // 会在执行OnTextRequest或OnEventRequest之前触发，具有以下一些特征：
            // 1、如果返回null，则继续执行OnTextRequest或OnEventRequest
            // 2、如果返回不为null，则终止执行OnTextRequest或OnEventRequest，返回最终ResponseMessage
            // 3、如果是事件，则会将RequestMessageEvent自动转为RequestMessageText类型，其中RequestMessageText.Content就是RequestMessageEvent.EventKey
            //重置消息
            ConfigurationMessageInfo(requestMessage);
            return null;//返回null，则继续执行OnTextRequest或OnEventRequest
        }

        public override Task<IResponseMessageBase> OnEvent_ClickRequestAsync(RequestMessageEvent_Click requestMessage)
        {
            return Task.Factory.StartNew(() =>
            {
                var syncResponseMessage = OnEvent_ClickRequest(requestMessage);//这里为了保持Demo的连贯性，结果先从同步方法获取，实际使用过程中可以全部直接定义异步方法
                //常识获取Click事件的同步方法
                if (syncResponseMessage is ResponseMessageText)
                {
                    var textResponseMessage = syncResponseMessage as ResponseMessageText;
                    textResponseMessage.Content += "\r\n\r\n  -- 来自【异步MessageHandler】的回复";
                }

                return syncResponseMessage;
            });
        }
    }
}
