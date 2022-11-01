namespace ApplicationServer.Dto;

public class DistanceRequestDto
{
    public IEnumerable<IEnumerable<double>> FirstObject { get; set; }
    public IEnumerable<IEnumerable<double>> SecondObject { get; set; }
}