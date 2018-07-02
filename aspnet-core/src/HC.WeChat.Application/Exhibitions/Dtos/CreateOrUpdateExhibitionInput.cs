using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HC.WeChat.Exhibitions;

namespace HC.WeChat.Exhibitions.Dtos
{
    public class CreateOrUpdateExhibitionInput
    {
        [Required]
        public ExhibitionEditDto Exhibition { get; set; }
     
    }
}