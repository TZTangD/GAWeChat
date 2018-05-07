using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HC.WeChat.StatisticalDetails;

namespace HC.WeChat.StatisticalDetails.Dtos
{
    public class CreateOrUpdateStatisticalDetailInput
{
////BCC/ BEGIN CUSTOM CODE SECTION
////ECC/ END CUSTOM CODE SECTION
        [Required]
        public StatisticalDetailEditDto StatisticalDetail { get; set; }

}
}