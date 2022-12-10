import { ymaps, mapRef, placemarkRef, polylineRef, polygonRef } from './Map';
import { selectedObjects, tempObjects, objStateCheck } from './Map';
import { getAddress, getPolylineCoords, getPolygonCoords } from './Map';
import placemarkIcon from '../../assets/img/placemarkIcon.png';
import selPlacemarkIcon from '../../assets/img/selPlacemarkIcon.png';

// Создание точки
export function createPlacemark(coords) {
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

// Создание полилинии
export function createPolyline() {
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

// Создание полигона
export function createPolygon() {
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

// Создание линии кратчайшего расстояния
export function drawShortestLine(geometry) {
    const shortestLine = new ymaps.current.Polyline(geometry, {},
        {
            strokeColor: "#57f909",
            strokeWidth: 4,
        }
    );
    polylineRef.current = shortestLine;
    tempObjects.push(shortestLine);
    mapRef.current.geoObjects.add(tempObjects.find(x => x));
}

/* Работа с метками на карте */
export function pointActions(e) {
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
    placemarkRef.current.events.add('contextmenu', function (e) {
        var thisPlacemark = e.get('target');
        mapRef.current.geoObjects.remove(thisPlacemark);
    });
}

/* Работа с полилиниями на карте */
export function polylineActions() {
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
    polylineRef.current.events.add('contextmenu', function (e) {
        var thisPolyline = e.get('target');
        mapRef.current.geoObjects.remove(thisPolyline);
    });
}

/* Работа с полигонами на карте */
export function polygonActions() {
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
    polygonRef.current.events.add('contextmenu', function (e) {
        var thisPolygon = e.get('target');
        mapRef.current.geoObjects.remove(thisPolygon);
    });
}