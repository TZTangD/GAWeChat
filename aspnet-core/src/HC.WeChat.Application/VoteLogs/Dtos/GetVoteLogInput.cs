using System;
using Abp.Runtime.Validation;
using HC.WeChat.Dto;
using HC.WeChat.VoteLogs;

namespace HC.WeChat.VoteLogs.Dtos
{ 
    public class GetVoteLogsInput : PagedAndSortedInputDto, IShouldNormalize
    {
        /// <summary>
        /// 模糊搜索使用的关键字
        /// </summary>
        public string Filter { get; set; }

        /// <summary>
        /// 正常化排序使用
        /// </summary>
        public void Normalize()
        {
            if (string.IsNullOrEmpty(Sorting))
            {
                Sorting = "Id";
            }
        }
    }
}
