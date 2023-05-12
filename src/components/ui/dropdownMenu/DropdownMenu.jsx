import React, {useState} from "react";
import "./DropdownMenu.css"

import {removeAllObjects} from '../../workArea/Map.js';
import {polylineActions} from '../../workArea/MapObjectFactory.js';
import {polygonActions} from '../../workArea/MapObjectFactory.js';

function DropdownMenu () {
    const [isOpen, setIsOpen] = useState(false);  

    return(
        <div className="DropBtnBlock">
            <span class="material-icons">add</span>
            <button className="MainBtn" onClick={() => setIsOpen(prev => !prev)}>Добавить примитив</button> 
            

            <div className={'dropdown ' + (isOpen ? 'open' : 'closed')}>
                <ul>                  
                    <li><span class="material-icons">timeline</span>
                    <button className="DropBtn" onClick = {polylineActions}>Полилиния</button></li>
                    <li><span class="material-symbols-outlined">variables</span>
                    <button className="DropBtn" onClick = {polygonActions}>Полигон</button>                   </li>
                    <li><span class="material-symbols-outlined">delete</span>
                    <button className="DropBtn" onClick = {removeAllObjects}>Очистка</button></li>
                </ul>
            </div>

        </div>
    );
}

export default DropdownMenu