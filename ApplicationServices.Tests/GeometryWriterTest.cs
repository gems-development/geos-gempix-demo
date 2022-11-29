using ApplicationServices.Writers;
using GeometryModels;
using GeometryModels.Models;

namespace ApplicationServices.Tests;

public class GeometryWriterTest
{
    [Fact]
    public void GeometryPrimitiveIsPacked()
    {
        // Arrange
        var geometryPrimitive = new Line(
            new Point(6.0, 6.0), 
            new Point(12.0, 12.0));
        
        var geometryPrimitiveWriter = new GeometryPrimitiveWriter();
        
        // Act
        var result = geometryPrimitiveWriter.Write(geometryPrimitive);
        
        // Assert
        Assert.IsAssignableFrom<IEnumerable<IEnumerable<IEnumerable<double>>>>(result);
    }
}