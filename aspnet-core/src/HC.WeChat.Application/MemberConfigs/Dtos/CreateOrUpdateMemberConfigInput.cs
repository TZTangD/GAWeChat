using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HC.WeChat.MemberConfigs;

namespace HC.WeChat.MemberConfigs.Dtos
{
    public class CreateOrUpdateMemberConfigInput
{
////BCC/ BEGIN CUSTOM CODE SECTION
////ECC/ END CUSTOM CODE SECTION
        [Required]
        public MemberConfigEditDto MemberConfig { get; set; }

}
}