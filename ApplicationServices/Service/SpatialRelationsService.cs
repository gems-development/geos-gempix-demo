using GeosGempix.Extensions;
using ApplicationServices.Model;

namespace ApplicationServices.Service
{
    public class SpatialRelationsService
    {
        public SpatialRelationsInfo GetSpatialRelationsInfo(IGeometryPrimitive first, IGeometryPrimitive second)
        {
            var isIntersect = IntersectorExtension.Intersects(first, second);
            var isInside = InsiderExtension.IsInside(first, second);

            var relationsInfo = new SpatialRelationsInfo
            {
                Intersecting = isIntersect,
                Inside = isInside
            };
            return relationsInfo;
        }
    }
}
