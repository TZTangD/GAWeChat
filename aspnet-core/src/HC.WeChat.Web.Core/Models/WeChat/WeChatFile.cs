using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace HC.WeChat.Models.WeChat
{
    public class WeChatFile
    {
        /// <summary>
        ///  文件唯一标识
        /// </summary>
        public string Uid { get; set; }
        /// <summary>
        /// 文件名
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 状态有：uploading done error removed
        /// </summary>
        public string Status { get; set; }

        public string Url { get; set; }

        public string ThumbUrl { get; set; }
    }

    public class WeChatFileInput
    {
        public string uid { get; set; }
        public int size { get; set; }
        public string name { get; set; }
        public string filename { get; set; }
        public string lastModified { get; set; }
        public DateTime? lastModifiedDate { get; set; }
        public string url { get; set; }
        public string status { get; set; }
        public object originFileObj { get; set; }
        public int? percent { get; set; }
        public string thumbUrl { get; set; }
        public object response { get; set; }
        public object error { get; set; }
        public object linkProps { get; set; }
        public string type { get; set; }
    }
}
