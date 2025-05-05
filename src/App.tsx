import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Sidebar from './components/Sidebar';
import { Game, GameStatus } from './types';
// Usando require para importar a imagem
const furiaLogo = '/src/assets/Furia_Esports_logo.png';

// Sample games data
const sampleGames: Game[] = [
  {
    id: '1',
    opponent: 'Liquid',
    tournament: 'ESL Pro League Season 19',
    date: '2025-05-05',
    time: '15:30',
    status: GameStatus.UPCOMING,
  },
  {
    id: '2',
    opponent: 'NAVI',
    tournament: 'ESL Pro League Season 19',
    date: '2025-05-04',
    time: '13:00',
    status: GameStatus.LIVE,
    map: 'Mirage',
    score: {
      furia: 8,
      opponent: 6,
    },
  },
  {
    id: '3',
    opponent: 'Cloud9',
    tournament: 'ESL Pro League Season 19',
    date: '2025-05-03',
    time: '11:00',
    status: GameStatus.FINISHED,
    map: 'Inferno',
    score: {
      furia: 16,
      opponent: 11,
    },
  },
];

function App() {
  const [games, setGames] = useState<Game[]>(sampleGames);

  // Simulate live game updates
  useEffect(() => {
    const liveGame = games.find(game => game.status === GameStatus.LIVE);
    
    if (liveGame) {
      const interval = setInterval(() => {
        setGames(prevGames => 
          prevGames.map(game => {
            if (game.id === liveGame.id && game.score) {
              // Randomly update scores
              if (Math.random() > 0.5 && game.score.furia < 16) {
                return {
                  ...game,
                  score: {
                    ...game.score,
                    furia: game.score.furia + 1
                  }
                };
              } else if (game.score.opponent < 16) {
                return {
                  ...game,
                  score: {
                    ...game.score,
                    opponent: game.score.opponent + 1
                  }
                };
              }
            }
            return game;
          })
        );
      }, 60000); // Update every minute
      
      return () => clearInterval(interval);
    }
  }, [games]);

  return (
    <Router>
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw',
        bgcolor: 'background.default',
        color: 'text.primary',
        overflow: 'hidden',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          width: '50%',
          height: '100%',
          backgroundImage: `url(${furiaLogo})`,
          backgroundPosition: 'right center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          opacity: 0.05,
          zIndex: 0,
          transform: 'scaleX(-1)', // Inverte a imagem horizontalmente (da direita para a esquerda)
        }
      }}>
        {/* Main Content */}
        <Box sx={{ flexGrow: 1, overflow: 'hidden', display: 'flex', position: 'relative', zIndex: 1 }}>
          {/* Sidebar */}
          <Box sx={{ 
            width: { xs: '0%', md: '25%', lg: '16.666%' },
            display: { xs: 'none', md: 'block' }, 
            height: '100%',
          }}>
            <Sidebar games={games} />
          </Box>
          
          {/* Main Content Area */}
          <Box sx={{ 
            width: { xs: '100%', md: '75%', lg: '83.333%' },
            height: '100%',
            overflow: 'auto',
            p: 2
          }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/chat" element={<Chat />} />
              {/* Add other routes as needed */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
