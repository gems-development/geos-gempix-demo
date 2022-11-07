using ApplicationServices.Interfaces;
using CoordinateSharp;
using GeometryModels;

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
}