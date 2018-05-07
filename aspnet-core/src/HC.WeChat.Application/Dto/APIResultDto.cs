using System;
using System.Collections.Generic;
using System.Text;

namespace HC.WeChat.Dto
{
    [Serializable]
    public class APIResultDto
    {
        public int Code { get; set; }

        public string Msg { get; set; }

        public Object Data { get; set; }
    }
}
