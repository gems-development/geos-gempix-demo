using GeometryModels;
using GeometryModels.Models;

namespace ApplicationServices.Interfaces;

public interface ICoordinateConverter
{
    Point Convert(Point point);
    Point Convert(double x, double y);
}