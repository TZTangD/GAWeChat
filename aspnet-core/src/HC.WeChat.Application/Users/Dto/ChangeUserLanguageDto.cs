using System.ComponentModel.DataAnnotations;

namespace HC.WeChat.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}