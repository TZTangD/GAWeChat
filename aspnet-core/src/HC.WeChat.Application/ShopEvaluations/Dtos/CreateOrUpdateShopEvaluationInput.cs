using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HC.WeChat.ShopEvaluations;

namespace HC.WeChat.ShopEvaluations.Dtos
{
    public class CreateOrUpdateShopEvaluationInput
{
////BCC/ BEGIN CUSTOM CODE SECTION
////ECC/ END CUSTOM CODE SECTION
        [Required]
        public ShopEvaluationEditDto ShopEvaluation { get; set; }

}
}