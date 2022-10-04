import React from 'react';
import { YMaps, Map, GeolocationControl, ZoomControl } from 'react-yandex-maps';
import './Map.css';

const mapState = {
    center: [54.98517806972585,73.3714099999999],
    zoom: 16
};

// Хуки
const ymaps = React.createRef(null);
const placemarkRef = React.createRef(null);
const mapRef = React.createRef(null);
const polylineRef = React.createRef(null);
const polygonRef = React.createRef(null);

// Добавление точек на карту
export const addPoint = () => {
    const newPlacemark = new ymaps.current.Placemark([], {},
        {
            editorDrawingCursor: "crosshair",
            iconLayout: 'default#image',
            iconImageHref: 'https://cdn-user-icons.flaticon.com/80802/80802443/1664782767840.svg?token=exp=1664783690~hmac=98af978fca0518c27f5b564fd482976c',
            iconImageSize: [46, 46],
            iconImageOffset: [-23, -46],
            draggable: true
        }    
    );
    placemarkRef.current = newPlacemark;
    mapRef.current.geoObjects.add(placemarkRef.current);
    placemarkRef.current.editor.startDrawing();
};

// Добавление полилиний на карту
export const addPolyline = () => {
    const newPolyline = new ymaps.current.Polyline([], {},
        {
            editorDrawingCursor: "crosshair",
            editorMaxPoints: 2,
            fillColor: "#0bbcc9",
            strokeColor: "#0bbcc9",
            strokeWidth: 5,
            draggable: true
        }
    );
    polylineRef.current = newPolyline;
    mapRef.current.geoObjects.add(polylineRef.current);
    polylineRef.current.editor.startDrawing();
};

// Добавление полигона на карту
export const addPolygon = () => {
    const newPolygon = new ymaps.current.Polygon([], {},
        {
            editorDrawingCursor: "crosshair",
            editorMaxPoints: 5,
            fillColor: "#b8a7a2aa",
            strokeColor: "#0bbcc9",
            strokeWidth: 5,
            draggable: true
        }
    );
    polygonRef.current = newPolygon;
    mapRef.current.geoObjects.add(polygonRef.current);
    polygonRef.current.editor.startDrawing();
};

// Рендеринг карты
export default function Map1() {
    
    return (
        <div className="map-size map-container">
            <YMaps>
                <Map
                    className = "map-size map-mode"
                    modules = {["Placemark", "Polyline", "Polygon", "geocode", "geoObject.addon.balloon",
                        "geoObject.addon.editor"]}
                    instanceRef = {mapRef}
                    onLoad = {(ymapsInstance) => (ymaps.current = ymapsInstance)}
                    state = {mapState} 
                    options = {{suppressMapOpenBlock: true}}
                >
                    <ZoomControl 
                        options={{
                            size: 'small',
                            float: 'none',
                            position: {
                                right: 40,
                                top: 250,
                            }
                        }}
                    />
                    
                    <GeolocationControl 
                        options={{
                            size: 'small',
                            float: 'none',
                            position: {
                                right: 40,
                                top: 315,
                            } 
                        }}
                    />     
                </Map>
            </YMaps>
        </div>
    )
}


