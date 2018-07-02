using System;
using System.Threading.Tasks;
using Abp;
using Abp.Domain.Services;
using HC.WeChat.Exhibitions;


namespace HC.WeChat.Exhibitions.DomainServices
{
    public interface IExhibitionManager : IDomainService
    {
        
        /// <summary>
        /// 初始化方法
        /// </summary>
        void InitExhibition();



    }
}
