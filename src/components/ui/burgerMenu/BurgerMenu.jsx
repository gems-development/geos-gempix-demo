import React, {useState} from "react";
import "./BurgerMenu.css"
import DropdownMenu from "../dropdownMenu/DropdownMenu.jsx"

import vkLogo from "../../../assets/img/vkLogo.png";
import ytLogo from "../../../assets/img/YtLogo.png";
import gemsLogo from "../../../assets/img/gemsLogo.png";



const Menu = ({items}) => {
    const [burger_class, setBurgerClass] = useState("burger-bar unclicked")
    const [menu_class, setMenuClass] = useState("menu hidden")
    const [isMenuClicked, setIsMenuClicked] = useState(false)

    
    const[isMenuMustMoving, setIsMenuMustMoving] = useState( {matches: window.innerWidth > 768 ? true : false})
    // let mediaQuery = window.matchMedia('(max-width: 768px)')
    // mediaQuery.addEventListener("test" ,handleTabletChange)
    // handleTabletChange(mediaQuery)
    // function handleTabletChange(e) {
    //     if (e.matches) {
          
    //     }
    //   }

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
                <div className="burger-menu"  onClick={updateMenu}>
                    <div className={burger_class} ></div>
                    <div className={burger_class} ></div>
                    <div className={burger_class} ></div>
                </div>
            </nav>
            
            

            <div className={menu_class} >
                
            <nav className="menu_content">
                <ul className="list">
                    <li>
                        <DropdownMenu  onClick = {isMenuMustMoving && !isMenuMustMoving.matches ?  updateMenu : ''}/>
                    </li>
                    {items.map(item=>                    
                        <li onClick = {isMenuMustMoving && !isMenuMustMoving.matches ?  updateMenu : ''}>
                            <button className="content_button" onClick ={item.onClick} >{item.value}</button>
                            <span class="material-icons">{item.icon}</span>
                        </li>
                        )}
                </ul>

            </nav>
            <div className='links__menu'>
              <div className='link__menu' >

                <a href="https://gemsdev.ru/"target="_blank" rel="noreferrer"><img src={gemsLogo} width="32"
                  height="32" alt="gemsLogo" /></a>

              </div>
              
              <div className='link__menu'>

                <a href="https://vk.com/gems_development"target="_blank" rel="noreferrer"><img src={vkLogo} width="32"
                  height="32" alt="vkLogo" /></a>

              </div>
              <div className='link__menu'>

                <a href="https://www.youtube.com/channel/UCOAg2UAdziDE-EiTKQtv2Qw"target="_blank" rel="noreferrer"><img src={ytLogo} width="32"
                  height="32" alt="ytLogo" /></a>

              </div>
              
            </div>
            </div>
        </div>
    )
}

export default Menu