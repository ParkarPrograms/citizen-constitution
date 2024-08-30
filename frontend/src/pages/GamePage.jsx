import React from 'react';
import { useParams } from 'react-router-dom';
import TrueFalseGame from '../Components/Game/TrueFalseGame';
import MultipleChoiceGame from '../Components/Game/MultipleChoiceGame';

// Example game types
const gameComponents = {
  truefalse: TrueFalseGame,
  multiplechoice: MultipleChoiceGame,
  // Add other game components here
};

const GamePage = () => {
  const { chapterId, gameId } = useParams();
  
  // Determine game type based on gameId (replace with actual logic)
  const gameType = 'truefalse'; // Example; replace with real logic
  
  const GameComponent = gameComponents[gameType];

  if (!GameComponent) {
    return <p>Game not found</p>;
  }

  return (
    <div>
      <h1>Game {gameId} in Chapter {chapterId}</h1>
      <GameComponent chapterId={chapterId} gameId={gameId} />
    </div>
  );
};

export default GamePage;
