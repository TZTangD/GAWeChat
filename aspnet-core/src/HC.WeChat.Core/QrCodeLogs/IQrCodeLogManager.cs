using System;
using System.Threading.Tasks;
using Abp;
using Abp.Domain.Services;
using HC.WeChat.QrCodeLogs;


namespace HC.WeChat.QrCodeLogs.DomainServices
{
    public interface IQrCodeLogManager : IDomainService
    {
        
        /// <summary>
        /// 初始化方法
        /// </summary>
        void InitQrCodeLog();



    }
}
