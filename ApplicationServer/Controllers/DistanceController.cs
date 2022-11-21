using ApplicationServer.Dto;
using Microsoft.AspNetCore.Mvc;
using ApplicationServices.Interfaces;
using GeometryModels.Extensions;

namespace ApplicationServer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DistanceController : ControllerBase
    {
        private readonly ILogger<DistanceController> _logger;
        private readonly IGeometryPrimitiveReader _geometryPrimitiveReader;

        public DistanceController(
            ILogger<DistanceController> logger, 
            IGeometryPrimitiveReader geometryPrimitiveReader)
        {
            _logger = logger;
            _geometryPrimitiveReader = geometryPrimitiveReader;
        }

        [HttpPost(Name = "GetDistance")]
        public IActionResult Get([FromBody] DistanceRequestDto request)
        {
            if (request.FirstObject is null || request.SecondObject is null)
            {
                return BadRequest();
            }
            var geometryPrimitive1 = _geometryPrimitiveReader.Read(request.FirstObject);
            var geometryPrimitive2 = _geometryPrimitiveReader.Read(request.SecondObject);
            
            var distance = GeometryModels.Extensions.DistanceExtension.GetDistance(geometryPrimitive1, geometryPrimitive2);
            return Ok(distance);
        }
    }
}