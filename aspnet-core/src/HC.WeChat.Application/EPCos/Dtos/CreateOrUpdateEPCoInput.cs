using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HC.WeChat.EPCos;

namespace HC.WeChat.EPCos.Dtos
{
    public class CreateOrUpdateEPCoInput
{
////BCC/ BEGIN CUSTOM CODE SECTION
////ECC/ END CUSTOM CODE SECTION
        [Required]
        public EPCoEditDto EPCo { get; set; }

}
}