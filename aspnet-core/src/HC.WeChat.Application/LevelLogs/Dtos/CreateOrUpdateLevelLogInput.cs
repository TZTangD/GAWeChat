using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HC.WeChat.LevelLogs;

namespace HC.WeChat.LevelLogs.Dtos
{
    public class CreateOrUpdateLevelLogInput
{
////BCC/ BEGIN CUSTOM CODE SECTION
////ECC/ END CUSTOM CODE SECTION
        [Required]
        public LevelLogEditDto LevelLog { get; set; }

}
}