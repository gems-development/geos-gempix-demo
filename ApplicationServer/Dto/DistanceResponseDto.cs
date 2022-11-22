using GeometryModels.Models;

namespace ApplicationServer.Dto;

public class DistanceResponseDto
{
    public double Distance { get; set; }
    public Line Line { get; set; }
}