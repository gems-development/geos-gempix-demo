namespace ApplicationServer.Dto;

public class RelationRequestDto
{
    public IEnumerable<IEnumerable<double>> FirstObject { get; set; }
    public IEnumerable<IEnumerable<double>> SecondObject { get; set; }
}