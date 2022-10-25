import React, {useEffect, useCallback} from 'react';
import { YMaps, Map, ZoomControl } from 'react-yandex-maps';
import './Map.css';
import placemarkIcon from '../../assets/img/placemarkIcon.png';

const mapState = {
    center: [54.98517806972585,73.3714099999999],
    zoom: 16
};

var coords1 = [];
var coords2 = [];
var stateMonitor1;
var stateMonitor2;

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
            iconImageHref: placemarkIcon,
            iconImageSize: [46, 46],
            iconImageOffset: [-23, -46],
            draggable: true,
            hideIconOnBalloonOpen: false,
            balloonContentSize: [130, 69], 
            balloonColor: "#cccccc", 
            balloonShadow: true,
            balloonOffset: [0, -45]
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

function getPolylineCoords(coordsArr1) {
    coords1.push(coordsArr1);
    stateMonitor1 = new ymaps.current.Monitor(polylineRef.current.editor.state);
    if (!stateMonitor1.drawing) newPolyline();
};

function getPolygonCoords(coordsArr2) {
    coords2.push(coordsArr2);
    stateMonitor2 = new ymaps.current.Monitor(polygonRef.current.editor.state);
    if (!stateMonitor2.drawing) newPolygon();
};

// Работа с полилиниями на карте
export const newPolyline = () => {
    
    if (stateMonitor2) {
        polygonRef.current.editor.stopDrawing();
        polygonRef.current.editor.stopEditing();
    }
    if (stateMonitor1) {
        polylineRef.current.editor.stopDrawing();
        polylineRef.current.editor.stopEditing();
    }

    const newPolyline = new ymaps.current.Polyline([], 
        {
            balloonContentHeader: 'Полилиния',
            balloonContentBody: 'Длина: [value]',
        },
        {
            editorDrawingCursor: "crosshair",
            editorMaxPoints: 100,
            fillColor: "#0bbcc9",
            strokeColor: "#0bbcc9",
            strokeWidth: 8,
            draggable: true
        }
    );
    polylineRef.current = newPolyline;
    mapRef.current.geoObjects.add(polylineRef.current);

    polylineRef.current.editor.startDrawing();
    polylineRef.current.editor.events.add("drawingstop", function (e) {
        getPolylineCoords(polylineRef.current.geometry.getCoordinates());
    });

    //Удаление полилинии
    polylineRef.current.events.add('contextmenu', function(e) {
        var thisPolyline = e.get('target');
        mapRef.current.geoObjects.remove(thisPolyline);
    });
};

// Работа с полигонами на карте
export const newPolygon = () => {

    if (stateMonitor1) {
        polylineRef.current.editor.stopDrawing();
        polylineRef.current.editor.stopEditing();
    }
    if (stateMonitor2) {
        polygonRef.current.editor.stopDrawing();
        polygonRef.current.editor.stopEditing();
    }
    
    const newPolygon = new ymaps.current.Polygon([], 
        {
            balloonContentHeader: 'Полигон',
            balloonContentBody: 'Периметр: [value] Площадь: [value]',
        },
        {
            editorDrawingCursor: "crosshair",
            editorMaxPoints: 100,
            fillColor: "#b8a7a2aa",
            strokeColor: "#0bbcc9",
            strokeWidth: 8,
            draggable: true
        }
    );

    polygonRef.current = newPolygon;
    mapRef.current.geoObjects.add(polygonRef.current);

    polygonRef.current.editor.startDrawing();
    polygonRef.current.editor.events.add("drawingstop", function (e) {
        getPolygonCoords(polygonRef.current.geometry.getCoordinates());
    });

    //Удаление полигона
    polygonRef.current.events.add('contextmenu', function(e) {
        var thisPolygon = e.get('target');
        mapRef.current.geoObjects.remove(thisPolygon);
    });
};

// Рендеринг карты
export default function Map1() {
    
    // Переход в режим добавления точек нажатием ESC
    const escFunction = useCallback((event) => {
        if (event.keyCode === 27) {
            polylineRef.current.editor.stopDrawing();
            polylineRef.current.editor.stopEditing();
            polygonRef.current.editor.stopDrawing();
            polygonRef.current.editor.stopEditing();
        }
    }, []);
    
    useEffect(() => {
        document.addEventListener("keydown", escFunction, false);
        return () => {document.removeEventListener("keydown", escFunction, false);};
    }, []);

    return (
        <div className="map-size map-container">
            <YMaps>
                <Map
                    className = "map-size map-mode"
                    modules = {["Placemark", "Polyline", "Polygon", "geocode", "geoObject.addon.balloon",
                        "geoObject.addon.editor", "Monitor"]}
                    instanceRef = {mapRef}
                    onLoad = {(ymapsInstance) => (ymaps.current = ymapsInstance)}
                    state = {mapState} 
                    onClick = {newPoint}
                    options = {{suppressMapOpenBlock: true}}
                >
                    <ZoomControl 
                        options={{ size: 'small', float: 'none', position: {right: 40, top: 280} }}
                    />   
                </Map>
            </YMaps>
        </div>
    )
}


