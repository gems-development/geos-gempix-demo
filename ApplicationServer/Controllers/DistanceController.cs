using Microsoft.AspNetCore.Mvc;
using ApplicationServer.Model;

namespace ApplicationServer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DistanceController : ControllerBase
    {
        private readonly ILogger<WeatherForecastController> _logger;

        public DistanceController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpPost(Name = "GetDistance")]
        public double Get([FromBody] IEnumerable<Point> points)
        {
            var point1 = points.FirstOrDefault();
            var point2 = points.LastOrDefault();

            return Math.Sqrt(Math.Pow(point2?.X - point1?.X ?? 0, 2) + Math.Pow(point2?.Y - point1?.Y ?? 0, 2));
        }
    }
}