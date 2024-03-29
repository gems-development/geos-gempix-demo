import React from "react";
import "./Header.css"

import {removeAllObjects} from '../workArea/Map.js';
import {distanceCalcTool} from '../workArea/Map.js';
import {spatialRelationsTool} from '../workArea/Map.js';

import vkLogo from "../../assets/img/vkLogo.png";
import ytLogo from "../../assets/img/YtLogo.png";
import gemsLogo from "../../assets/img/gemsLogo.png";

import Menu from'../ui/burgerMenu/BurgerMenu.jsx';

function Header() {

const items = [
    {icon: "square_foot", value: "Измерить расстояние между объектами", onClick: distanceCalcTool },
    { value: "Пространственные отношения", onClick: spatialRelationsTool, icon: "browser_not_supported " },

] 
    
return(
    <header>
          <Menu items={items}/>
            <a href="" className="title">GemPix</a>

            <div className='links'>

            <p>Gems:</p>
            
              <div className='link'>

                <a href="https://gemsdev.ru/"target="_blank" rel="noreferrer"><img src={gemsLogo} width="32"
                  height="32" alt="gemsLogo" /></a>

              </div>
              
              <div className='link'>

                <a href="https://vk.com/gems_development"target="_blank" rel="noreferrer"><img src={vkLogo} width="32"
                  height="32" alt="vkLogo" /></a>

              </div>
              <div className='link'>

                <a href="https://www.youtube.com/channel/UCOAg2UAdziDE-EiTKQtv2Qw"target="_blank" rel="noreferrer"><img src={ytLogo} width="32"
                  height="32" alt="ytLogo" /></a>

              </div>
              
            </div>
    </header>
)
}
export default Header