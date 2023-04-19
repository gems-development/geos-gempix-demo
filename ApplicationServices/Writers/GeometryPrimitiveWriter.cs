using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using ApplicationServices.Interfaces;
using GeosGempix;
using GeosGempix.Models;

namespace ApplicationServices.Writers
{
    public class GeometryPrimitiveWriter : IGeometryPrimitiveWriter
    {
        public IEnumerable<IEnumerable<IEnumerable<double>>> Write(IGeometryPrimitive geometryPrimitive)
        {
            IEnumerable<IEnumerable<IEnumerable<double>>> package = null!;

            if (geometryPrimitive is Point point)
            {
                throw new UnsupportedContentTypeException("Point not supported yet");
            }
            else if (geometryPrimitive is Line line)
            {
                package = new[]
                {
                    new[]
                    {
                        new[]
                        {
                            line.Point1.X,
                            line.Point1.Y
                        },
                        new[]
                        {
                            line.Point2.X,
                            line.Point2.Y
                        }
                    }
                };
            }
            else if (geometryPrimitive is Polygon polygon)
            {
                throw new UnsupportedContentTypeException("Polygon not supported yet");
            }

            return package;
        }
    }
}
