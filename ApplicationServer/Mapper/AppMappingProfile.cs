using AutoMapper;
using ApplicationServer.Dto;
using ApplicationServices.Model;

namespace ApplicationServer.Mapper
{
    public class AppMappingProfile : Profile
    {
        public AppMappingProfile()
        {
            CreateMap<SpatialRelationsInfo, SpatialRelationsInfoDto>();
        }
    }
}
