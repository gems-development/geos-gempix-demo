import React, {useState} from "react";
import "./BurgerMenu.css"
import DropdownMenu from "../DropdownMenu/DropdownMenu.js"
const Menu = ({items}) => {

    // to change burger classes
    const [burger_class, setBurgerClass] = useState("burger-bar unclicked")
    const [menu_class, setMenuClass] = useState("menu hidden")
    const [isMenuClicked, setIsMenuClicked] = useState(false)
    

    // toggle burger menu change
    const updateMenu = () => {
        if(!isMenuClicked) {
            setBurgerClass("burger-bar clicked")
            setMenuClass("menu visible")
        }
        else {
            setBurgerClass("burger-bar unclicked")
            setMenuClass("menu hidden")
        }
        setIsMenuClicked(!isMenuClicked)
    }
    return(
        <div style={{width: '100%', height: '1vh'}}>
            <nav>
                <div className="burger-menu" onClick={updateMenu}>
                    <div className={burger_class} ></div>
                    <div className={burger_class} ></div>
                    <div className={burger_class} ></div>
                </div>
            </nav>
            
            

            <div className={menu_class}>
            <nav className="menu_content">
                <ul className="list">
                    <li>
                        <DropdownMenu/>
                    </li>
                    {items.map(item=>
                        <li>
                            <button className="content_button">{item.value}</button>
                        </li>
                        )}
                </ul>

            </nav>
            </div>
        </div>
    )
}

export default Menu