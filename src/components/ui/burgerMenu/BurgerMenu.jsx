import React, {useState} from "react";
import "./BurgerMenu.css"
import DropdownMenu from "../dropdownMenu/DropdownMenu.jsx"


const Menu = ({items}) => {
    const [burger_class, setBurgerClass] = useState("burger-bar unclicked")
    const [menu_class, setMenuClass] = useState("menu hidden")
    const [isMenuClicked, setIsMenuClicked] = useState(false)

    const mediaQuery = window.matchMedia('(min-width: 768px)')

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
        <div>
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
                            <button className="content_button" onClick ={item.onClick} >{item.value}</button>
                            <span class="material-icons">{item.icon}</span>
                        </li>
                        )}
                </ul>

            </nav>
            </div>
        </div>
    )
}

export default Menu