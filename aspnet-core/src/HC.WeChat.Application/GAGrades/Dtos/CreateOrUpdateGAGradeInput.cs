using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HC.WeChat.GAGrades;

namespace HC.WeChat.GAGrades.Dtos
{
    public class CreateOrUpdateGAGradeInput
{
////BCC/ BEGIN CUSTOM CODE SECTION
////ECC/ END CUSTOM CODE SECTION
        [Required]
        public GAGradeEditDto GAGrade { get; set; }

}
}