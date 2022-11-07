using ApplicationServices.Interfaces;
using GeometryModels;
using GeometryModels.Models;

namespace ApplicationServices.Readers;

internal class GeometryPrimitiveReader : IGeometryPrimitiveReader
{
    public IGeometryPrimitive Read(IEnumerable<IEnumerable<double>> source)
    {
        var innerFirst = source.FirstOrDefault();
        var innerLast = source.LastOrDefault();
        IGeometryPrimitive geometryPrimitive = null!;
        if (source.Count() == 1)
        {
            geometryPrimitive = new Point(innerFirst.First(), innerFirst.Last());
        }
        if (source.Count() > 1 
            && !Equals(innerFirst?.First(), innerLast?.First())
            && !Equals(innerFirst?.Last(), innerLast?.Last()))
        {
            geometryPrimitive = new Line(
                new Point(innerFirst.First(), innerFirst.Last()), 
                new Point(innerLast.First(), innerLast.Last()));
        }
        if (source.Count() > 2 
            && Equals(innerFirst?.First(), innerLast?.First())
            && Equals(innerFirst?.Last(), innerLast?.Last()))
        {
            var points = source
                .Select(item => new Point(item.First(), item.Last()))
                .ToList();
            geometryPrimitive = new Polygon(points, null);
        }
        return geometryPrimitive;
    }
}