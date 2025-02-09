import React from 'react';
import BaseGame from '../components/BaseGame.tsx';
import { cellsData } from '../data/cellsData.ts';

const JeopardyCells: React.FC = () => {
  return (
    <BaseGame 
      title="ג'פרדי - תרביות תאים אנימליות"
      gameData={cellsData}
      colorScheme={{
        bg: 'bg-[#191919]',
        dialogbg: 'bg-[#262626]',
        categoryBg: 'bg-[#060651]',
        scoreBoardBg: 'bg-black'
      }}
    />
  );
};

export default JeopardyCells;