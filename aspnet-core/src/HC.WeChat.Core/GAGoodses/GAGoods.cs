using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace HC.WeChat.GAGoodses
{
    [Table("GA_Goods")]
    public class GAGoods : Entity<int>
    {
        [StringLength(50)]
        public virtual string ITEM_ID { get; set; }
        [StringLength(50)]
        public virtual string ITEM_CODE { get; set; }
        [StringLength(100)]
        public virtual string ITEM_NAME { get; set; }
        public virtual decimal? PFJ { get; set; }
        public virtual decimal? LSJ { get; set; }
        public virtual int? SPLB { get; set; }
        public virtual int? UM_SIZE { get; set; }
        public virtual string brand_id { get; set; }
        public virtual string MFR_ID1 { get; set; }
        public virtual string txm { get; set; }
        public virtual string zxbz { get; set; }
        public virtual string jqxx { get; set; }
        public virtual string spxlmc { get; set; }
        public virtual string gys { get; set; }
        public virtual string owner { get; set; }
        public virtual decimal? point { get; set; }
        public virtual string img_url { get; set; }
        public virtual int? bzxs { get; set; }
        public virtual string bzxs_des { get; set; }
        public virtual string splb_des { get; set; }
    }
}
