namespace ApplicationServer.Dto;

public class SpatialRequestDto
{
    public IEnumerable<IEnumerable<IEnumerable<double>>> FirstObject { get; set; }
    public IEnumerable<IEnumerable<IEnumerable<double>>> SecondObject { get; set; }
}