import React from 'react';
import { YMaps, Map, GeolocationControl, ZoomControl } from 'react-yandex-maps';
import './Map.css';
import './Menu/BurgerMenu.js'

const mapState = {
    center: [54.98517806972585,73.3714099999999],
    zoom: 16
};

export default function Map1() {
    
    const ymaps = React.useRef(null);
    const placemarkRef = React.useRef(null);
    const mapRef = React.useRef(null);
    const polylineRef = React.useRef(null);
    const polygonRef = React.useRef(null);

    // Создание метки
    const createPlacemark = (coords) => {
        return new ymaps.current.Placemark(coords, 
            {
                balloonContentHeader: 'Point Data',
                balloonContentBody: '[coordinates]', 
            },
            {
                iconLayout: 'default#image',
                iconImageHref: 'https://cdn-icons-png.flaticon.com/512/5836/5836608.png',
                iconImageSize: [46, 46],
                iconImageOffset: [-23, -46],
                draggable: true 
            }
        );
    };

    // Обратное геокодирование
    const getAddress = (coords) => {
        ymaps.current.geocode(coords).then((res) => {
            const firstGeoObject = res.geoObjects.get(0);
        })
    }
    
    // Добавление метки на карту по адресу клика
    const addPoint = (e) => {
        const coords = e.get("coords");
        placemarkRef.current = createPlacemark(coords);
        mapRef.current.geoObjects.add(placemarkRef.current);
        placemarkRef.current.events.add("dragend", function () {
            getAddress(placemarkRef.current.geometry.getCoordinates());
        });
        getAddress(coords);
    };

    // Добавление полилиний на карту
    const addPolyline = e => {
        const newPolyline = new ymaps.current.Polyline([], {},
            {
                editorDrawingCursor: "crosshair",
                editorMaxPoints: 2,
                fillColor: "#00FF00",
                strokeColor: "#0000FF",
                strokeWidth: 5
            }
        );
        polylineRef.current = newPolyline;
        mapRef.current.geoObjects.add(polylineRef.current);
        polylineRef.current.editor.startDrawing();
    };

    // Добавление полигона на карту
    const addPolygon = e => {
        const newPolygon = new ymaps.current.Polygon([], {},
            {
                editorDrawingCursor: "crosshair",
                editorMaxPoints: 5,
                fillColor: "#00FF00",
                strokeColor: "#0000FF",
                strokeWidth: 5
            }
        );
        polygonRef.current = newPolygon;
        mapRef.current.geoObjects.add(polygonRef.current);
        polygonRef.current.editor.startDrawing();
    };

    // Рендеринг карты
    return (
        <div className="map-size map-container">
            <YMaps>
                <Map
                    className = "map-size map-mode"
                    modules={["Placemark", "Polyline", "Polygon", "geocode", "geoObject.addon.balloon",
                        "geoObject.addon.editor"]}
                    instanceRef={mapRef}
                    onLoad={(ymapsInstance) => (ymaps.current = ymapsInstance)}
                    //onClick={addPoint}
                    onClick={addPolyline}
                    //onClick={addPolygon}
                    state={mapState} 
                    options={{suppressMapOpenBlock: true}}
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
                        className="zoombar-style"
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


