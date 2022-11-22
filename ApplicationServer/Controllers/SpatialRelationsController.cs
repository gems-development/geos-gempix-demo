using ApplicationServer.Dto;
using Microsoft.AspNetCore.Mvc;
using ApplicationServer.Model;
using ApplicationServices;
using ApplicationServices.Interfaces;
using ApplicationServices.Readers;
using ApplicationServices.Service;

namespace ApplicationServer.Controllers
{
    public class SpatialRelationsController : Controller
    {
        private readonly ILogger<SpatialRelationsController> _logger;
        private readonly IGeometryPrimitiveReader _geometryPrimitiveReader;
        private readonly SpatialRelationsService _spatialRelationsService;

        public SpatialRelationsController(
            ILogger<SpatialRelationsController> logger,
            IGeometryPrimitiveReader geometryPrimitiveReader, 
            SpatialRelationsService spatialRelationsService)
        {
            _logger = logger;
            _geometryPrimitiveReader = geometryPrimitiveReader;
            _spatialRelationsService = spatialRelationsService;
        }

        [HttpPost(Name = "GetRelations")]
        public IActionResult Get([FromBody] SpatialRequestDto request)
        {
            if (request.FirstObject is null || request.SecondObject is null)
            {
                return BadRequest();
            }
            var geometryPrimitive1 = _geometryPrimitiveReader.Read(request.FirstObject);
            var geometryPrimitive2 = _geometryPrimitiveReader.Read(request.SecondObject);

            var spatialRelationsInfo = 
                _spatialRelationsService.GetSpatialRelationsInfo(geometryPrimitive1, geometryPrimitive2);

            return Ok((SpatialRelationsInfoDto)spatialRelationsInfo);
        }
    }
}
