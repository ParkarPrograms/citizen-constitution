import React, { useState } from 'react';
import { Carousel, Button } from 'react-bootstrap';
import TrueFalseGame from '../Components/Game/TrueFalseGame';
import MultipleChoiceGame from '../Components/Game/MultipleChoiceGame';

const gameComponents = {
  truefalse: TrueFalseGame,
  multiplechoice: MultipleChoiceGame,
  // Add other game components here
};

function GameCarousel({ games }) {
  const [activeGameIndex, setActiveGameIndex] = useState(0);
  const [activeGame, setActiveGame] = useState(null);

  const handleStartGame = (gameType, index) => {
    setActiveGame(gameType);
    setActiveGameIndex(index);
  };

  const handleQuitGame = () => {
    setActiveGame(null);
  };

  const handlePrevClick = () => {
    if(!activeGame)
        setActiveGameIndex((activeGameIndex + games.length - 1) % games.length)
  };

  const handleNextClick = () => {
    console.log("Next clicked")
    if(!activeGame)
        setActiveGameIndex((activeGameIndex + 1) % games.length)
  };

  const carouselItemStyle = { 
    height: '82vh', 
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#0aa0ff',
    borderRadius: '15px',
    margin: '0px 10px'
  };

  const GameComponent = gameComponents[activeGame];

  return (
    <Carousel
     activeIndex={activeGameIndex} 
     interval={null}
     indicators={false}
     nextIcon={
     <div 
        className="h-100 w-100 d-flex justify-content-center align-items-center" 
        onClick={handleNextClick} 
         >
            <span className='carousel-control-next-icon' hidden={activeGame} />
    </div>
    }
    prevIcon={
     <div 
        className="h-100 w-100 d-flex justify-content-center align-items-center" 
        onClick={handlePrevClick} 
         >
            <span className='carousel-control-prev-icon' hidden={activeGame}/>
    </div>
    }
     >
      {games.map((game, index) => (
        <Carousel.Item key={game.id}>
          <div style={carouselItemStyle}>
            {!activeGame || (activeGameIndex !== index) ? (
              <>
                <h3>{game.name}</h3>
                <Button onClick={() => handleStartGame(game.type, index)}>Start</Button>
              </>
            ) : (
              GameComponent && <GameComponent gameId={game.id} onQuit={handleQuitGame} />
            )}
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default GameCarousel;
