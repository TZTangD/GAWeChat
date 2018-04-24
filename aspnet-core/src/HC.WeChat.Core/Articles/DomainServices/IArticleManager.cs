using System;
using System.Threading.Tasks;
using Abp;
using Abp.Domain.Services;
using HC.WeChat.Articles;

namespace HC.WeChat.Articles.DomainServices
{
    public interface IArticleManager : IDomainService
    {

        /// <summary>
        /// 初始化方法
        /// </summary>
        void InitArticle();

    }
}
