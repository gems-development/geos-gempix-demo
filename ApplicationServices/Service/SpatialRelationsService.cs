using ApplicationServices.Model;

namespace ApplicationServices.Service;

public class SpatialRelationsService
{
    public SpatialRelationsInfo GetSpatialRelationsInfo(IGeometryPrimitive first, IGeometryPrimitive second)
    {
        var isIntersect = GeometryModels.Extensions.IntersectorExtension.Intersects(first, second);
        var isInside = GeometryModels.Extensions.InsiderExtension.IsInside(first, second);

        var relationsInfo = new SpatialRelationsInfo
        {
            Intersecting = isIntersect,
            Inside = isInside
        };
        return relationsInfo;
    }
}