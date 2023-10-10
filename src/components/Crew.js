import { useState } from 'react';
import { useSpring, animated, config } from '@react-spring/web';
import { useInView } from '@react-spring/web';

const crews = [
  {
    name: "Douglas Hurley",
    image:"assets/crew/image-douglas-hurley.png",
    role: "Commander",
    bio: "Douglas Gerald Hurley is an American engineer, former Marine Corps pilot and former NASA astronaut. He launched into space for the third time as commander of Crew Dragon Demo-2."
  },
  {
    name: "Mark Shuttleworth",
    image:"assets/crew/image-mark-shuttleworth.png",
    role: "Mission Specialist",
    bio: "Mark Richard Shuttleworth is the founder and CEO of Canonical, the company behind the Linux-based Ubuntu operating system. Shuttleworth became the first South African to travel to space as a space tourist."
  },
  {
    name: "Victor Glover",
    image:"assets/crew/image-victor-glover.png",
    role: "Pilot",
    bio: "Pilot on the first operational flight of the SpaceX Crew Dragon to the International Space Station. Glover is a commander in the U.S. Navy where he pilots an F/A-18.He was a crew member of Expedition 64, and served as a station systems flight engineer."
  },
  {
    name: "Anousheh Ansari",
    image:"assets/crew/image-anousheh-ansari.png",
    role: "Flight Engineer",
    bio: "Anousheh Ansari is an Iranian American engineer and co-founder of Prodea Systems. Ansari was the fourth self-funded space tourist, the first self-funded woman to fly to the ISS, and the first Iranian in space."
  }
];

function Crew() {

  const [index, setIndex] = useState(3);
      const [activeDest, setActiveDest] = useState('Anousheh Ansari');
  
      function setActive(index, activeDest) {
          setIndex(index);
          setActiveDest(activeDest);
          setAnimationOfTop({
              from: {
                  opacity: 0, 
                  transform: 'translateX(-50%)'
              },
              to: {
                  opacity: 1,
                  transform: 'translateX(0)',
              },
          })
      }
  
      const [ref, inView] = useInView({
          triggerOnce: true,
      });
      
      const [animationOfTop, setAnimationOfTop] = useSpring(() => ({
          opacity: 0, 
      }));
      
      if(inView) {
          setAnimationOfTop({
              opacity: 1,
              config: config.molasses,
              delay: 400
          })
      } else {
          setAnimationOfTop({
              opacity: 0, 
          })
      }

    return (
        <div className="crew" id='crew'>
            <h1 className="crew-title"><span>02</span> meet your crew</h1>
            <div className="image-info" ref={ref}>
                <animated.div className="info" style={animationOfTop}>
                  <p className="title">{crews[index].role}</p>
                  <h1 className="subtitle">{crews[index].name}</h1>
                  <small className="desc">{crews[index].bio}</small>
                  <div className="dots">
                    <div className={`dot` + (activeDest == 'Douglas Hurley' ? ' active' : '')} onClick={() => setActive(0, 'Douglas Hurley')}></div>
                    <div className={`dot` + (activeDest == 'Mark Shuttleworth' ? ' active' : '')} onClick={() => setActive(1, 'Mark Shuttleworth')}></div>
                    <div className={`dot` + (activeDest == 'Victor Glover' ? ' active' : '')} onClick={() => setActive(2, 'Victor Glover')}></div>
                    <div className={`dot` + (activeDest == 'Anousheh Ansari' ? ' active' : '')} onClick={() => setActive(3, 'Anousheh Ansari')}></div>
                  </div>
                </animated.div>
                <animated.div className="image" style={animationOfTop}>
                    <img src={crews[index].image} alt="image" />
                </animated.div>
            </div>
        </div>
    )
}

export default Crew;