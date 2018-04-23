using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HC.WeChat.UserAnswers;

namespace HC.WeChat.UserAnswers.Dtos
{
    public class CreateOrUpdateUserAnswerInput
{
////BCC/ BEGIN CUSTOM CODE SECTION
////ECC/ END CUSTOM CODE SECTION
        [Required]
        public UserAnswerEditDto UserAnswer { get; set; }

}
}