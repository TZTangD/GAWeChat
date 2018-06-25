using System.ComponentModel.DataAnnotations;
using HC.WeChat.UserAddresss.Dtos.LTMAutoMapper;
using HC.WeChat.UserAddresss;
using System.Collections.Generic;
using Abp.Application.Services.Dto;
using System;

namespace HC.WeChat.UserAddresss.Dtos
{
    public class UserAddressEditDto: FullAuditedEntityDto<Guid?>
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        //public Guid? Id { get; set; }
        public Guid? UserId { get; set; }


        /// <summary>
        /// 收货人姓名
        /// </summary>
        [Required]
        [StringLength(50)]
        public string Name { get; set; }


        /// <summary>
        /// 收货人电话
        /// </summary>
        [Required]
        [StringLength(20)]
        public string Phone { get; set; }


        /// <summary>
        /// 详细收货地址
        /// </summary>
        [Required]
        [StringLength(500)]
        public string Address { get; set; }
        public bool? IsDefault { get; set; }


        /// <summary>
        /// 备注
        /// </summary>
        [StringLength(500)]
        public string Remark { get; set; }
        public int? TenantId { get; set; }
    }
}