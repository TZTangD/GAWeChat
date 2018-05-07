using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace HC.WeChat.ShopProducts
{
    /// <summary>
    /// 店铺特色产品
    /// </summary>
    [Table("ShopProducts")]
    public class ShopProduct : Entity<Guid>
    {

        /// <summary>
        /// 特色产品Id
        /// </summary>
        [Required]
        public virtual Guid ProductId { get; set; }

        /// <summary>
        /// 店铺Id
        /// </summary>
        [Required]
        public virtual Guid ShopId { get; set; }

        /// <summary>
        /// 产品规格快照
        /// </summary>
        [StringLength(200)]
        public virtual string Specification { get; set; }
    }
}
