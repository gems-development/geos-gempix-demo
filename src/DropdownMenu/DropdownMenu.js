import React, {createRef, useState, } from "react";
import "./DropdownMenu.css"
import {addPoint} from '../Map';
import {addPolyline} from '../Map';
import {addPolygon} from '../Map';

function DropdownMenu () {
    const [isOpen, setIsOpen] = useState(false);  

    return(
        <div className="DropBtnBlock">

            <button className="DropBtn" onClick={() => setIsOpen(prev => !prev)}>Добавить примитив</button> 
            <div className={'dropdown ' + (isOpen ? 'open' : 'closed')}>
                <ul>
                    <li><button className="DropBtn" onClick = {addPoint}>Точка</button></li>
                    <li><button className="DropBtn" onClick = {addPolyline}>Полилиния</button></li>
                    <li><button className="DropBtn" onClick = {addPolygon}>Полигон</button></li>
                </ul>
            </div>

        </div>
    );
}

export default DropdownMenu