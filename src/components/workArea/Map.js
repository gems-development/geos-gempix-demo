import React, {useEffect, useCallback, useState } from 'react';
import { YMaps, Map, ZoomControl } from 'react-yandex-maps';
import './Map.css';
import placemarkIcon from '../../assets/img/placemarkIcon.png';
import selPlacemarkIcon from '../../assets/img/selPlacemarkIcon.png';
import axios from 'axios';

const mapState = {
    center: [54.98517806972585,73.3714099999999],
    zoom: 16
};

var coords1 = [];
var coords2 = [];
var stateMonitor1;
var stateMonitor2;
const selectedObjects = [];

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

// Создание точки
function createPlacemark(coords) {
    return new ymaps.current.Placemark(coords, {},
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

/* Работа с метками на карте */
export const newPoint = e => {
    // Отрисовка метки по адресу клика
    const coordinates = e.get("coords");
    const newPlacemark = createPlacemark(coordinates);
    placemarkRef.current = newPlacemark;
    mapRef.current.geoObjects.add(placemarkRef.current);

    placemarkRef.current.events.add("dragend", function () {
        getAddress(placemarkRef.current.geometry.getCoordinates());
    });
    getAddress(coordinates);

    // Выделение метки
    placemarkRef.current.events.add("click", function (e) {
        if (selectedObjects.length == 2) {
            console.log("Array is full!");
            return;
        }
        else {
            var thisPlacemark = e.get('target');
            thisPlacemark.options.set({ iconImageHref: selPlacemarkIcon });
            selectedObjects.push(thisPlacemark);
        }    
    });

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
function createPolyline() {
    return new ymaps.current.Polyline([], {},
        {
            editorDrawingCursor: "crosshair",
            editorMaxPoints: 100,
            strokeColor: "#0bbcc9",
            strokeWidth: 8,
            draggable: true
        }
    );
}

/* Работа с полилиниями на карте */
export const newPolyline = () => {
    objStateCheck();

    // Отрисовка полилинии
    const newPolyline = createPolyline();
    polylineRef.current = newPolyline;
    mapRef.current.geoObjects.add(polylineRef.current);
    polylineRef.current.editor.startDrawing();
    polylineRef.current.editor.events.add("drawingstop", function (e) {
        getPolylineCoords(polylineRef.current.geometry.getCoordinates());
    });

    // Выделение полилинии
    polylineRef.current.events.add("click", function (e) {
        if (selectedObjects.length == 2) {
            console.log("Array is full!");
            return;
        }
        else {
            var thisPolyline = e.get('target');
            thisPolyline.options.set({ strokeColor: "#f44336" });
            selectedObjects.push(thisPolyline);
        }    
    });

    // Удаление полилинии
    polylineRef.current.events.add('contextmenu', function(e) {
        var thisPolyline = e.get('target');
        mapRef.current.geoObjects.remove(thisPolyline);
    });
};

// Создание полигона
function createPolygon() {
    return new ymaps.current.Polygon([], {},
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

    // Отрисовка полигона
    const newPolygon = createPolygon();
    polygonRef.current = newPolygon;
    mapRef.current.geoObjects.add(polygonRef.current);
    polygonRef.current.editor.startDrawing();
    polygonRef.current.editor.events.add("drawingstop", function (e) {
        getPolygonCoords(polygonRef.current.geometry.getCoordinates());
    });

    // Выделение полигона
    polygonRef.current.events.add("click", function (e) {
        if (selectedObjects.length == 2) {
            console.log("Array is full!");
            return;
        }
        else {
            var thisPolygon = e.get('target');
            thisPolygon.options.set({ strokeColor: "#f44336" });
            selectedObjects.push(thisPolygon);
        }    
    });

    // Удаление полигона
    polygonRef.current.events.add('contextmenu', function(e) {
        var thisPolygon = e.get('target');
        mapRef.current.geoObjects.remove(thisPolygon);
    });
};

// Создание и отрисовка линии кратчайшего расстояния
function drawShortestLine(geometry) {
    const shortestLine = new ymaps.current.Polyline(geometry, {},
        {
            editorDrawingCursor: "crosshair",
            editorMaxPoints: 100,
            strokeColor: "#0bbcc9",
            strokeWidth: 8,
            draggable: true
        }
    );
    shortestLine.options.set(geometry, {},
        {
            strokeColor: "#57f909",
            strokeWidth: 6,
        }
    );
    polylineRef.current = shortestLine;
    mapRef.current.geoObjects.add(polylineRef.current);
}

// Инструмент вычисления расстояния
export const distanceCalcTool = () => {
    var coord1;
    var coord2;
    if (selectedObjects.length == 0) {
        alert("Выберите, пожалуйста, объекты для рассчёта!")
        return;
    }
    else {
        coord1 = selectedObjects[0].geometry.getType() === 'Point'
            ?[[selectedObjects[0].geometry.getCoordinates()]]
            :(selectedObjects[0].geometry.getType() === 'LineString'
                ?[selectedObjects[0].geometry.getCoordinates()]
                :selectedObjects[0].geometry.getCoordinates());
        coord2 = selectedObjects[1].geometry.getType() === 'Point'
            ?[[selectedObjects[1].geometry.getCoordinates()]]
            :(selectedObjects[1].geometry.getType() === 'LineString'
                ?[selectedObjects[1].geometry.getCoordinates()]
                :selectedObjects[1].geometry.getCoordinates());
        
        const request = {
            firstObject: coord1,
            secondObject: coord2
        }
    
        // Отправка запроса на сервер и демонстрация результата клиенту
        axios.post('http://localhost:5148/Distance', request).then(response => {
            var geometry = response.data.line;
            shortestLine(geometry);
            alert(response.data.distance);
        },
        reject => {
            console.log(reject);
        });

        // Снятие выделения с выбранных объектов
        for (var i = 0; i < 2; i++) {
            selectedObjects[i].options.set({
                strokeColor: "#0bbcc9",
                iconImageHref: placemarkIcon
            });
        }
        // Очистка массива выбранных объектов
        selectedObjects.splice(0, selectedObjects.length);
    }
}

export const spatialRelationsTool = () => {
    var coord1;
    var coord2;
    if (selectedObjects.length == 0) {
        alert("Выберите, пожалуйста, объекты для рассчёта!")
        return;
    }
    else {
        coord1 = selectedObjects[0].geometry.getType() === 'Point'
            ?[[selectedObjects[0].geometry.getCoordinates()]]
            :(selectedObjects[0].geometry.getType() === 'LineString'
                ?[selectedObjects[0].geometry.getCoordinates()]
                :selectedObjects[0].geometry.getCoordinates());
        coord2 = selectedObjects[1].geometry.getType() === 'Point'
            ?[[selectedObjects[1].geometry.getCoordinates()]]
            :(selectedObjects[1].geometry.getType() === 'LineString'
                ?[selectedObjects[1].geometry.getCoordinates()]
                :selectedObjects[1].geometry.getCoordinates());
        
        const request = {
            firstObject: coord1,
            secondObject: coord2
        }
    
        // Отправка запроса на сервер и демонстрация результата клиенту
        axios.post('http://localhost:5148/SpatialRelations', request).then(response => {
            alert("Пересечение: " + response.data.intersecting + "\n" 
            + "Нахождение внутри: " + response.data.inside);
        },
        reject => {
            console.log(reject);
        });

        // Снятие выделения с выбранных объектов
        for (var i = 0; i < 2; i++) {
            selectedObjects[i].options.set({
                strokeColor: "#0bbcc9",
                iconImageHref: placemarkIcon
            });
        }
        // Очистка массива выбранных объектов
        selectedObjects.splice(0, selectedObjects.length);
    }
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


