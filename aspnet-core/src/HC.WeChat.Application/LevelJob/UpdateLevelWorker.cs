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

namespace HC.WeChat.LevelJob
{
    public class UpdateLevelWorker : PeriodicBackgroundWorkerBase, ISingletonDependency
    {
        private readonly IRepository<GACustPoint, Guid> _gacustpointRepository;
        private readonly IRepository<Retailer, Guid> _retailerRepository;
        private readonly IRepository<LevelLog, Guid> _levellogRepository;
        private readonly IRepository<GAGrade, int> _gagradeRepository;
        private readonly ILevelLogAppService _levellogService;
        private string  preDate = DateTime.Now.AddDays(-1).ToString("d");//用于控制在合适时间段中只执行一次档级更新(保证只会去数据库去请求一次levellog的存在)

        public UpdateLevelWorker(AbpTimer timer, IRepository<GACustPoint, Guid> gacustpointRepository,
            IRepository<Retailer, Guid> retailerRepository, IRepository<LevelLog, Guid> levellogRepository,
            IRepository<GAGrade, int> gagradeRepository, ILevelLogAppService levellogService) : base(timer)
        {
            Timer.Period = 1800000;
            _gacustpointRepository = gacustpointRepository;
            _retailerRepository = retailerRepository;
            _levellogRepository = levellogRepository;
            _gagradeRepository = gagradeRepository;
            _levellogService = levellogService;
        }
        [UnitOfWork]
        protected override void DoWork()
        {
            Logger.InfoFormat("进入job开始时间：{0}", DateTime.Now);
            var updateStartDate = Convert.ToDateTime(GetDate(0, false,"-") + "-15 2:00:00");
            var updateEndDate = Convert.ToDateTime(GetDate(0, false,"-") + "-15 6:00:00");

            if (DateTime.Now >= updateStartDate && updateEndDate >= DateTime.Now && DateTime.Now.AddDays(0).ToString("d") != preDate)
            {
                var isUpdate = _levellogRepository.GetAll().Any(c => c.LevelData == GetDate(1, false,""));
                if (!isUpdate)
                {
                    var result = UpdateRetail();
                    if (result) {
                        var levelLog = new LevelLog();
                        levelLog.Id = Guid.NewGuid();
                        levelLog.LevelData = GetDate(1, false, "");
                        levelLog.ChangeTime = DateTime.Now;
                        _levellogRepository.Insert(levelLog);
                        preDate = result ? DateTime.Now.AddDays(0).ToString("d") : preDate;
                    }
                    Logger.InfoFormat("当前更新档级时间：{0}", DateTime.Now);
                }
            }
            Logger.InfoFormat("进入job结束时间：{0}", DateTime.Now);
        }
        [UnitOfWork]
        public bool UpdateRetail()
        {
            var retails = _retailerRepository.GetAll().ToList();
            var lastIndex = 0;
            for (var i = 0; i < retails.Count; i++)
            {
                var s = GetDate(1, false, "");
                var mothPointdates = _gacustpointRepository.GetAll().SingleOrDefault(c => c.CustId == retails[i].CustId && c.Pmonth == GetDate(1, false,""));
                var mothPoint = mothPointdates == null ? 0 : mothPointdates.Point;
                var gradLevel = _gagradeRepository.GetAll().Where(g => g.StartPoint <= mothPoint).OrderByDescending(g => g.StartPoint).FirstOrDefault();
                retails[i].ArchivalLevel = gradLevel == null ? "1档" : gradLevel.GradeLevel.ToString() + "档";
                lastIndex = i;
            }
            return lastIndex == retails.Count - 1;

        }
        public string GetDate(int span, bool isDay,string style="")
        {
            var year = DateTime.Now.AddMonths(-span).Year.ToString();
            if (DateTime.Now.AddMonths(-span).Month < 10)
            {
                if (isDay)
                {
                    return year + style+ "0" + DateTime.Now.AddMonths(-span).Month.ToString() + "01";
                }
                else
                {
                    return year + style+ "0" + DateTime.Now.AddMonths(-span).Month.ToString();
                }
            }
            else
            {
                if (isDay)
                {
                    return year + style + DateTime.Now.AddMonths(-span).Month.ToString() + "01";
                }
                else
                {
                    return year + style + DateTime.Now.AddMonths(-span).Month.ToString();
                }
            }
        }
    }

}
