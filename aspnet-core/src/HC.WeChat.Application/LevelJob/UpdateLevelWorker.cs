using Abp.Domain.Repositories;
using Abp.Threading.BackgroundWorkers;
using Abp.Threading.Timers;
using HC.WeChat.GACustPoints;
using HC.WeChat.Retailers;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using HC.WeChat.LevelLogs;
using HC.WeChat.GAGrades;
using AutoMapper;
using Abp.AutoMapper;
using Abp.Dependency;
using Abp.Domain.Uow;
using HC.WeChat.Products;

namespace HC.WeChat.LevelJob
{
    public class UpdateLevelWorker : PeriodicBackgroundWorkerBase, ISingletonDependency
    {
        private readonly IProductAppService _productAppService;
        private DateTime preDate = DateTime.Now.AddDays(-1);//用于控制在合适时间段中只执行一次档级更新(保证只会去数据库去请求一次levellog的存在)

        public UpdateLevelWorker(AbpTimer timer,
          IProductAppService productAppService) : base(timer)
        {
            Timer.Period = 3600000;
            //Timer.Period = 10000;
            _productAppService = productAppService;
            //启动日志
            //Logger.InfoFormat("启动job时间：{0}", DateTime.Now);
            //DoWork();
        }
        [UnitOfWork]
        protected override void DoWork()
        {
            Logger.InfoFormat("进入job开始时间：{0}", DateTime.Now);
            var s = DateTime.Today;
            var m = DateTime.Now.AddDays(-1);
            if (DateTime.Now.Day == 3 && DateTime.Now.Hour >= 4 && preDate != DateTime.Today)
            {
                Logger.InfoFormat("执行job逻辑开始时间：{0}", DateTime.Now);
                preDate = DateTime.Today;
                using (CurrentUnitOfWork.DisableFilter(AbpDataFilters.MayHaveTenant))
                {
                    _productAppService.UpdateLevel();
                    CurrentUnitOfWork.SaveChanges();
                }
                Logger.InfoFormat("执行job逻辑结束时间：{0}", DateTime.Now);
            }
        }
    }

}
