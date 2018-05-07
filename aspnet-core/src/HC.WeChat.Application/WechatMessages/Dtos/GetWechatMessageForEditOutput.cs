using System.Collections.Generic;
using Abp.Application.Services.Dto;
using HC.WeChat.WechatMessages;

namespace HC.WeChat.WechatMessages.Dtos
{
    public class GetWechatMessageForEditOutput
{
////BCC/ BEGIN CUSTOM CODE SECTION
////ECC/ END CUSTOM CODE SECTION
        public WechatMessageEditDto WechatMessage { get; set; }

}
}