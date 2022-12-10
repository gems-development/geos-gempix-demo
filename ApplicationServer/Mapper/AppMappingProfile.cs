using ApplicationServer.Dto;
using ApplicationServices.Model;
using AutoMapper;

namespace ApplicationServer.Mapper;

public class AppMappingProfile : Profile
{
    public AppMappingProfile()
    {			
        CreateMap<SpatialRelationsInfo, SpatialRelationsInfoDto>();
    }
}