// deno-lint-ignore ban-ts-comment
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Link } from 'react-router-dom'
import { Dna, TestTube, Flag, Key } from 'lucide-react'

interface GameLink {
  title: string
  path: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  description: string
}

function App() {
  const games: GameLink[] = [
    {
      title: "יוצר כתב הסתרים",
      path: "/cipher",
      icon: Key,
      color: "bg-yellow-600 hover:bg-yellow-700",
      description: "כלי ליצירת טקסט מוצפן בסגנונות שונים"
    },
    {
      title: "הנדסה גנטית",
      path: "/genetics",
      icon: Dna,
      color: "bg-purple-600 hover:bg-purple-700",
      description: "משחק ג'פרדי בנושא הנדסה גנטית"
    },
    {
      title: "תרביות תאים",
      path: "/cells",
      icon: TestTube,
      color: "bg-blue-600 hover:bg-blue-700",
      description: "משחק ג'פרדי בנושא תרביות תאים"
    },
    {
      title: "אני ישראלי",
      path: "/israeli",
      icon: Flag,
      color: "bg-green-600 hover:bg-green-700",
      description: "משחק ג'פרדי בנושא ישראל"
    },
    // {
    //   title: "תרביות תאים 2",
    //   path: "/cells2",
    //   icon: Brain,
    //   color: "bg-red-600 hover:bg-red-700",
    //   description: "גרסה נוספת של משחק תרביות תאים"
    // }
  ]

  return (
    <div className="min-h-screen bg-[#191919] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center  text-white mb-12">
          משחקי ג'פרדי
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 justify-center">
          {games.map((game, index) => (
            <Link 
              key={index}
              to={game.path}
              className={`${game.color} rounded-lg p-6 transition-all transform hover:scale-105 hover:shadow-xl`}
            >
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <game.icon className="w-12 h-12 text-white" />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {game.title}
                  </h2>
                  <p className="text-white opacity-90">
                    {game.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App