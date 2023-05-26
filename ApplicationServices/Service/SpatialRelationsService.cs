using GeosGempix.Extensions;
using ApplicationServices.Model;

namespace ApplicationServices.Service
{
    public class SpatialRelationsService
    {
        public SpatialRelationsInfo GetSpatialRelationsInfo(IGeometryPrimitive first, IGeometryPrimitive second)
        {
            var isIntersect = first.Intersects(second);
            var isInside = first.IsInside(second);

            var relationsInfo = new SpatialRelationsInfo
            {
                Intersecting = isIntersect,
                Inside = isInside
            };
            return relationsInfo;
        }
    }
}
