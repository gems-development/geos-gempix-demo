import React, {useEffect, useCallback, useState } from 'react';
import { YMaps, Map, ZoomControl } from 'react-yandex-maps';
import './Map.css';
import placemarkIcon from '../../assets/img/placemarkIcon.png';
import selPlacemarkIcon from '../../assets/img/selPlacemarkIcon.png';
import axios from 'axios';
import {Info} from '../ui/Info/Info'

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
const selectedObjects = [];

// Обратное геокодирование
const getAddress = (coords) => {
    ymaps.current.geocode(coords).then((res) => {
        const firstGeoObject = res.geoObjects.get(0);
    })
}

// Создание точки
function createPlacemark(coords) {
    return new ymaps.current.Placemark(coords, 
        {
            //balloonContentHeader: 'Точка',
            //balloonContentBody: JSON.stringify(coords),
            //hintContent: JSON.stringify(coords)
        },
        {
            iconLayout: 'default#image',
            iconImageHref: placemarkIcon,
            iconImageSize: [46, 46],
            iconImageOffset: [-23, -46],
            draggable: true,
            hideIconOnBalloonOpen: false,
            balloonOffset: [0, -45]
        }    
    );
}

/* Работа с точками на карте */
export const newPoint = e => {
    // Добавление метки по адресу клика
    const coordinates = e.get("coords");
    const newPlacemark = createPlacemark(coordinates);
    placemarkRef.current = newPlacemark;
    mapRef.current.geoObjects.add(placemarkRef.current);

    placemarkRef.current.events.add("click", function (e) {
        if (selectedObjects.length == 2) {
            console.log("Array is full!");
            return;
        }
        else {
            var thisPlacemark = e.get('target');
            thisPlacemark.options.set({
                iconLayout: 'default#image',
                iconImageHref: selPlacemarkIcon,
                iconImageSize: [46, 46],
                iconImageOffset: [-23, -46],
                draggable: true,
                hideIconOnBalloonOpen: false,
                balloonOffset: [0, -45]
            });
            selectedObjects.push(thisPlacemark);
        }    
    });

    placemarkRef.current.events.add("dragend", function () {
        getAddress(placemarkRef.current.geometry.getCoordinates());
    });
    getAddress(coordinates);

    // Удаление метки
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

function objStateCheck() {
    if (stateMonitor1) {
        polylineRef.current.editor.stopDrawing();
        polylineRef.current.editor.stopEditing();
    }
    if (stateMonitor2) {
        polygonRef.current.editor.stopDrawing();
        polygonRef.current.editor.stopEditing();
    }
}

// Создание полилинии
function createPolyline(maxPoints, color) {
    return new ymaps.current.Polyline([], 
        {
            balloonContentHeader: 'Полилиния',
            balloonContentBody: 'Длина: [value]',
        },
        {
            editorDrawingCursor: "crosshair",
            editorMaxPoints: maxPoints,
            fillColor: color,
            strokeColor: color,
            strokeWidth: 8,
            draggable: true
        }
    );
}

/* Работа с полилиниями на карте */
export const newPolyline = () => {
    objStateCheck();
    const newPolyline = createPolyline(100, "#0bbcc9");
    polylineRef.current = newPolyline;
    mapRef.current.geoObjects.add(polylineRef.current);

    polylineRef.current.editor.startDrawing();
    polylineRef.current.editor.events.add("drawingstop", function (e) {
        getPolylineCoords(polylineRef.current.geometry.getCoordinates());
    });

    // Удаление полилинии
    polylineRef.current.events.add('contextmenu', function(e) {
        var thisPolyline = e.get('target');
        mapRef.current.geoObjects.remove(thisPolyline);
    });
};

// Создание полигона
function createPolygon() {
    return new ymaps.current.Polygon([], 
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
}

/* Работа с полигонами на карте */
export const newPolygon = () => {
    objStateCheck();
    const newPolygon = createPolygon();
    polygonRef.current = newPolygon;
    mapRef.current.geoObjects.add(polygonRef.current);

    polygonRef.current.editor.startDrawing();
    polygonRef.current.editor.events.add("drawingstop", function (e) {
        getPolygonCoords(polygonRef.current.geometry.getCoordinates());
    });

    // Удаление полигона
    polygonRef.current.events.add('contextmenu', function(e) {
        var thisPolygon = e.get('target');
        mapRef.current.geoObjects.remove(thisPolygon);
    });
};

// Инструмент вычисления расстояния
export const useCalcTool = () => {

    if (selectedObjects.length == 0) {
        alert("Выберите, пожалуйста, объекты для рассчёта!")
        return;
    }
    else {
        const request = {
            firstObject: [selectedObjects[0].geometry.getCoordinates()],
            secondObject: [selectedObjects[1].geometry.getCoordinates()]
        }
    
        axios.post('http://localhost:5148/Distance', request).then(response => {
          //  Info(selectedObjects[1], response.data);
            
        },
        reject => {
            console.log(reject);
        });
    
        selectedObjects.splice(0, selectedObjects.length);
    
        placemarkRef.current.options.set({
            iconLayout: 'default#image',
            iconImageHref: placemarkIcon,
            iconImageSize: [46, 46],
            iconImageOffset: [-23, -46],
            draggable: true,
            hideIconOnBalloonOpen: false,
            balloonOffset: [0, -45]
        });
    }

    /*
    const [appState, setAppState] = useState(null);
    useEffect(() => {
        axios.get('http://localhost:5148/WeatherForecast').then(response => {
            const data = response.data;
            setAppState(data);
        },
        reject => {
            console.log(reject);
        });
    }, []);
    return appState;
    
    axios.get('http://localhost:5148/WeatherForecast').then(response => {
        console.log(response.data);
    },
    reject => {
        console.log(reject);
    });
    */
}
 
export default function Map1() {
    /* Переход в режим добавления точек нажатием ESC */
    const escFunction = useCallback((event) => {
        if (event.keyCode === 27) objStateCheck();
    }, []);
    
    useEffect(() => {
        document.addEventListener("keydown", escFunction, false);
        return () => {document.removeEventListener("keydown", escFunction, false);};
    }, []);

    /* Рендеринг карты */
    return (
        <div className="map-size map-container">
            <YMaps>
                <Map
                    className = "map-size map-mode"
                    modules = {[
                        "Placemark", "Polyline", "Polygon", "geocode", "geoObject.addon.balloon",
                        "geoObject.addon.editor", "Monitor", "geoObject.addon.hint", "GeoObjectCollection",
                        "ObjectManager"
                    ]}
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


