using ApplicationServices.Writers;
using GeosGempix;
using GeosGempix.Models;

namespace ApplicationServices.Tests
{
    public class GeometryWriterTest
    {
        [Fact]
        public void GeometryPrimitiveIsPacked()
        {
            // Arrange
            var geometryPrimitive = new Line(
                new Point(6.0, 6.0),
                new Point(12.0, 12.0));

            // Act
            var geometryPrimitiveWriter = new GeometryPrimitiveWriter();
            var result = geometryPrimitiveWriter.Write(geometryPrimitive);
            var innerFirst = result.First().FirstOrDefault();
            var innerLast = result.Last().LastOrDefault();

            // Assert
            Assert.Equal(innerFirst?.First(), geometryPrimitive.Point1.X);
            Assert.Equal(innerFirst?.Last(), geometryPrimitive.Point1.Y);
            Assert.Equal(innerLast?.First(), geometryPrimitive.Point2.X);
            Assert.Equal(innerLast?.Last(), geometryPrimitive.Point2.Y);
        }
    }
}
