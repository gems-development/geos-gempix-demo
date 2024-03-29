
using Microsoft.AspNetCore.Mvc;
using ApplicationServer.Dto;
using ApplicationServices.Interfaces;
using GeosGempix.Extensions;

namespace ApplicationServer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DistanceController : ControllerBase
    {
        private readonly IGeometryPrimitiveReader _geometryPrimitiveReader;
        private readonly IGeometryPrimitiveWriter _geometryPrimitiveWriter;

        public DistanceController(
            IGeometryPrimitiveReader geometryPrimitiveReader,
            IGeometryPrimitiveWriter geometryPrimitiveWriter)
        {
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
            var distance = geometryPrimitive1.GetDistance(geometryPrimitive2);
            distanceResponse.Distance = distance;
            //var shortestLine = ShortestLineExtension.GetShortestLine(geometryPrimitive1, geometryPrimitive2);          
            var shortestLine = geometryPrimitive1.GetShortestLine(geometryPrimitive2);
            if (shortestLine is not null)
                distanceResponse.Line = _geometryPrimitiveWriter.Write(shortestLine);
            else
                throw new Exception("shortest line is null");

            return Ok(distanceResponse);
        }
    }
}
