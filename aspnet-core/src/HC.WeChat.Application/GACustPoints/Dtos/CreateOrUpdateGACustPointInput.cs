using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HC.WeChat.GACustPoints;

namespace HC.WeChat.GACustPoints.Dtos
{
    public class CreateOrUpdateGACustPointInput
{
////BCC/ BEGIN CUSTOM CODE SECTION
////ECC/ END CUSTOM CODE SECTION
        [Required]
        public GACustPointEditDto GACustPoint { get; set; }

}
}