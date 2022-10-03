import React, {useState} from "react";
import "./DropdownMenu.css"


function DropdownMenu () {
    const [isOpen, setIsOpen] = useState(false);
    return(
        <div className="DropBtnBlock">

            <button className="DropBtn" onClick={() => setIsOpen(prev => !prev)}>Добавить примитив</button> 
            <div className={'dropdown ' + (isOpen ? 'open' : 'closed')}>
                <ul>
                <li><button className="DropBtn">Точка</button></li>
                <li><button className="DropBtn">Полилиния</button></li>
                <li><button className="DropBtn">Полигон</button></li>
                </ul>
            </div>
        </div>
    );
}

export default DropdownMenu