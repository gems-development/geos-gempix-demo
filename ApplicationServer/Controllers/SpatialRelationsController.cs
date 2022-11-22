using ApplicationServer.Dto;
using Microsoft.AspNetCore.Mvc;
using ApplicationServer.Model;
using ApplicationServices;
using ApplicationServices.Interfaces;
using ApplicationServices.Readers;
using static GeometryModels.Extensions.InsiderExtencion;
using static GeometryModels.Extensions.IntersectorExtencion;

namespace ApplicationServer.Controllers
{
    public class SpatialRelationsController : Controller
    {
        private readonly ILogger<SpatialRelationsController> _logger;
        private readonly IGeometryPrimitiveReader _geometryPrimitiveReader;

        public SpatialRelationsController(
            ILogger<SpatialRelationsController> logger,
            IGeometryPrimitiveReader geometryPrimitiveReader)
        {
            _logger = logger;
            _geometryPrimitiveReader = geometryPrimitiveReader;
        }

        [HttpPost(Name = "GetRelations")]
        public IActionResult Get([FromBody] RelationRequestDto request)
        {
            if (request.FirstObject is null || request.SecondObject is null)
            {
                return BadRequest();
            }
            var geometryPrimitive1 = _geometryPrimitiveReader.Read(request.FirstObject);
            var geometryPrimitive2 = _geometryPrimitiveReader.Read(request.SecondObject);



            
            return Ok();
        }


    }
}
