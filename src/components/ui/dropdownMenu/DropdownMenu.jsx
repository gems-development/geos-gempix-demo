import React, {useState} from "react";
import "./DropdownMenu.css"

import {removeAllObjects} from '../../workArea/Map.js';
import {newPolyline} from '../../workArea/Map.js';
import {newPolygon} from '../../workArea/Map.js';
import {clearTempObjects} from '../../workArea/Map.js';

function DropdownMenu () {
    const [isOpen, setIsOpen] = useState(false);  

    return(
        <div className="DropBtnBlock">

            <button className="MainBtn" onClick={() => setIsOpen(prev => !prev)}>Добавить примитив</button> 
            <span class="material-icons">add</span>

           
            <div className={'dropdown ' + (isOpen ? 'open' : 'closed')}>
                <ul>
                    <li><button className="DropBtn" onClick = {newPolyline}>Полилиния</button>
                    <span class="material-icons">timeline</span></li>
                    
                     
                    <li><button className="DropBtn" onClick = {newPolygon}>Полигон</button>
                    <span class="material-icons">polymer</span></li>
                    <li><button className="DropBtn" onClick = {removeAllObjects}>Очистка всех объектов</button>
                    <span class="material-symbols-outlined">delete</span></li>
                    <li><button className="DropBtn" onClick = {clearTempObjects}>Очистка врем. объектов</button>
                    <span class="material-symbols-outlined">delete</span></li>
                </ul>
            </div>

        </div>
    );
}

export default DropdownMenu