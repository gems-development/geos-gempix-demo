using System.Collections.Generic;
using System.Linq;
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
            if (source.First().Count() == 1)
            {
                geometryPrimitive = new Point(innerFirst.First(), innerFirst.Last());
            }

            if (source.First().Count() > 1
                && !Equals(innerFirst?.First(), innerLast?.First())
                && !Equals(innerFirst?.Last(), innerLast?.Last()))
            {
                geometryPrimitive = new Line(
                    new Point(innerFirst.First(), innerFirst.Last()),
                    new Point(innerLast.First(), innerLast.Last()));
            }

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
