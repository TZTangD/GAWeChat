using System;
using System.Collections.Generic;
using System.Text;

namespace HC.WeChat.Helpers
{
    /// <summary>
    /// 计算某个位置一定距离的经纬度范围
    /// 参考：https://www.cnblogs.com/softfair/p/lat_lon_distance_bearing_new_lat_lon.html
    /// </summary>
    public class MapMBR
    {
        public double MaxLatitude;
        public double MinLatitude;
        public double MaxLongitude;
        public double MinLongitude;

        public double MaxLatitude2;
        public double MinLatitude2;
        public double MaxLongitude2;
        public double MinLongitude2;

        public MapMBR(double centorlatitude, double centorLogitude, double distance)
        {
            GetRectRange(centorlatitude, centorLogitude, distance, out MaxLatitude, out MinLatitude, out MaxLongitude, out MinLongitude);
            GetRectRange2(centorlatitude, centorLogitude, distance, out MaxLatitude2, out MinLatitude2, out MaxLongitude2, out MinLongitude2);
        }

        public const double Ea = 6378137;     //   赤道半径  
        public const double Eb = 6356725;     //   极半径 

        private static void GetlatLon(double LAT, double LON, double distance, double angle, out double newLon, out double newLat)
        {
            double dx = distance * 1000 * Math.Sin(angle * Math.PI / 180.0);
            double dy = distance * 1000 * Math.Cos(angle * Math.PI / 180.0);
            double ec = Eb + (Ea - Eb) * (90.0 - LAT) / 90.0;
            double ed = ec * Math.Cos(LAT * Math.PI / 180);
            newLon = (dx / ed + LON * Math.PI / 180.0) * 180.0 / Math.PI;
            newLat = (dy / ec + LAT * Math.PI / 180.0) * 180.0 / Math.PI;
        }

        public static void GetRectRange(double centorlatitude, double centorLogitude, double distance,
                                      out double maxLatitude, out double minLatitude, out double maxLongitude, out double minLongitude)
        {

            double temp = 0.0;
            GetlatLon(centorlatitude, centorLogitude, distance, 0, out temp, out maxLatitude);
            GetlatLon(centorlatitude, centorLogitude, distance, 180, out temp, out minLatitude);
            GetlatLon(centorlatitude, centorLogitude, distance, 90, out maxLongitude, out temp);
            GetlatLon(centorlatitude, centorLogitude, distance, 270, out minLongitude, out temp);
        }

        public static void GetRectRange2(double centorlatitude, double centorLogitude, double distance,
                                      out double maxLatitude, out double minLatitude, out double maxLongitude, out double minLongitude)
        {
            double temp = 0.0;
            GetNewLatLon(centorlatitude, centorLogitude, distance, 0, out maxLatitude, out temp);
            GetNewLatLon(centorlatitude, centorLogitude, distance, 180, out minLatitude, out temp);
            GetNewLatLon(centorlatitude, centorLogitude, distance, 90, out temp, out maxLongitude);
            GetNewLatLon(centorlatitude, centorLogitude, distance, 270, out temp, out minLongitude);
        }

        /// <summary>
        /// where    φ is latitude, λ is longitude, θ is the bearing (clockwise from north),
        /// δ is the angular distance d/R; d being the distance travelled, R the earth’s radius
        /// bearing 方位 0，90，180，270
        /// </summary>
        private static void GetNewLatLon(double lat, double lon, double d, double bearing, out double lat2, out double lon2)
        {
            lat2 = 0.0;
            lon2 = 0.0;

            double R = 6378.137;
            var φ1 = ConvertDegreesToRadians(lat);
            var λ1 = ConvertDegreesToRadians(lon);
            var θ = ConvertDegreesToRadians(bearing);

            var φ2 = Math.Asin(Math.Sin(φ1) * Math.Cos(d / R) + Math.Cos(φ1) * Math.Sin(d / R) * Math.Cos(θ));
            var λ2 = λ1 + Math.Atan2(Math.Sin(θ) * Math.Sin(d / R) * Math.Cos(φ1), Math.Cos(d / R) - Math.Sin(φ1) * Math.Sin(φ2));
            λ2 = (λ2 + 3 * Math.PI) % (2 * Math.PI) - Math.PI; // normalise to -180..+180°

            lat2 = ConvertRadiansToDegrees(φ2);
            lon2 = ConvertRadiansToDegrees(λ2);
        }

        public static double ConvertDegreesToRadians(double degrees)
        {
            return degrees * Math.PI / 180;
        }

        public static double ConvertRadiansToDegrees(double radian)
        {
            return radian * 180.0 / Math.PI;
        }
    }
}
