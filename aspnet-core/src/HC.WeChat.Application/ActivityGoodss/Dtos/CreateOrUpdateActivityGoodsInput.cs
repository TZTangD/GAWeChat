using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HC.WeChat.ActivityGoodses;

namespace HC.WeChat.ActivityGoodses.Dtos
{
    public class CreateOrUpdateActivityGoodsInput
{
////BCC/ BEGIN CUSTOM CODE SECTION
////ECC/ END CUSTOM CODE SECTION
        [Required]
        public ActivityGoodsEditDto ActivityGoods { get; set; }

}
}