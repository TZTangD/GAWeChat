using System.ComponentModel.DataAnnotations;
using Abp.Application.Services.Dto;
using HC.WeChat.WechatAppConfigs;

namespace HC.WeChat.Dto
{
    public class PagedInputDto : IPagedResultRequest
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        [Range(1, AppConsts.MaxPageSize)]
        public int MaxResultCount { get; set; }

        [Range(0, int.MaxValue)]
        public int SkipCount { get; set; }

        public PagedInputDto()
        {
            MaxResultCount = AppConsts.DefaultPageSize;
        }
    }
}