using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace HC.WeChat.GAGrades
{
    [Table("GA_Grades")]
    public class GAGrade : Entity<int>
    {
        public virtual int GradeLevel { get; set; }
        public virtual int StartPoint { get; set; }
    }
}
