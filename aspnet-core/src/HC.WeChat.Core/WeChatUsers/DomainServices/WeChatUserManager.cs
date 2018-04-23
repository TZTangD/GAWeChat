using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using Abp.Domain.Uow;
using HC.WeChat.WeChatUsers;

namespace HC.WeChat.WeChatUsers.DomainServices
{
    /// <summary>
    /// WeChatUser领域层的业务管理
    /// </summary>
    public class WeChatUserManager : WeChatDomainServiceBase, IWeChatUserManager
    {
        private readonly IRepository<WeChatUser, Guid> _wechatuserRepository;
        private readonly IUnitOfWorkManager _unitOfWorkManager;
        /// <summary>
        /// WeChatUser的构造方法
        /// </summary>
        public WeChatUserManager(IRepository<WeChatUser, Guid> wechatuserRepository, IUnitOfWorkManager unitOfWorkManager)
        {
            _wechatuserRepository = wechatuserRepository;
            _unitOfWorkManager = unitOfWorkManager;
        }

        /// <summary>
        /// 绑定微信用户
        /// </summary>
        /// <param name="user"></param>
        public async Task BindWeChatUserAsync(WeChatUser user)
        {
            //存在就更新
            if (_wechatuserRepository.GetAll().Any(u => u.Id == user.Id))
            {
                await _wechatuserRepository.UpdateAsync(user);
            }
            else //新增
            {
                await _wechatuserRepository.InsertAsync(user);
            }
        }

        /// <summary>
        /// 获取微信用户
        /// </summary>
        [UnitOfWork]
        public async Task<WeChatUser> GetWeChatUserAsync(string openId, int? tenantId)
        {
            using (_unitOfWorkManager.Current.SetTenantId(tenantId))
            {
                return await Task.FromResult(_wechatuserRepository.GetAll().Where(w => w.TenantId == tenantId && w.OpenId == openId).FirstOrDefault());
            }
        }

        //TODO:编写领域业务代码
        /// <summary>
        ///     初始化
        /// </summary>
        public void InitWeChatUser()
        {
            //throw new NotImplementedException();
        }

        /// <summary>
        /// 微信关注
        /// </summary>
        [UnitOfWork]
        public async Task SubscribeAsync(string openId, string nickName, string headImgUrl, int? tenantId)
        {
            using (_unitOfWorkManager.Current.SetTenantId(tenantId))
            {
                var user = await GetWeChatUserAsync(openId, tenantId);
                if (user != null)
                {
                    user.NickName = nickName;
                    user.UserType = WechatEnums.UserTypeEnum.消费者;
                    user.BindStatus = WechatEnums.BindStatusEnum.未绑定;
                    user.UserId = null;
                    user.UserName = user.NickName;
                    user.BindTime = DateTime.Now;
                    user.HeadImgUrl = headImgUrl;
                    await _wechatuserRepository.UpdateAsync(user);
                }
                else
                {
                    user = new WeChatUser();
                    user.NickName = nickName;
                    user.OpenId = openId;
                    user.TenantId = tenantId;
                    user.UserType = WechatEnums.UserTypeEnum.消费者;
                    user.UserName = nickName;
                    user.HeadImgUrl = headImgUrl;
                    user.BindStatus = WechatEnums.BindStatusEnum.未绑定;
                    await _wechatuserRepository.InsertAsync(user);
                }
            }
        }

        /// <summary>
        /// 解绑微信用户
        /// </summary>
        [UnitOfWork]
        public async Task UnBindWeChatUserAsync(string openId, int? tenantId)
        {
            using (_unitOfWorkManager.Current.SetTenantId(tenantId))
            {
                var user = await GetWeChatUserAsync(openId, tenantId);
                //解绑后变成消费者
                if (user != null)
                {
                    user.UserType = WechatEnums.UserTypeEnum.消费者;
                    user.BindStatus = WechatEnums.BindStatusEnum.未绑定;
                    user.UserId = null;
                    user.UserName = user.NickName;
                    user.UnBindTime = DateTime.Now;
                    await _wechatuserRepository.UpdateAsync(user);
                }
            }
        }

        /// <summary>
        /// 取消关注
        /// </summary>
        [UnitOfWork]
        public async Task UnsubscribeAsync(string openId, int? tenantId)
        {
            using (_unitOfWorkManager.Current.SetTenantId(tenantId))
            {
                var user = await GetWeChatUserAsync(openId, tenantId);
                //解绑后变成消费者
                if (user != null)
                {
                    user.UserType = WechatEnums.UserTypeEnum.取消关注;
                    await _wechatuserRepository.UpdateAsync(user);
                }
            }
        }
    }

}
