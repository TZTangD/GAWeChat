using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HC.WeChat.ActivityForms;

namespace HC.WeChat.ActivityForms.Dtos
{
    public class CreateOrUpdateActivityFormInput
    {
        [Required]
        public ActivityFormEditDto ActivityForm { get; set; }

    }
}