using ApplicationServices.Interfaces;
using GeometryModels;
using GeometryModels.Models;

namespace ApplicationServices.Readers;

internal class GeometryPrimitiveReaderDecorator : IGeometryPrimitiveReader
{
    private readonly ICoordinateConverter _coordinateConverter;
    private readonly GeometryPrimitiveReader _geometryPrimitiveReader;

    public GeometryPrimitiveReaderDecorator(
        ICoordinateConverter coordinateConverter, 
        GeometryPrimitiveReader geometryPrimitiveReader)
    {
        _coordinateConverter = coordinateConverter;
        _geometryPrimitiveReader = geometryPrimitiveReader;
    }

    public IGeometryPrimitive Read(IEnumerable<IEnumerable<IEnumerable<double>>> source)
    {
        var convertedPoints = PreProcess(source);
        var recoveredSource = new []{convertedPoints
            .Select(item => new []{item.X, item.Y}).ToArray()};
        return _geometryPrimitiveReader.Read(recoveredSource);
    }
    
    private List<Point> PreProcess(IEnumerable<IEnumerable<IEnumerable<double>>> source)
    {
        var result = new List<Point>();
        foreach (var item in source.First())
        {
            result.Add(_coordinateConverter.Convert(new Point(item.First(), item.Last())));
        }
        return result;
    }
}