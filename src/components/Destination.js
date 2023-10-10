import { useState } from 'react';
import { useSpring, animated, config } from '@react-spring/web';
import { useInView } from '@react-spring/web';

const destination = [
    {
        name: "Moon",
        image: "assets/destination/image-moon.png",
        description: "See our planet as you’ve never seen it before. A perfect relaxing trip away to help regain perspective and come back refreshed. While you’re there, take in some history by visiting the Luna 2 and Apollo 11 landing sites.",
        distance: "384,400 km",
        travel: "3 days"
      },
      {
        name: "Mars",
        image: "assets/destination/image-mars.png",
        description: "Don’t forget to pack your hiking boots. You’ll need them to tackle Olympus Mons, the tallest planetary mountain in our solar system. It’s two and a half times the size of Everest!",
        distance: "225 mil. km",
        travel: "9 months"
      },
      {
        name: "Europa",
        image: "assets/destination/image-europa.png",
        description: "The smallest of the four Galilean moons orbiting Jupiter, Europa is a winter lover’s dream. With an icy surface, it’s perfect for a bit of ice skating, curling, hockey, or simple relaxation in your snug wintery cabin.",
        distance: "628 mil. km",
        travel: "3 years"
      },
      {
        name: "Titan",
        image: "assets/destination/image-titan.png",
        description: "The only moon known to have a dense atmosphere other than Earth, Titan is a home away from home (just a few hundred degrees colder!). As a bonus, you get striking views of the Rings of Saturn.",
        distance: "1.6 bil. km",
        travel: "7 years"
      }
];


function Destination() {
    
    const [index, setIndex] = useState(1);
    const [activeDest, setActiveDest] = useState('mars');

    function setActive(index, activeDest) {
        setIndex(index);
        setActiveDest(activeDest);
        setAnimationOfLeft({
            from: {
                opacity: 0, 
                transform: 'translateX(-50%)'
            },
            to: {
                opacity: 1,
                transform: 'translateX(0)',
            },
        })
        setAnimationOfRight({
            from: {
                opacity: 0, 
                transform: 'translateX(50%)'
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
    
    const [animationOfLeft, setAnimationOfLeft] = useSpring(() => ({
        opacity: 0, 
        transform: 'translateX(-50%)',
    }));
    
    const [animationOfRight, setAnimationOfRight] = useSpring(() => ({
        opacity: 0, 
        transform: 'translateX(50%)',
    }));
    
    if(inView) {
        setAnimationOfLeft({
            opacity: 1,
            transform: 'translateX(0)',
            config: {duration: 600},
        })
        setAnimationOfRight({
            opacity: 1,
            transform: 'translateX(0)',
            config: {duration: 600},
        })
    } else {
        setAnimationOfLeft({
            opacity: 0, 
            transform: 'translateX(-50%)',
        })
        setAnimationOfRight({
            opacity: 0, 
            transform: 'translateX(50%)',
        })
    }

    return (
        <div className="destination" id="destination">
            <h1 className="dest-title"><span>01</span>Pick your destination</h1>
            <div className="image-info" ref={ref}>
                <animated.div className="image" style={animationOfLeft}>
                    <img src={destination[index].image} alt="destination" />
                </animated.div>
                <animated.div className="info" style={animationOfRight}>
                    <header>
                        <div className={`tab` + (activeDest == 'moon' ? ' active' : '')} onClick={() => setActive(0, 'moon')}>Moon</div>
                        <div className={`tab` + (activeDest == 'mars' ? ' active' : '')} onClick={() => setActive(1, 'mars')}>Mars</div>
                        <div className={`tab` + (activeDest == 'europa' ? ' active' : '')} onClick={() => setActive(2, 'europa')}>Europa</div>
                        <div className={`tab` + (activeDest == 'titan' ? ' active' : '')} onClick={() => setActive(3, 'titan')}>Titan</div>
                    </header>
                    <div className="content">
                        <h1>{destination[index].name}</h1>
                        <small className="desc">{destination[index].description}</small>
                    </div>
                    <div className="status">
                        <div className="avg">
                            <p>Avg. distance</p>
                            <h3>{destination[index].distance}</h3>
                        </div>
                        <div className="est">
                            <p>Est. travel time</p>
                            <h3>{destination[index].travel}</h3>
                        </div>
                    </div>
                </animated.div>
            </div>
        </div>
    )
}

export default Destination;