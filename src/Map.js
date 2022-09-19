import React, { useCallback } from 'react';
import { YMaps, Map, Placemark, GeolocationControl, ZoomControl, 
    Rectangle, GeoObject } from 'react-yandex-maps';
import './App.css';
import './Map.css';

const Map1 = () => {
    let center = [54.98517806972585,73.3714099999999];

    return (
        <YMaps>
            <callBack></callBack>
            <div className="map-container">

                <div className="child aux-unit"></div>
                <Map
                    defaultState = {{
                        center: center,
                        zoom: 16,
                    }}
                    className = "child map-mode"
                >

                    <ZoomControl 
                        options = {{
                            size: 'small',
                            float: 'none',
                            position: {
                                right: 40,
                                top: 250,
                            }
                        }}
                    />
                    
                    <GeolocationControl 
                        options = {{
                            size: 'small',
                            float: 'none',
                            position: {
                                right: 40,
                                top: 315,
                            } 
                        }}
                    />
                    
                    <Placemark
                        modules = {['geoObject.addon.balloon']} 
                        defaultGeometry = {center}                        
                        properties = {{
                            balloonContentHeader: 'balloon header',
                            balloonContentBody: 'Здесь будет информация о точке!',
                            balloonContentFooter: 'balloon footer', 
                            
                        }}
                        options = {{
                            iconLayout: 'default#image',
                            iconImageHref: 'https://cdn-icons-png.flaticon.com/512/5836/5836608.png',
                            iconImageSize: [46, 57],
                            iconImageOffset: [-23, -57],
                            draggable: true,
                        }}  
                    />
                </Map>
            </div>
        </YMaps>
    )
};

export default Map1;


