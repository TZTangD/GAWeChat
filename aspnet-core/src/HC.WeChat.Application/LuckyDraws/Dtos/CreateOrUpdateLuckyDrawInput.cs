using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HC.WeChat.LuckyDraws;

namespace HC.WeChat.LuckyDraws.Dtos
{
    public class CreateOrUpdateLuckyDrawInput
{
////BCC/ BEGIN CUSTOM CODE SECTION
////ECC/ END CUSTOM CODE SECTION
        [Required]
        public LuckyDrawEditDto LuckyDraw { get; set; }

}
}