using ApplicationServices.Model;

namespace ApplicationServer.Dto;

public class SpatialRelationsInfoDto : SpatialRelationsInfo
{
    public new bool Intersecting { get; set; }
    public new bool Inside { get; set; }
}