using ApplicationServices.Interfaces;
using GeometryModels;
using GeometryModels.Models;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace ApplicationServices.Writers;

public class GeometryPrimitiveWriterDecorator : IGeometryPrimitiveWriter
{
    private readonly ICoordinateConverter _coordinateConverter;
    private readonly GeometryPrimitiveWriter _geometryPrimitiveWriter;

    public GeometryPrimitiveWriterDecorator(ICoordinateConverter coordinateConverter, GeometryPrimitiveWriter geometryPrimitiveWriter)
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
        foreach (var coordinates in inner)
        {
            var point = _coordinateConverter.Convert(coordinates.First(), coordinates.Last());
            resultInner.Add(new []{point.X, point.Y});
        }
        
        return result;
    }
}