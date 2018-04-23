using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HC.WeChat.Employees;

namespace HC.WeChat.Employees.Dtos
{
    public class CreateOrUpdateEmployeeInput
{
////BCC/ BEGIN CUSTOM CODE SECTION
////ECC/ END CUSTOM CODE SECTION
        [Required]
        public EmployeeEditDto Employee { get; set; }

}
}