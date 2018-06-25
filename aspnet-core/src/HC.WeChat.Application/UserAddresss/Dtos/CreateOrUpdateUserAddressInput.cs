using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HC.WeChat.UserAddresss;

namespace HC.WeChat.UserAddresss.Dtos
{
    public class CreateOrUpdateUserAddressInput
{
////BCC/ BEGIN CUSTOM CODE SECTION
////ECC/ END CUSTOM CODE SECTION
        [Required]
        public UserAddressEditDto UserAddress { get; set; }

}
}