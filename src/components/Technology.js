import { useState, useEffect } from 'react';
import { useSpring, animated, config } from '@react-spring/web';
import { useInView } from '@react-spring/web';

const technology = [
    {
      name: "Launch vehicle",
      images: {
        portrait: "./assets/technology/image-launch-vehicle-portrait.jpg",
        landscape: "./assets/technology/image-launch-vehicle-landscape.jpg"
      },
      description: "A launch vehicle or carrier rocket is a rocket-propelled vehicle used to carry a payload from Earth's surface to space, usually to Earth orbit or beyond. Our WEB-X carrier rocket is the most powerful in operation. Standing 150 metres tall, it's quite an awe-inspiring sight on the launch pad!"
    },
    {
      name: "Spaceport",
      images: {
        portrait: "./assets/technology/image-spaceport-portrait.jpg",
        landscape: "./assets/technology/image-spaceport-landscape.jpg"
      },
      description: "A spaceport or cosmodrome is a site for launching (or receiving) spacecraft, by analogy to the seaport for ships or airport for aircraft. Based in the famous Cape Canaveral, our spaceport is ideally situated to take advantage of the Earth’s rotation for launch."
    },
    {
      name: "Space capsule",
      images: {
        portrait: "./assets/technology/image-space-capsule-portrait.jpg",
        landscape: "./assets/technology/image-space-capsule-landscape.jpg"
      },
      description: "A space capsule is an often-crewed spacecraft that uses a blunt-body reentry capsule to reenter the Earth's atmosphere without wings. Our capsule is where you'll spend your time during the flight. It includes a space gym, cinema, and plenty of other activities to keep you entertained."
    }
  ];


function Technology() {
    
    const [index, setIndex] = useState(1);
    const [activeDest, setActiveDest] = useState('Launch vehicle');
    const [portrait, setPortrait] = useState(true);

    function setActive(index, activeDest) {
        setIndex(index);
        setActiveDest(activeDest);
        setAnimation({
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
    
    const [animation, setAnimation] = useSpring(() => ({
        opacity: 0, 
        transform: 'translateX(50%)',
    }));
    
    if(inView) {
        setAnimation({
            opacity: 1,
            transform: 'translateX(0)',
            config: {duration: 600},
        })
    } else {
        setAnimation({
            opacity: 0, 
            transform: 'translateX(50%)',
        })
    }

    useEffect(() => {
        function handleResize() {
            setPortrait(window.innerWidth >= 1100);
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    return (
        <div className="technology" id='technology'>
            <h1 className="tech-title"><span>03</span>Space Launch 101</h1>
            <div className="image-info" ref={ref}>
                <animated.div className="info" style={animation}>
                    <header>
                        <div className={`tab` + (activeDest == 'Launch vehicle' ? ' active' : '')} onClick={() => setActive(0, 'Launch vehicle')}>1</div>
                        <div className={`tab` + (activeDest == 'Spaceport' ? ' active' : '')} onClick={() => setActive(1, 'Spaceport')}>2</div>
                        <div className={`tab` + (activeDest == 'Space capsule' ? ' active' : '')} onClick={() => setActive(2, 'Space capsule')}>3</div>
                    </header>
                    <div className="content">
                        <p>The Terminology</p>
                        <h1>{technology[index].name}</h1>
                        <small className="desc">{technology[index].description}</small>
                    </div>
                </animated.div>
                <animated.div className="image" style={animation}>
                    <img src={portrait ? technology[index].images.portrait : technology[index].images.landscape} alt="tech" />
                </animated.div>
            </div>
        </div>
    )
}

export default Technology;