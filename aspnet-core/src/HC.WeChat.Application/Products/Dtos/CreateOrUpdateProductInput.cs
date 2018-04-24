using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HC.WeChat.Products;

namespace HC.WeChat.Products.Dtos
{
    public class CreateOrUpdateProductInput
{
////BCC/ BEGIN CUSTOM CODE SECTION
////ECC/ END CUSTOM CODE SECTION
        [Required]
        public ProductEditDto Product { get; set; }

}
}