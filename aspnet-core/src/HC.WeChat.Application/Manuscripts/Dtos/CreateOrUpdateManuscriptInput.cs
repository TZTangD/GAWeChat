using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HC.WeChat.Manuscripts;

namespace HC.WeChat.Manuscripts.Dtos
{
    public class CreateOrUpdateManuscriptInput
{
////BCC/ BEGIN CUSTOM CODE SECTION
////ECC/ END CUSTOM CODE SECTION
        [Required]
        public ManuscriptEditDto Manuscript { get; set; }

}
}