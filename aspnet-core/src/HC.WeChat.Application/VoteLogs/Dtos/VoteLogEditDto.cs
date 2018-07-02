using System;
using System.ComponentModel.DataAnnotations;
using Abp.Application.Services.Dto;
using HC.WeChat.VoteLogs;

namespace HC.WeChat.VoteLogs.Dtos
{
    public class VoteLogEditDto : EntityDto<Guid?>
    {
        /// <summary>
        /// CreateTime
        /// </summary>
        [Required(ErrorMessage = "CreateTime不能为空")]
        public DateTime CreateTime { get; set; }


        /// <summary>
        /// OpenId
        /// </summary>
        [Required(ErrorMessage = "OpenId不能为空")]
        public string OpenId { get; set; }


        /// <summary>
        /// UserName
        /// </summary>
        public string UserName { get; set; }


        /// <summary>
        /// ExhibitionId
        /// </summary>
        [Required(ErrorMessage = "ExhibitionId不能为空")]
        public Guid ExhibitionId { get; set; }





        ////BCC/ BEGIN CUSTOM CODE SECTION

        ////ECC/ END CUSTOM CODE SECTION
    }
}