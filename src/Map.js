import React from 'react';
import { YMaps, Map, Placemark, TrafficControl, FullscreenControl, GeolocationControl, 
    ZoomControl, TypeSelector, Rectangle, GeoObject } from 'react-yandex-maps';
import './App.css';

const Map1 = () => {
    return (
        <YMaps>
            <div>
                <Map
                    defaultState={{
                        center: [54.98517806972585,73.3714099999999],
                        zoom: 16,
                    }}
                    className="map-settings">

                    <Placemark geometry = {[54.98517806972585,73.3714099999999]} />

                    <TrafficControl options = {{float: 'right'}} />

                    <Rectangle 
                        geometry={[[54.990,73.41], 
                            [54.98276501800599,73.39322532872805]]} 
                        options={{
                            draggable: true,
                            fillColor: '#ffff0022',
                            strokeColor: '#3caa3c88',
                            strokeWidth: 7
                        }} 
                    />

                    <GeoObject
                        geometry={{
                            type: 'LineString',
                            coordinates: [
                                [54.98517806972585,73.3714099999999],
                                [55.02380056967736,73.2661725],
                            ],
                        }}
                    />

                    <FullscreenControl options={{float: 'left'}} />

                    <GeolocationControl options={{float: 'right'}} />

                    <TypeSelector options={{float: 'right'}} />

                    <ZoomControl options={{float: 'left'}} />
                </Map>
            </div>
        </YMaps>
    );
};

export default Map1;


