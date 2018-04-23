using System;
using System.Collections.Generic;
using System.Text;

namespace HC.WeChat.WechatEnums
{
    public enum MsgTypeEnum
    {
        文字消息 = 1,
        图文消息 = 2
    }
    /// <summary>
    /// 匹配模式
    /// </summary>
    public enum MatchModeEnum
    {
        精准匹配 = 1,
        模糊匹配 = 2
    }
    /// <summary>
    /// 微信类型
    /// </summary>
    public enum AppTypeEnum
    {
        订阅号 = 1,
        认证订阅号 = 2,
        服务号=3,
        认证服务号=4
    }

    /// <summary>
    /// 活动状态
    /// </summary>
    public enum ActivityStatusEnum
    {
        草稿 = 1,
        已发布 = 2,
        已下架=3
    }

    /// <summary>
    /// 表单状态
    /// </summary>
    public enum FormStatusEnum
    {
        提交申请 = 1,
        初审通过 = 2,
        拒绝 = 3,
        资料回传已审核 = 4,
        取消 = 5,
        营销中心已审核 = 6
    }

    /// <summary>
    /// 用户类型
    /// </summary>
    public enum UserTypeEnum
    {
        零售客户 = 1,
        客户经理 = 2,
        营销人员 = 3,
        消费者 = 4,
        取消关注 = 5,
        营销中心 = 6
    }

    /// <summary>
    /// 订货方式
    /// </summary>
    public enum OrderModeEnum
    {
        无 = 0,
        网上订货 = 1,
        电话订货 = 2,
        手机 = 3
    }

    /// <summary>
    /// 终端
    /// </summary>
    public enum TerminalTypeEnum
    {
        无 = 0,
        建议终端 = 1,
        普通终端 = 2,
        现代终端 = 3
    }

    /// <summary>
    /// 经营规模
    /// </summary>
    public enum ScaleEnum
    {
        小 = 1,
        中 = 2,
        大 = 3
    }

    /// <summary>
    /// 市场类型
    /// </summary>
    public enum MarketTypeEnum
    {
        无 = 0,
        乡村 = 1,
        城镇 = 2
    }

    /// <summary>
    /// 绑定状态
    /// </summary>
    public enum BindStatusEnum
    {
        未绑定 = 0,
        已绑定 = 1
    }

    /// <summary>
    /// 活动类型
    /// </summary>
    public enum ActivityTypeEnum
    {
        办事用烟 = 1
    }
    /// <summary>
    /// 收货人类型
    /// </summary>
    public enum DeliveryUserTypeEnum
    {
        消费者 = 1,
        推荐人 = 2
    }
}
