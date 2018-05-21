using HC.WeChat.Helpers;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace HC.WeChat.Tests.Map
{
    public class Map_Tests : WeChatTestBase
    {
        [Fact]
        public void GetMBR_Test()
        {
            double latorg = 22.54587746, lonorg = 114.12873077;
            var gpsdis = new MapMBR(latorg, lonorg, 5);
        }


        [Fact]
        public void Distance_Test()
        {
            double lat1 = 30.613085, lon1 = 104.073803;
            double lat2 = 30.634466, lon2 = 104.147967;
            var distance1 = MapHelper.Distance(lat1, lon1, lat2, lon2);
            var distance2 = AbpMapByGoogle.GetDistance(lat1, lon1, lat2, lon2);
        }
    }
}
