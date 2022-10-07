import React, {createRef, useState, } from "react";
import "./DropdownMenu.css"
import {removeAllObjects} from '../Map';
import {newPolyline} from '../Map';
import {newPolygon} from '../Map';

function DropdownMenu () {
    const [isOpen, setIsOpen] = useState(false);  

    return(
        <div className="DropBtnBlock">

            <button className="DropBtn" onClick={() => setIsOpen(prev => !prev)}>Добавить примитив</button> 
            <div className={'dropdown ' + (isOpen ? 'open' : 'closed')}>
                <ul>
                    <li><button className="DropBtn" onClick = {newPolyline}>Полилиния</button></li>
                    <li><button className="DropBtn" onClick = {newPolygon}>Полигон</button></li>
                    <li><button className="DropBtn" onClick = {removeAllObjects}>Очистка</button></li>
                </ul>
            </div>

        </div>
    );
}

export default DropdownMenu