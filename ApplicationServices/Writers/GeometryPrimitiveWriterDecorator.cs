using ApplicationServices.Converters;
using ApplicationServices.Interfaces;

namespace ApplicationServices.Writers
{
    public class GeometryPrimitiveWriterDecorator : IGeometryPrimitiveWriter
    {
        private readonly WebMercatorToGeodeticCoordinateConverter _coordinateConverter;
        private readonly GeometryPrimitiveWriter _geometryPrimitiveWriter;

        public GeometryPrimitiveWriterDecorator(
            WebMercatorToGeodeticCoordinateConverter coordinateConverter,
            GeometryPrimitiveWriter geometryPrimitiveWriter)
        {
            _coordinateConverter = coordinateConverter;
            _geometryPrimitiveWriter = geometryPrimitiveWriter;
        }

        public IEnumerable<IEnumerable<IEnumerable<double>>> Write(IGeometryPrimitive geometryPrimitive)
        {
            var packedPrimitive = _geometryPrimitiveWriter.Write(geometryPrimitive);
            var inner = packedPrimitive.FirstOrDefault();
            var resultInner = new List<double[]>();
            var result = new List<List<double[]>>
            {
                resultInner
            };
        if (inner is null)
            throw new Exception("inner is null");
            foreach (var coordinates in inner)
            {
                var point = _coordinateConverter.Convert(coordinates.First(), coordinates.Last());
                resultInner.Add(new[] {point.X, point.Y});
            }

            return result;
        }
    }
}
