import './App.css';
import Map1 from './Map';
import vkLogo from "./img/vkLogo.png";
import YtLogo from "./img/YtLogo.png";
import GLogo from "./img/g.png";
import Menu from'./Menu/BurderMenu.js';

function App() {
  return (
    <div>
      <body>
        <header>
            
          <div className='container__head'>
          <div className='burger-menu'>
          <Menu/>
            </div>
            <div className="title">GemPix</div>

            <div className='links'>

            <div className='blogs'>Gems:</div>
            
              
              <div className='link'>

                <a href="https://gemsdev.ru/"><img src={GLogo} width="32"
                  height="32" alt="vkLogo" /></a>

              </div>
              
              <div className='link'>

                <a href="https://vk.com/gems_development"><img src={vkLogo} width="32"
                  height="32" alt="vkLogo" /></a>

              </div>
              <div className='link'>

                <a href="https://www.youtube.com/channel/UCOAg2UAdziDE-EiTKQtv2Qw"><img src={YtLogo} width="32"
                  height="32" alt="vkLogo" /></a>

              </div>
              


            </div>
          </div>
        </header>

        <div className="work_area">
          <div>
            <Map1></Map1>
          </div>
        </div>

        <footer>
          <div class="post">Gems Development | post@gemsdev.ru</div>
        </footer>
      </body>
    </div>
  );
}

export default App;
