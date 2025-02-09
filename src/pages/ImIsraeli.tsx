import React from 'react';
import BaseGame from '../components/BaseGame.tsx';
import { israeliData } from '../data/israeliData.ts';

const ImIsraeli: React.FC = () => {
  return (
    <BaseGame 
      title="ג'פרדי - אני ישראלי"
      gameData={israeliData}
      colorScheme={{
        bg: 'bg-[#191919]',
        dialogbg: 'bg-[#262626]',
        categoryBg: 'bg-[#060651]',
        scoreBoardBg: 'bg-black'
      }}
    />
  );
};

export default ImIsraeli;