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

// Обратное геокодирование
const getAddress = (coords) => {
    ymaps.current.geocode(coords).then((res) => {
        const firstGeoObject = res.geoObjects.get(0);
    })
}

// Работа с точками на карте
export const newPoint = e => {
    const coords = e.get("coords");
    const newPlacemark = new ymaps.current.Placemark(coords, 
        {
            balloonContentHeader: 'Точка',
            balloonContentBody: JSON.stringify(coords),
        },
        {
            iconLayout: 'default#image',
            iconImageHref: 'https://cdn-user-icons.flaticon.com/80802/80802443/1664782767840.svg?token=exp=1664783690~hmac=98af978fca0518c27f5b564fd482976c',
            iconImageSize: [46, 46],
            iconImageOffset: [-23, -46],
            draggable: true,
            hideIconOnBalloonOpen: false,
            balloonOffset: [ 0, -45 ]
        }    
    );
    placemarkRef.current = newPlacemark;
    mapRef.current.geoObjects.add(placemarkRef.current);
    placemarkRef.current.events.add("dragend", function () {
        getAddress(placemarkRef.current.geometry.getCoordinates());
    });
    getAddress(coords);

    //Удаление точки
    placemarkRef.current.events.add('contextmenu', function(e) {
        var thisPlacemark = e.get('target');
        mapRef.current.geoObjects.remove(thisPlacemark);
    });
}

// Очистка всех объектов на карте
export const removeAllObjects = () => {
    mapRef.current.geoObjects.removeAll();
}

// Работа с полилиниями на карте
export const newPolyline = () => {
    const newPolyline = new ymaps.current.Polyline([], 
        {
            balloonContentHeader: 'Полилиния',
            balloonContentBody: 'Длина: [value]',
        },
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

    //Удаление полилинии
    polylineRef.current.events.add('contextmenu', function(e) {
        var thisPlacemark = e.get('target');
        mapRef.current.geoObjects.remove(thisPlacemark);
    });
};

// Работа с полигонами на карте
export const newPolygon = () => {
    const newPolygon = new ymaps.current.Polygon([], 
        {
            balloonContentHeader: 'Полигон',
            balloonContentBody: 'Периметр: [value] Площадь: [value]',
        },
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

    //Удаление полигона
    polygonRef.current.events.add('contextmenu', function(e) {
        var thisPlacemark = e.get('target');
        mapRef.current.geoObjects.remove(thisPlacemark);
    });
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
                    onClick = {newPoint}
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


