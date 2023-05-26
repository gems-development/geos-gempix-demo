using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ApplicationServer.Dto;
using ApplicationServices.Interfaces;
using ApplicationServices.Service;

namespace ApplicationServer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SpatialRelationsController : Controller
    {
        private readonly IGeometryPrimitiveReader _geometryPrimitiveReader;
        private readonly SpatialRelationsService _spatialRelationsService;
        private readonly IMapper _mapper;

        public SpatialRelationsController(
            ILogger<SpatialRelationsController> logger,
            IGeometryPrimitiveReader geometryPrimitiveReader, 
            SpatialRelationsService spatialRelationsService,
            IMapper mapper)
        {
            _geometryPrimitiveReader = geometryPrimitiveReader;
            _spatialRelationsService = spatialRelationsService;
            _mapper = mapper;
        }

        [HttpPost]
        public IActionResult Get([FromBody] SpatialRequestDto request)
        {
            if (request.FirstObject is null || request.SecondObject is null)
            {
                return BadRequest();
            }
            var geometryPrimitive1 = _geometryPrimitiveReader.Read(request.FirstObject);
            var geometryPrimitive2 = _geometryPrimitiveReader.Read(request.SecondObject);
            var spatialRelationsInfo = _spatialRelationsService.GetSpatialRelationsInfo(geometryPrimitive1, geometryPrimitive2);
            var spatialRelationsInfoDto = _mapper.Map<SpatialRelationsInfoDto>(spatialRelationsInfo);
            
            return Ok(spatialRelationsInfoDto);
        }
    }
}
