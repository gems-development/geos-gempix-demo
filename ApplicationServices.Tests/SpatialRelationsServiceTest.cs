using ApplicationServices.Model;
using ApplicationServices.Readers;
using ApplicationServices.Service;

namespace ApplicationServices.Tests
{
    public class SpatialRelationsServiceTest
    {
        [Fact]
        public void GetSpatialRelationsInfo_PolylineAndPolygon()
        {
            // Arrange
            var spatialRelationsService = new SpatialRelationsService();
            var geometryPrimitiveReader = new GeometryPrimitiveReader();
            var source0 = new[] {new[] {new[] {1.0, 1.0}, new[] {5.0, 5.0}}};
            var source1 = new[] {new[] {new[] {0.0, 0.0}, new[] {2.0, 5.0}, new[] {4.0, 4.0}}};

            var geometryPrimitive1 = geometryPrimitiveReader.Read(source0);
            var geometryPrimitive2 = geometryPrimitiveReader.Read(source1);

            var spatialRelationsInfoExp = new SpatialRelationsInfo
            {
                Intersecting = false,
                Inside = false
            };

            // Act
            var spatialRelationsInfoAct =
                spatialRelationsService.GetSpatialRelationsInfo(geometryPrimitive1, geometryPrimitive2);

            // Assert
            Assert.Equal(spatialRelationsInfoExp, spatialRelationsInfoAct);
        }
    }
}
