import React, {useState, Component} from "react";
import {Text, View} from "react";
import "./Info.css";
import { YMaps, Map, ZoomControl } from 'react-yandex-maps';
import mapRef from '../../workArea/Map.js';
import ymaps from '../../workArea/Map.js';
import mapState from '../../workArea/Map.js';

export default Info
function Info (text) {
    const [isVisible, setIsOpen] = useState(true);

    let data = "Denis";
    return(
        <div className={'info-area ' + (isVisible? 'visible-i' : 'hidden-i')} >
                       <span className="information">Hi, {data.valueOf()}</span>
                       
                       <span className="closeBtn">
                       <span class="material-icons" onClick={() => setIsOpen(prev => !prev)}>close</span>
                       </span>
        </div>
    )
}
     
  



