import { useEffect, useState } from 'react';

function Home() {

  const [active, setActive] = useState('home');
  const [openSidebar, setOpenSidebar] = useState(false);


  useEffect(() => {
    function checkScroll() {
      if(window.innerWidth >= 700) {
        if(document.documentElement.scrollTop < 600) {
          setActive('home');
        }
        if(document.documentElement.scrollTop >= 600) {
          setActive('destination');
        }
        if(document.documentElement.scrollTop >= 1750) {
          setActive('crew');
        } 
        if(document.documentElement.scrollTop >= 2800) {
          setActive('technology');
        }
      } else {
        if(document.documentElement.scrollTop < 500) {
          setActive('home');
        }
        if(document.documentElement.scrollTop >= 500) {
          setActive('destination');
        }
        if(document.documentElement.scrollTop >= 1500) {
          setActive('crew');
        } 
        if(document.documentElement.scrollTop >= 2500) {
          setActive('technology');
        }
      }
    };

    checkScroll();

    window.addEventListener('scroll', checkScroll);

    return () => {
      window.removeEventListener('scroll', checkScroll);
    }

  }, []);

  return (
    <>
      <header id="home">
        <nav>
          <a href="/" className="logo">
            <img src="assets/shared/logo.svg" alt="logo" />
          </a>
          <ul className={`links` + (openSidebar ? ' active' : '')}>
            <button className="close" onClick={() => setOpenSidebar(false)}>
              <i className="fas fa-close"></i>
            </button>
            <li>
              <a href="#home" className={active == 'home' ? 'active' : ''} onClick={() => setActive('home')}>
                <span>01</span>home
              </a>
            </li>
            <li>
              <a href="#destination" className={active == 'destination' ? 'active' : ''} onClick={() => setActive('destination')}>
                <span>02</span>Destination
              </a>
            </li>
            <li>
              <a href="#crew" className={active == 'crew' ? 'active' : ''} onClick={() => setActive('crew')}>
                <span>03</span>Crew
              </a>
            </li>
            <li>
              <a href="#technology" className={active == 'technology' ? 'active' : ''} onClick={() => setActive('technology')}>
                <span>04</span>Technology
              </a>
            </li>
          </ul>
          <button className="menubar" onClick={() => setOpenSidebar(true)}>
            <i className="fas fa-bars"></i>
          </button>
        </nav>
        <div className="header-details">
          <div className="content">
            <p className="title">so, you want to travel to</p>
            <h1 className="subtitle">Space</h1>
            <small>
              Let’s face it; if you want to go to space, you might as well
              genuinely go to outer space and not hover kind of on the edge of
              it. Well sit back, and relax because we’ll give you a truly out of
              this world experience!
            </small>
          </div>
          <div className="explore">
            <span>explore</span>
          </div>
        </div>
      </header>
    </>
  );
}

export default Home;
