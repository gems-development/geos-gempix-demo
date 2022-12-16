using ApplicationServices.Interfaces;
using CoordinateSharp;
using GeosGempix;

namespace ApplicationServices.Converters;

public class WebMercatorToGeodeticCoordinateConverter : ICoordinateConverter
{
    public Point Convert(Point point)
    {
        var wm = new WebMercator(point.X, point.Y);
        var convertedPoint = WebMercator.ConvertWebMercatortoLatLong(wm);
        return new Point(
            convertedPoint.Latitude.ToDouble(), 
            convertedPoint.Longitude.ToDouble());
    }

    public Point Convert(double x, double y)
    {
        var wm = new WebMercator(x, y);
        var convertedPoint = WebMercator.ConvertWebMercatortoLatLong(wm);
        return new Point(
            convertedPoint.Latitude.ToDouble(), 
            convertedPoint.Longitude.ToDouble());
    }
}