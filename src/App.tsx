import gavelBlack from './images/gavelBlack.png';
import userBlack from "./images/userBlack.png";
import scrollBlack from "./images/scrollBlack.png";
import heartBlack from "./images/heartBlack.png";
import gearBlack from "./images/gearBlack.png";
import Header from "./components/Header";
import NavItem from "./components/NavItem";
import Profile from './components/Profile/Profile';
import { useEffect, useState } from 'react';

const App = () => {
  
  const [isMenuVisible, setMenuVisible] = useState<boolean>(false);
  const width = window.innerWidth
  console.log(width)
    useEffect(() => {
      if(width > 1025 && !isMenuVisible){
        setMenuVisible(true)
      }else{
        setMenuVisible(false)
      }
    }, [width, setMenuVisible])
  return (
    <>
      <Header />
      <div className="interfaceWrapper">
      <nav>
        {isMenuVisible === true ?
          <ul>
            <NavItem
              image={userBlack}
              itemName="Profil"
            />
            <NavItem
              image={scrollBlack}
              itemName="Ogłoszenia"
            />
            <NavItem
              image={heartBlack}
              itemName="Ulubione"
            />
            <NavItem
              image={gavelBlack}
              itemName="Opinie"
            />
            <NavItem
              image={gearBlack}
              itemName="Ustawienia konta"
            />
            <li>
              <button>
                Wyloguj
              </button>
            </li>
          </ul>
          : null}
          {width < 1025 ?  <button onClick={() => setMenuVisible(!isMenuVisible)} className='mobileMenuOpen'>M</button> : null}
        
        </nav> 
        <div className="feed">
          <div className="feed__basicValues">
            <div className='section0'><Profile/></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;