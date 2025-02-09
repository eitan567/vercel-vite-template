import React from 'react';
import BaseGame from '../components/BaseGame.tsx';
import { geneticsData } from '../data/geneticsData.ts';

const JeopardyGenetics: React.FC = () => {
  return (
    <BaseGame 
      title="ג'פרדי - הנדסה גנטית"
      gameData={geneticsData}
      colorScheme={{
        bg: 'bg-[#191919]',
        dialogbg: 'bg-[#262626]',
        categoryBg: 'bg-[#060651]',
        scoreBoardBg: 'bg-black'
      }}
    />
  );
};

export default JeopardyGenetics;