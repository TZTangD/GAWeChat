using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HC.WeChat.ActivityDeliveryInfos;

namespace HC.WeChat.ActivityDeliveryInfos.Dtos
{
    public class CreateOrUpdateActivityDeliveryInfoInput
    {
        [Required]
        public ActivityDeliveryInfoEditDto ActivityDeliveryInfo { get; set; }

    }
}