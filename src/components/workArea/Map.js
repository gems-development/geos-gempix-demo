import React, {useEffect, useCallback } from 'react';
import { YMaps, Map, ZoomControl } from 'react-yandex-maps';
import './Map.css';
import placemarkIcon from '../../assets/img/placemarkIcon.png';
import { pointActions, polylineActions, polygonActions, drawShortestLine } from './MapObjectFactory';
import axios from 'axios';
import store from "../../store/store"
import { showAction, updateOutputAction } from '../../store/actionCreaators/actionCreator';

var coords1 = [];
var coords2 = [];
var stateMonitor1;
var stateMonitor2;
export const selectedObjects = [];
export const tempObjects = [];

// Хуки
export const ymaps = React.createRef(null);
export const placemarkRef = React.createRef(null);
export const mapRef = React.createRef(null);
export const polylineRef = React.createRef(null);
export const polygonRef = React.createRef(null);


// Стартовая геопозиция
const mapState = { center: [54.98517806972585, 73.3714099999999], zoom: 16 };


export default function GemPixMap() {
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
                        "geoObject.addon.editor", "Monitor", "geoObject.addon.hint"
                    ]}
                    instanceRef = {mapRef}
                    onLoad = {(ymapsInstance) => (ymaps.current = ymapsInstance)}
                    state = {mapState} 
                    onClick = {pointActions}
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

/* Инструмент вычисления расстояния */
export function distanceCalcTool() {
    if (selectedObjects.length === 0) {
        alert("Выберите, пожалуйста, объекты для рассчёта!");
        return;
    }
    else {
        const request = createSpatialRelationsRequest();

        axios.post('http://localhost:5148/Distance', request).then(response => {
            if (response.data.line) {
                // Отрисовка линии кратчайшего расстояния
                var geometry = response.data.line.find(coords => coords);
                drawShortestLine(geometry);
            }
            // Демонстрация численного значения расстояния клиенту
            store.dispatch(updateOutputAction("Расстояние между объектами: " + response.data.distance));
            store.dispatch(showAction())
        },
        reject => { console.log(reject); });

        resetObjectState();
    }
}

/* Инструмент для демонстрации пространственных отношений */
export function spatialRelationsTool () {
    
    if (selectedObjects.length === 0) {
        alert("Выберите, пожалуйста, объекты для рассчёта!");
        return;
    }
    else {
        const request = createSpatialRelationsRequest();

        axios.post('http://localhost:5148/SpatialRelations', request).then(response => {
            store.dispatch(updateOutputAction("Пересечение: " + response.data.intersecting + "\n"
                + "Нахождение внутри: " + response.data.inside));
                store.dispatch(showAction())
        },
            reject => { console.log(reject); });

        resetObjectState();
        
    }
}

/* Очистка всех объектов на карте */
export function removeAllObjects () {
    
    mapRef.current.geoObjects.removeAll();  
    store.dispatch(updateOutputAction("Карта очищена"))
    store.dispatch(showAction())
    // Очистка массива выбранных объектов
    selectedObjects.splice(0, selectedObjects.length);
}

/* Формирование запроса к серверу */
function createSpatialRelationsRequest() {
    var coord1;
    var coord2;

    if (selectedObjects[0].geometry.getType() === 'Point') {
        coord1 = [[selectedObjects[0].geometry.getCoordinates()]];
    }
    else if (selectedObjects[0].geometry.getType() === 'LineString') {
        coord1 = [selectedObjects[0].geometry.getCoordinates()];
    }
    else if (selectedObjects[0].geometry.getType() === 'Polygon') {
        coord1 = selectedObjects[0].geometry.getCoordinates();
    }

    if (selectedObjects[1].geometry.getType() === 'Point') {
        coord2 = [[selectedObjects[1].geometry.getCoordinates()]];
    }
    else if (selectedObjects[1].geometry.getType() === 'LineString') {
        coord2 = [selectedObjects[1].geometry.getCoordinates()];
    }
    else if (selectedObjects[1].geometry.getType() === 'Polygon') {
        coord2 = selectedObjects[1].geometry.getCoordinates();
    }
        
    const request = {
        firstObject: coord1,
        secondObject: coord2
    }
    return request;
}

/* Вспомогательные методы */
export function clearTempObjects() {
    mapRef.current.geoObjects.remove(tempObjects.find(x => x));
    tempObjects.splice(0, tempObjects.length);
}

export function getAddress(coords) {
    ymaps.current.geocode(coords).then((res) => {
        const firstGeoObject = res.geoObjects.get(0);
    });
}

export function getPolylineCoords(coordsArr1) {
    coords1.push(coordsArr1);
    stateMonitor1 = new ymaps.current.Monitor(polylineRef.current.editor.state);
    if (!stateMonitor1.drawing) polylineActions();
};

export function getPolygonCoords(coordsArr2) {
    coords2.push(coordsArr2);
    stateMonitor2 = new ymaps.current.Monitor(polygonRef.current.editor.state);
    if (!stateMonitor2.drawing) polygonActions();
};

export function objStateCheck() {
    if (stateMonitor1) {
        polylineRef.current.editor.stopDrawing();
        polylineRef.current.editor.stopEditing();
    }
    if (stateMonitor2) {
        polygonRef.current.editor.stopDrawing();
        polygonRef.current.editor.stopEditing();
    }
}

function resetObjectState() {
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