using System.ComponentModel.DataAnnotations;
using HC.WeChat.GAGrades.Dtos.LTMAutoMapper;
using HC.WeChat.GAGrades;

namespace HC.WeChat.GAGrades.Dtos
{
    public class GAGradeEditDto
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public int? Id { get; set; }
        public int GradeLevel { get; set; }
        public int StartPoint { get; set; }
    }
}