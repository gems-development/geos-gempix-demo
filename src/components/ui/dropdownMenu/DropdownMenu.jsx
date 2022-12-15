import React, {useState} from "react";
import "./DropdownMenu.css"

import {removeAllObjects} from '../../workArea/Map.js';
import {polylineActions} from '../../workArea/MapObjectFactory.js';
import {polygonActions} from '../../workArea/MapObjectFactory.js';

function DropdownMenu () {
    const [isOpen, setIsOpen] = useState(false);  

    return(
        <div className="DropBtnBlock">

            <button className="MainBtn" onClick={() => setIsOpen(prev => !prev)}>Добавить примитив</button> 
            <span class="material-icons">add</span>

            <div className={'dropdown ' + (isOpen ? 'open' : 'closed')}>
                <ul>
                    <li><button className="DropBtn" onClick = {polylineActions}>Полилиния</button>
                    <span class="material-icons">timeline</span></li>
                    <li><button className="DropBtn" onClick = {polygonActions}>Полигон</button>
                    <span class="material-icons">polymer</span></li>
                    <li><button className="DropBtn" onClick = {removeAllObjects}>Очистка</button>
                    <span class="material-symbols-outlined">delete</span></li>
                </ul>
            </div>

        </div>
    );
}

export default DropdownMenu