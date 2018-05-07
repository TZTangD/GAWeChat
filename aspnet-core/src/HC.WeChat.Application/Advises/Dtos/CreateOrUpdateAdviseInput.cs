using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HC.WeChat.Advises;

namespace HC.WeChat.Advises.Dtos
{
    public class CreateOrUpdateAdviseInput
{
////BCC/ BEGIN CUSTOM CODE SECTION
////ECC/ END CUSTOM CODE SECTION
        [Required]
        public AdviseEditDto Advise { get; set; }

}
}