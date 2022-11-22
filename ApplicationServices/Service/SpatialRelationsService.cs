using ApplicationServices.Model;

namespace ApplicationServices.Service;

public class SpatialRelationsService
{
    public SpatialRelationsInfo GetSpatialRelationsInfo(IGeometryPrimitive first, IGeometryPrimitive second)
    {
        var relationsInfo = new SpatialRelationsInfo();
        var isIntersect = GeometryModels.Extensions.IntersectorExtension.Intersects(first, second);
        var isInside = GeometryModels.Extensions.InsiderExtension.IsInside(first, second);

        relationsInfo.Intersecting = isIntersect;
        relationsInfo.Inside = isInside;
        return relationsInfo;
    }
}