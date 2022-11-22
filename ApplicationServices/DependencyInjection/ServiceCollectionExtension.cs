using ApplicationServices;
using ApplicationServices.Converters;
using ApplicationServices.Interfaces;
using ApplicationServices.Readers;
using ApplicationServices.Service;

namespace Microsoft.Extensions.DependencyInjection;

public static class ServiceCollectionExtension
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services) =>
        services
            .AddScoped<GeometryPrimitiveReader>()
            .AddScoped<IGeometryPrimitiveReader, GeometryPrimitiveReaderDecorator>()
            .AddScoped<ICoordinateConverter, GeodeticTo3857CoordinateConverter>()
            .AddScoped<SpatialRelationsService>();
}