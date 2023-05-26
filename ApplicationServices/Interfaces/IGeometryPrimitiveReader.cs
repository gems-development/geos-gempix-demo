namespace ApplicationServices.Interfaces
{
    public interface IGeometryPrimitiveReader
    {
        IGeometryPrimitive Read(IEnumerable<IEnumerable<IEnumerable<double>>> source);
    }
}
