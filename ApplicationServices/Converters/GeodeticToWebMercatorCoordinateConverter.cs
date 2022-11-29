using ApplicationServices.Interfaces;
using CoordinateSharp;
using GeometryModels;
using GeometryModels.Models;

namespace ApplicationServices.Converters;

internal class GeodeticTo3857CoordinateConverter : ICoordinateConverter
{
    public Point Convert(Point point)
    {
        var convertedPoint = new Coordinate(point.X, point.Y).WebMercator;
        return new Point(convertedPoint.Easting, convertedPoint.Northing);
    }

    public Point Convert(double x, double y)
    {
        var convertedPoint = new Coordinate(y, x).UTM;
        return new Point(convertedPoint.Easting, convertedPoint.Northing);
    }

    public double[][] Convert(Line line)
    {
        var wm1 = new WebMercator(line.Point1.X, line.Point1.Y);
        var wm2 = new WebMercator(line.Point2.X, line.Point2.Y);
        var convertedPoint1 = WebMercator.ConvertWebMercatortoLatLong(wm1);
        var convertedPoint2 = WebMercator.ConvertWebMercatortoLatLong(wm2);
        return new[]
        {
            new[] {convertedPoint1.Latitude.ToDouble(), convertedPoint1.Longitude.ToDouble()},
            new[] {convertedPoint2.Latitude.ToDouble(), convertedPoint2.Longitude.ToDouble()}
        };
    }
}