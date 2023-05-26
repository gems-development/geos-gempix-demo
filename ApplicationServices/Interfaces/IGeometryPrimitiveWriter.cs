namespace ApplicationServices.Interfaces
{
    public interface IGeometryPrimitiveWriter
    {
        IEnumerable<IEnumerable<IEnumerable<double>>> Write(IGeometryPrimitive geometryPrimitive);
    }
}
