using ApplicationServices.Readers;
using GeometryModels;
using GeometryModels.Models;

namespace ApplicationServices.Tests;

public class GeometryReaderTest
{
    [Fact]
    public void SourceDataIsPoint_PointResult()
    {
        // Arrange
        var source = new[]{new[] {0.0, 0.0}};
        var geometryPrimitiveReader = new GeometryPrimitiveReader();
        
        // Act
        var result = geometryPrimitiveReader.Read(source);
        
        // Assert
        Assert.IsType<Point>(result);
    }
    
    [Fact]
    public void SourceDataIsPolyline_LineResult()
    {
        // Arrange
        var source = new[]{new[] {0.0, 0.0}, new []{5.0, 5.0}};
        var geometryPrimitiveReader = new GeometryPrimitiveReader();
        
        // Act
        var result = geometryPrimitiveReader.Read(source);
        
        // Assert
        Assert.IsType<Line>(result);
    }
    
    [Fact]
    public void SourceDataIsPolygon_PolygonResult()
    {
        // Arrange
        var source = new[]{new[] {0.0, 0.0}, new []{5.0, 5.0}, new []{0.0, 0.0}};
        var geometryPrimitiveReader = new GeometryPrimitiveReader();
        
        // Act
        var result = geometryPrimitiveReader.Read(source);
        
        // Assert
        Assert.IsType<Polygon>(result);
    }
}