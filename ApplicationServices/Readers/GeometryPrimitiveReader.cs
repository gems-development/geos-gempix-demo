using ApplicationServices.Interfaces;
using GeosGempix;
using GeosGempix.Models;

namespace ApplicationServices.Readers
{
    internal class GeometryPrimitiveReader : IGeometryPrimitiveReader
    {
        public IGeometryPrimitive Read(IEnumerable<IEnumerable<IEnumerable<double>>> source)
        {
            var innerFirst = source.First().FirstOrDefault();
            var innerLast = source.First().LastOrDefault();
            IGeometryPrimitive geometryPrimitive = null!;
            if (source.First().Count() == 1 && innerFirst is not null)
            {
                geometryPrimitive = new Point(innerFirst.First(), innerFirst.Last());
            }
            else if (innerFirst is null)
                throw new Exception("inner is null");

            if (source.First().Count() > 1
                && !Equals(innerFirst?.First(), innerLast?.First())
                && !Equals(innerFirst?.Last(), innerLast?.Last())
                && innerFirst is not null
                && innerLast is not null)
            {
                geometryPrimitive = new Line(
                    new Point(innerFirst.First(), innerFirst.Last()),
                    new Point(innerLast.First(), innerLast.Last()));
            }
            else if (innerFirst is null || innerLast is null)
                throw new Exception("inner is null");
            if (source.First().Count() > 2
                && Equals(innerFirst?.First(), innerLast?.First())
                && Equals(innerFirst?.Last(), innerLast?.Last()))
            {
                var points = source.First()
                    .Select(item => new Point(item.First(), item.Last()))
                    .ToList();
                geometryPrimitive = new Polygon(points);
            }

            return geometryPrimitive;
        }
    }
}
