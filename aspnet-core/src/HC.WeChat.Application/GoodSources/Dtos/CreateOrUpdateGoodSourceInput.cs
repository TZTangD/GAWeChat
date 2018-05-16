using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HC.WeChat.GoodSources;

namespace HC.WeChat.GoodSources.Dtos
{
    public class CreateOrUpdateGoodSourceInput
{
////BCC/ BEGIN CUSTOM CODE SECTION
////ECC/ END CUSTOM CODE SECTION
        [Required]
        public GoodSourceEditDto GoodSource { get; set; }

}
}