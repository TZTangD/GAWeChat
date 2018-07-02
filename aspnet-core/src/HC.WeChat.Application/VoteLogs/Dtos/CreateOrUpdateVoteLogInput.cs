using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HC.WeChat.VoteLogs;

namespace HC.WeChat.VoteLogs.Dtos
{
    public class CreateOrUpdateVoteLogInput
    {
        [Required]
        public VoteLogEditDto VoteLog { get; set; }
     
    }
}