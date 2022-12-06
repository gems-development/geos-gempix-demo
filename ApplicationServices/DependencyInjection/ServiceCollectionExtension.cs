using ApplicationServices;
using ApplicationServices.Converters;
using ApplicationServices.Interfaces;
using ApplicationServices.Readers;
using ApplicationServices.Service;
using ApplicationServices.Writers;

namespace Microsoft.Extensions.DependencyInjection;

public static class ServiceCollectionExtension
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services) =>
        services
            .AddScoped<GeometryPrimitiveReader>()
            .AddScoped<IGeometryPrimitiveReader, GeometryPrimitiveReaderDecorator>()
            .AddScoped<GeodeticToWebMercatorCoordinateConverter>()
            .AddScoped<SpatialRelationsService>()
            .AddScoped<GeometryPrimitiveWriter>()
            .AddScoped<IGeometryPrimitiveWriter, GeometryPrimitiveWriterDecorator>()
            .AddScoped<WebMercatorToGeodeticCoordinateConverter>()
            ;
}