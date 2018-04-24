using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HC.WeChat.Articles;

namespace HC.WeChat.Articles.Dtos
{
    public class CreateOrUpdateArticleInput
{
////BCC/ BEGIN CUSTOM CODE SECTION
////ECC/ END CUSTOM CODE SECTION
        [Required]
        public ArticleEditDto Article { get; set; }

}
}