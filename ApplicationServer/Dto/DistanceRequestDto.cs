namespace ApplicationServer.Dto;

public class DistanceRequestDto
{
    public IEnumerable<IEnumerable<IEnumerable<double>>> FirstObject { get; set; }
    public IEnumerable<IEnumerable<IEnumerable<double>>> SecondObject { get; set; }
}