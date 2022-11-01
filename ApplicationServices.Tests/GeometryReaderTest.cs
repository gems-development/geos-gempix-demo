using GeometryModels;

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
    /*
    [Fact]
    public void SourceDataIsPoint_ThrowsException1()
    {
        // Arrange
        var source = new[]{new[] {0.0, 0.0}, new[] {0.0, 0.0}};
        var geometryPrimitiveReader = new GeometryPrimitiveReader();

        // Act + Assert
        Assert.Throws<ArgumentException>(() => geometryPrimitiveReader.Read(source));
    }
    */
}