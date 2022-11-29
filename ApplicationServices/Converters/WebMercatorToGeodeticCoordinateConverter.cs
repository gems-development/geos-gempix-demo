﻿using ApplicationServices.Interfaces;
using CoordinateSharp;
using GeometryModels;

namespace ApplicationServices.Converters;

public class WebMercatorToGeodeticCoordinateConverter : ICoordinateConverter
{
    public Point Convert(Point point)
    {
        var wm = new WebMercator(point.X, point.Y);
        var convertedPoint = WebMercator.ConvertWebMercatortoLatLong(wm);
        return new Point(
            convertedPoint.Latitude.ToDouble(), 
            convertedPoint.Longitude.ToDouble());
    }

    public Point Convert(double x, double y)
    {
        var wm = new WebMercator(y, x);
        var convertedPoint = WebMercator.ConvertWebMercatortoLatLong(wm);
        return new Point(
            convertedPoint.Latitude.ToDouble(), 
            convertedPoint.Longitude.ToDouble());
    }
}