using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Abp.Authorization;
using Abp.Authorization.Users;
using Abp.Configuration;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using Abp.Organizations;
using Abp.Runtime.Caching;
using HC.WeChat.Authorization.Roles;

namespace HC.WeChat.Authorization.Users
{
    public class UserManager : AbpUserManager<Role, User>
    {
        private readonly IRepository<User, long> _userRepository;
        public UserManager(
            RoleManager roleManager,
            UserStore store, 
            IOptions<IdentityOptions> optionsAccessor, 
            IPasswordHasher<User> passwordHasher, 
            IEnumerable<IUserValidator<User>> userValidators, 
            IEnumerable<IPasswordValidator<User>> passwordValidators,
            ILookupNormalizer keyNormalizer, 
            IdentityErrorDescriber errors, 
            IServiceProvider services, 
            ILogger<UserManager<User>> logger, 
            IPermissionManager permissionManager, 
            IUnitOfWorkManager unitOfWorkManager, 
            ICacheManager cacheManager, 
            IRepository<OrganizationUnit, long> organizationUnitRepository, 
            IRepository<UserOrganizationUnit, long> userOrganizationUnitRepository, 
            IOrganizationUnitSettings organizationUnitSettings, 
            ISettingManager settingManager,
            IRepository<User, long> userRepository)
            : base(
                roleManager, 
                store, 
                optionsAccessor, 
                passwordHasher, 
                userValidators, 
                passwordValidators, 
                keyNormalizer, 
                errors, 
                services, 
                logger, 
                permissionManager, 
                unitOfWorkManager, 
                cacheManager,
                organizationUnitRepository, 
                userOrganizationUnitRepository, 
                organizationUnitSettings, 
                settingManager)
        {
            _userRepository = userRepository;
        }

        /// <summary>
        /// 获取当前用户的过滤员工Id admin和营销中心为null，客户经理返回为员工Id，其它返回一个新Id做过滤
        /// </summary>
        /// <returns></returns>
        public Guid? GetControlEmployeeId()
        {
            if (!AbpSession.UserId.HasValue)
            {
                return Guid.NewGuid();
            }
            var user = _userRepository.Get(AbpSession.UserId.Value);
            var roles = GetRolesAsync(user).Result;
            //如果是管理员 或 营销中心
            if (roles.Contains(StaticRoleNames.Tenants.Admin) || roles.Contains(StaticRoleNames.Tenants.MarketingCenter))
            {
                return null;
            }
            if (user.EmployeeId.HasValue)
            {
                return user.EmployeeId;
            }
            else
            {
                return Guid.NewGuid();
            }
        }
    }
}
