using Abp.Application.Services;
using Senparc.Weixin.MP.Entities.Request;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace HC.WeChat.MessageHandler
{
    public interface IMessageHandlerAppServer : IApplicationService
    {
        Task<string> MessageHandler(PostModel postModel, Stream msgStream, int? tenantId);
    }
}
