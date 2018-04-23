using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HC.WeChat.UserQuestions;

namespace HC.WeChat.UserQuestions.Dtos
{
    public class CreateOrUpdateUserQuestionInput
{
////BCC/ BEGIN CUSTOM CODE SECTION
////ECC/ END CUSTOM CODE SECTION
        [Required]
        public UserQuestionEditDto UserQuestion { get; set; }

}
}