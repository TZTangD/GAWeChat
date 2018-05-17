using System.ComponentModel.DataAnnotations;
using HC.WeChat.GAGoodss.Dtos.LTMAutoMapper;
using HC.WeChat.GAGoodses;

namespace HC.WeChat.GAGoodss.Dtos
{
    public class GAGoodsEditDto
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public int? Id { get; set; }
        [StringLength(50)]
        public string ITEM_ID { get; set; }
        [StringLength(50)]
        public string ITEM_CODE { get; set; }
        [StringLength(100)]
        public string ITEM_NAME { get; set; }
        public decimal? PFJ { get; set; }
        public decimal? LSJ { get; set; }
        public int? SPLB { get; set; }
        public int? UM_SIZE { get; set; }
        public string brand_id { get; set; }
        public string MFR_ID1 { get; set; }
        public string txm { get; set; }
        public string zxbz { get; set; }
        public string jqxx { get; set; }
        public string spxlmc { get; set; }
        public string gys { get; set; }
        public string owner { get; set; }
        public decimal? point { get; set; }
        public string img_url { get; set; }
        public int? bzxs { get; set; }
        public string bzxs_des { get; set; }
        public string splb_des { get; set; }
    }
}