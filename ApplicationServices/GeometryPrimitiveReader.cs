using GeometryModels;

namespace ApplicationServices;

public class GeometryPrimitiveReader
{
    public IGeometryPrimitive Read(IEnumerable<IEnumerable<double>> source)
    {
        var inner = source.FirstOrDefault();
        if (inner?.Count() != 2)
        {
            throw new ArgumentException("Not a Point!");
        }

        IGeometryPrimitive geometryPrimitive = new Point(inner.First(), inner.Last());
        return geometryPrimitive;
    }
}