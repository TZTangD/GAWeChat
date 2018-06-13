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

namespace HC.WeChat.LevelJob
{
    public class UpdateLevelWorker : PeriodicBackgroundWorkerBase, ISingletonDependency
    {
        private readonly IRepository<GACustPoint, Guid> _gacustpointRepository;
        private readonly IRepository<Retailer, Guid> _retailerRepository;
        private readonly IRepository<LevelLog, Guid> _levellogRepository;
        private readonly IRepository<GAGrade, int> _gagradeRepository;
        private DateTime preDate = DateTime.Now.AddDays(-1);//用于控制在合适时间段中只执行一次档级更新

        public UpdateLevelWorker(AbpTimer timer, IRepository<GACustPoint, Guid> gacustpointRepository,
            IRepository<Retailer, Guid> retailerRepository, IRepository<LevelLog, Guid> levellogRepository,
            IRepository<GAGrade, int> gagradeRepository) : base(timer)
        {
            Timer.Period = 180000;
            _gacustpointRepository = gacustpointRepository;
            _retailerRepository = retailerRepository;
            _levellogRepository = levellogRepository;
            _gagradeRepository = gagradeRepository;
        }
        protected override void DoWork()
        {
            var updateStartDate = Convert.ToDateTime(GetDate(0, false) + "-13 17:00");
            var updateEndDate = Convert.ToDateTime(GetDate(0, false) + "-13 19:00");

            if (DateTime.Now >= updateStartDate && updateEndDate >= DateTime.Now && DateTime.Now.AddDays(0) != preDate)
            {
                var isUpdate = _levellogRepository.GetAll().Any(c => c.LevelData == GetDate(-1, false));
                var retails = _retailerRepository.GetAll().ToList();
                if (!isUpdate)
                {
                    for (var i = 0; i < retails.Count; i++)
                    {
                        var mothPoint = _gacustpointRepository.GetAll().Where(c => c.CustId == retails[i].CustId && c.Pmonth == GetDate(-1, false)).SingleOrDefault().Point;
                        var level = _gagradeRepository.GetAll().Where(g => g.StartPoint <= mothPoint).OrderByDescending(g => g.StartPoint).FirstOrDefault();
                        var entity = _retailerRepository.Get(retails[i].Id);
                        retails[i].MapTo(entity);
                        //var entity= ObjectMapper.Map<Retailer>(retails[i])
                        _retailerRepository.Update(entity);
                        preDate = i == retails.Count - 1 ? DateTime.Now.AddDays(0) : preDate;
                    }
                    Logger.InfoFormat("当前更新档级时间：{0}", DateTime.Now);
                }
            }

        }
        public string GetDate(int span, bool isDay)
        {
            var year = DateTime.Now.AddMonths(-span).Year.ToString();
            if (DateTime.Now.AddMonths(-span).Month < 10)
            {
                if (isDay)
                {
                    return year + "0" + DateTime.Now.AddMonths(-span).Month.ToString() + "01";
                }
                else
                {
                    return year + "0" + DateTime.Now.AddMonths(-span).Month.ToString();
                }
            }
            else
            {
                if (isDay)
                {
                    return year + DateTime.Now.AddMonths(-span).Month.ToString() + "01";
                }
                else
                {
                    return year + DateTime.Now.AddMonths(-span).Month.ToString();
                }
            }
        }
    }

}
