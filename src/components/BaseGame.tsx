import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Question, Team, GameData } from '../types/game.ts';
import { Link } from 'react-router-dom'

interface BaseGameProps {
  title: string;
  gameData: GameData;
  colorScheme?: {
    bg: string;
    categoryBg: string;
    scoreBoardBg?: string;
    dialogbg?: string;
  };
}

const BaseGame: React.FC<BaseGameProps> = ({ 
  title, 
  gameData,
  colorScheme = {
    bg: '#161616',
    dialogbg: 'bg-[#262626]',
    categoryBg: 'bg-[#060651]',
    scoreBoardBg: 'bg-black'
  }
}) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamNames, setTeamNames] = useState(['', '', '', '']);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<{
    question: Question;
    element: HTMLElement | null;
  } | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(new Set());

  const handleTeamNameChange = (index: number, name: string) => {
    const newTeamNames = [...teamNames];
    newTeamNames[index] = name;
    setTeamNames(newTeamNames);
  };

  const startGame = () => {
    const newTeams = teamNames.map((name, i) => ({
      name: name.trim() || `קבוצה ${i + 1}`,
      score: 0
    }));
    setTeams(newTeams);
    setGameStarted(true);
  };

  const nextTurn = () => {
    setCurrentTeamIndex((prev) => (prev + 1) % teams.length);
  };

  const handleQuestionClick = (categoryIndex: number, questionIndex: number, element: HTMLElement) => {
    if (answeredQuestions.has(`${categoryIndex}-${questionIndex}`)) return;
    
    const question = gameData.questions[categoryIndex][questionIndex];
    setCurrentQuestion({ question, element });
    setShowModal(true);
    setShowAnswer(false);
  };

  const handleCorrectAnswer = () => {
    if (!currentQuestion) return;

    const newTeams = [...teams];
    newTeams[currentTeamIndex].score += currentQuestion.question.value;
    setTeams(newTeams);
    
    const questionKey = `${currentQuestion.element?.getAttribute('data-category')}-${currentQuestion.element?.getAttribute('data-question')}`;
    setAnsweredQuestions(prev => new Set([...prev, questionKey]));
    
    setShowModal(false);
    setCurrentQuestion(null);
  };

  const handleIncorrectAnswer = () => {
    if (!currentQuestion) return;

    const newTeams = [...teams];
    newTeams[currentTeamIndex].score -= currentQuestion.question.value;
    setTeams(newTeams);
    
    const questionKey = `${currentQuestion.element?.getAttribute('data-category')}-${currentQuestion.element?.getAttribute('data-question')}`;
    setAnsweredQuestions(prev => new Set([...prev, questionKey]));
    
    setShowModal(false);
    setCurrentQuestion(null);
    nextTurn();
  };

  if (!gameStarted) {
    return (
      <div className={`min-h-screen ${colorScheme.bg} p-8 text-white`}>
        <Link to="/" className="text-white hover:text-gray-400 cursor-pointer absolute top-4 right-4">
          <X size={24} />
        </Link>
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-4xl font-bold text-yellow-400 mb-8">{title}</h1>
          <div className="space-y-4 mb-8">
            {[0, 1, 2, 3].map((i) => (
              <input
                key={i}
                type="text"
                value={teamNames[i]}
                onChange={(e) => handleTeamNameChange(i, e.target.value)}
                placeholder={`שם קבוצה ${i + 1}`}
                className="w-full p-2 rounded bg-white/10 text-white text-center"
              />
            ))}
          </div>
          <button
            onClick={startGame}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-xl cursor-pointer"
          >
            התחל משחק
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${colorScheme.bg} p-8 text-white`} dir="rtl">
      <Link to="/" className="text-white hover:text-gray-400 cursor-pointer">
        <X size={24} />
      </Link>
      <h1 className="text-4xl font-bold text-yellow-400 text-center mb-8">
        {title}
      </h1>

      {/* Teams Display */}
      <div className="flex justify-center gap-4 flex-wrap mb-8">
        {teams.map((team, index) => (
          <div
            key={index}
            className={`${colorScheme.scoreBoardBg} p-4 rounded-lg min-w-[200px] text-center border border-neutral-600
              ${index === currentTeamIndex ? 'ring-2 ring-yellow-400' : ''}`}
          >
            <div className="font-bold mb-2">{team.name}</div>
            <div className="text-2xl text-yellow-400" dir='ltr'>{team.score}</div>
          </div>
        ))}
      </div>

      {/* Game Controls */}
      <div className="text-center mb-8">
        <button
          onClick={nextTurn}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-black cursor-pointer"
        >
          סיים תור
        </button>
      </div>

      {/* Game Board */}
      <div className="grid grid-cols-5 gap-4 max-w-6xl mx-auto">
        {/* Categories */}
        {gameData.categories.map((category, index) => (
          <div key={index} className={`${colorScheme.categoryBg} p-4 text-center font-bold rounded`}>
            {category}
          </div>
        ))}

        {/* Questions */}
        {[0, 1, 2, 3, 4].map((row) => (
          <React.Fragment key={row}>
            {[0, 1, 2, 3, 4].map((col) => {
              const questionKey = `${col}-${row}`;
              const isAnswered = answeredQuestions.has(questionKey);
              
              return (
                <button
                  key={`${row}-${col}`}
                  onClick={(e) => handleQuestionClick(col, row, e.currentTarget)}
                  data-category={col}
                  data-question={row}
                  className={`p-6 text-center cursor-pointer rounded transition-colors
                    ${isAnswered ? ' bg-neutral-800 border border-neutral-600 line-through cursor-not-allowed' : ''}
                    ${!isAnswered && col === 0 ? 'bg-blue-600 hover:bg-blue-700' : ''}
                    ${!isAnswered && col === 1 ? 'bg-purple-600 hover:bg-purple-700' : ''}
                    ${!isAnswered && col === 2 ? 'bg-green-600 hover:bg-green-700' : ''}
                    ${!isAnswered && col === 3 ? 'bg-orange-600 hover:bg-orange-700' : ''}
                    ${!isAnswered && col === 4 ? 'bg-red-600 hover:bg-red-700' : ''}`}
                >
                  {gameData.questions[col][row].value}
                </button>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      {/* Question Modal */}
      {showModal && currentQuestion && (
        <div className="fixed inset-0 bg-opacity-80 flex items-center justify-center p-4">
          <div className={`${colorScheme.dialogbg} p-8 rounded-lg max-w-2xl w-full rounded-2xl border border-[#5b5b5b]`}>
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>
            
            <h2 className="text-xl mb-4 text-center">
              {currentQuestion.question.q}
            </h2>
            
            {showAnswer && (
              <div className="text-center mb-4 text-2xl">
                {currentQuestion.question.a}
              </div>
            )}

            <div className="flex justify-center mb-4">
              <button
                onClick={() => setShowAnswer(true)}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded cursor-pointer"
              >
                הצג תשובה
              </button>
            </div>


            <div className="flex justify-center gap-4 pt-6">
              <button
                onClick={handleCorrectAnswer}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded min-w-[105px] cursor-pointer"
              >
                נכון
              </button>
              <button
                onClick={handleIncorrectAnswer}
                className="bg-red-600 hover:bg-red-900 px-4 py-2 rounded min-w-[105px] cursor-pointer"
              >
                לא נכון
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BaseGame;