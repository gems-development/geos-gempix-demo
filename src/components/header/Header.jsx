import React from "react";
import "./Header.css"

import {removeAllObjects} from '../workArea/Map.js';
import {distanceCalcTool} from '../workArea/Map.js';
import {createSpatialRelationsRequest} from '../workArea/Map.js';

import vkLogo from "../../assets/img/vkLogo.png";
import ytLogo from "../../assets/img/YtLogo.png";
import gemsLogo from "../../assets/img/gemsLogo.png";

import Menu from'../ui/burgerMenu/BurgerMenu.jsx';

function Header() {

const items = [
    { value: "Измерить расстояние между объектами", onClick: distanceCalcTool, icon: "square_foot" },
    { value: "Пространственные отношения", onClick: createSpatialRelationsRequest, icon: "help_center" },

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