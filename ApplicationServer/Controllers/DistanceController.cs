using ApplicationServer.Dto;
using Microsoft.AspNetCore.Mvc;
using ApplicationServices.Interfaces;
using GeosGempix.Extensions;

namespace ApplicationServer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DistanceController : ControllerBase
    {
        private readonly ILogger<DistanceController> _logger;
        private readonly IGeometryPrimitiveReader _geometryPrimitiveReader;
        private readonly IGeometryPrimitiveWriter _geometryPrimitiveWriter;

        public DistanceController(
            ILogger<DistanceController> logger, 
            IGeometryPrimitiveReader geometryPrimitiveReader,
            IGeometryPrimitiveWriter geometryPrimitiveWriter)
        {
            _logger = logger;
            _geometryPrimitiveReader = geometryPrimitiveReader;
            _geometryPrimitiveWriter = geometryPrimitiveWriter;
        }

        [HttpPost(Name = "GetDistance")]
        public IActionResult Get([FromBody] SpatialRequestDto request)
        {
            var distanceResponse = new DistanceResponseDto();
            if (request.FirstObject is null || request.SecondObject is null)
            {
                return BadRequest();
            }
            var geometryPrimitive1 = _geometryPrimitiveReader.Read(request.FirstObject);
            var geometryPrimitive2 = _geometryPrimitiveReader.Read(request.SecondObject);
            //var distance = DistanceExtension.GetDistance(geometryPrimitive1, geometryPrimitive2);
            var distance = geometryPrimitive1.GetDistance(geometryPrimitive2);
            
            distanceResponse.Distance = distance;
            // var shortestLine = ShortestLineExtension.GetShortestLine(geometryPrimitive1, geometryPrimitive2);
            if (geometryPrimitive1 is not Polygon && geometryPrimitive2 is not Polygon) // TODO: проверить и убрать.
            {
                var shortestLine = geometryPrimitive1.GetShortestLine(geometryPrimitive2);
                distanceResponse.Line = shortestLine is null ? null : _geometryPrimitiveWriter.Write(shortestLine);
            }

            return Ok(distanceResponse);
        }
    }
}