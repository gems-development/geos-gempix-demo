using ApplicationServer.Dto;
using Microsoft.AspNetCore.Mvc;
using ApplicationServer.Model;
using ApplicationServices;

namespace ApplicationServer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DistanceController : ControllerBase
    {
        private readonly ILogger<DistanceController> _logger;
        private readonly GeometryPrimitiveReader _geometryPrimitiveReader;

        public DistanceController(
            ILogger<DistanceController> logger, 
            GeometryPrimitiveReader geometryPrimitiveReader)
        {
            _logger = logger;
            _geometryPrimitiveReader = geometryPrimitiveReader;
        }

        [HttpPost(Name = "GetDistance")]
        public double Get([FromBody] DistanceRequestDto request)
        {
            // var point1 = points.FirstOrDefault();
            // var point2 = points.LastOrDefault();
            //
            // return Math.Sqrt(Math.Pow(point2?.X - point1?.X ?? 0, 2) + Math.Pow(point2?.Y - point1?.Y ?? 0, 2));
            return 0;
        }
    }
}