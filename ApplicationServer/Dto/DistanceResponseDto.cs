namespace ApplicationServer.Dto
{
    public class DistanceResponseDto
    {
        public double Distance { get; set; }
    public IEnumerable<IEnumerable<IEnumerable<double>>> Line { get; set; } = null!;
    }
}
