﻿using ApplicationServices;

namespace Microsoft.Extensions.DependencyInjection;

public static class ServiceCollectionExtension
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services) =>
        services.AddScoped<GeometryPrimitiveReader>();
}