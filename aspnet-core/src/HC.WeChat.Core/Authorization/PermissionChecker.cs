using Abp.Authorization;
using HC.WeChat.Authorization.Roles;
using HC.WeChat.Authorization.Users;

namespace HC.WeChat.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
