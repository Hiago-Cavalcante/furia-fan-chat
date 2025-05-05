import { Box, List, ListItem, ListItemIcon, ListItemText, Divider, Typography, Avatar, Button, Card, CardContent } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { Link, useLocation } from 'react-router-dom';
import LiveStatus from './LiveStatus';
import { Game, GameStatus } from '../types';

interface SidebarProps {
    games: Game[];
}

const Sidebar = ({ games }: SidebarProps) => {
    const location = useLocation();
    const liveGame = games.find(game => game.status === GameStatus.LIVE);

    const menuItems = [
        { text: 'Início', icon: <HomeIcon />, path: '/' },
        { text: 'Chat', icon: <ChatIcon />, path: '/chat' },
        { text: 'Calendário', icon: <CalendarTodayIcon />, path: '/schedule' },
        { text: 'Jogos', icon: <SportsEsportsIcon />, path: '/games' },
    ];

    return (
        <Box
            sx={{
                height: '100vh',
                minHeight: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'background.paper',
                borderRight: 1,
                borderColor: 'divider',
                position: 'sticky',
                top: 0,
                overflowY: 'auto',
            }}
        >
            <Box 
                sx={{ 
                    p: 2, 
                    display: 'flex', 
                    alignItems: 'center',
                    background: 'linear-gradient(90deg, #121212 0%, #2a2a2a 100%)',
                    color: 'white'
                }}
            >
                <Avatar 
                    alt="FURIA" 
                    src="/Furia_Esports_Logo.png" 
                    sx={{ 
                        width: 40, 
                        height: 40, 
                        mr: 2, 
                        bgcolor: 'primary.main', 
                        color: 'secondary.main',
                        border: '2px solid',
                        borderColor: 'primary.main' 
                    }}
                />
                <Typography variant="h6" component="div" fontWeight="bold">
                    FURIA Fan Chat
                </Typography>
            </Box>
            
            <Divider />
            
            {liveGame && (
                <Box sx={{ p: 2 }}>
                    <Typography 
                        variant="subtitle2" 
                        sx={{ 
                            mb: 1, 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 1,
                            fontWeight: 'bold'
                        }}
                    >
                        <Box 
                            sx={{
                                width: 10,
                                height: 10,
                                bgcolor: 'error.main',
                                borderRadius: '50%',
                                animation: 'pulse 2s infinite',
                            }}
                        />
                        PARTIDA AO VIVO
                    </Typography>
                    <LiveStatus 
                        game={liveGame} 
                        liveStats={{
                            gameId: liveGame.id,
                            currentMap: liveGame.map || 'Mirage',
                            currentRound: 15,
                            playersAlive: {
                                furia: 3,
                                opponent: 2
                            },
                            score: liveGame.score || {
                                furia: 8,
                                opponent: 6
                            },
                            timeLeft: '1:15'
                        }}
                    />
                </Box>
            )}

            <List component="nav" sx={{ flexGrow: 1, px: 1 }}>
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    
                    return (
                        <ListItem 
                            key={item.text}
                            component={Link}
                            to={item.path}
                            sx={{  
                                borderRadius: 2,
                                mb: 0.5,
                                pl: 2,
                                bgcolor: isActive ? 'primary.main' : 'transparent',
                                color: isActive ? 'white' : 'text.primary',
                                '&:hover': {
                                    bgcolor: isActive ? 'primary.dark' : 'action.hover',
                                },
                            }}
                        >
                            <ListItemIcon sx={{  
                                color: isActive ? 'white' : 'text.secondary',
                                minWidth: 40,
                            }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText 
                                primary={item.text}
                                primaryTypographyProps={{
                                    fontWeight: isActive ? 'bold' : 'medium',
                                }} 
                            />
                        </ListItem>
                    );
                })}
            </List>
            
            <Box sx={{ p: 2, bgcolor: 'background.default' }}>
                <Typography 
                    variant="subtitle2" 
                    sx={{ 
                        mb: 2, 
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                    }}
                >
                    <CalendarTodayIcon fontSize="small" color="primary" />
                    PRÓXIMAS PARTIDAS
                </Typography>
                
                <Card variant="outlined" sx={{ mb: 2, borderRadius: 2 }}>
                    <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
                        {games
                            .filter(game => game.status === GameStatus.UPCOMING)
                            .slice(0, 3)
                            .map(game => (
                                <Box 
                                    key={game.id}
                                    sx={{  
                                        mb: 1,
                                        p: 1.5, 
                                        borderRadius: 1,
                                        '&:hover': { bgcolor: 'action.hover' },
                                        borderBottom: '1px solid',
                                        borderColor: 'divider',
                                        '&:last-child': {
                                            mb: 0,
                                            borderBottom: 'none',
                                        }
                                    }}
                                >
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                        <Typography variant="body2" fontWeight="bold">
                                            FURIA vs {game.opponent}
                                        </Typography>
                                        <Typography variant="caption" color="primary" fontWeight="medium">
                                            {game.time}
                                        </Typography>
                                    </Box>
                                    <Typography variant="caption" color="text.secondary">
                                        {game.tournament} • {game.date}
                                    </Typography>
                                </Box>
                            ))
                        }
                    </CardContent>
                </Card>
                
                <Button 
                    variant="contained" 
                    color="primary" 
                    fullWidth 
                    component={Link}
                    to="/schedule"
                    startIcon={<CalendarTodayIcon />}
                    sx={{
                        borderRadius: 2,
                        py: 1,
                        textTransform: 'none',
                        fontWeight: 'bold'
                    }}
                >
                    Ver Calendário Completo
                </Button>
            </Box>
        </Box>
    );
};

export default Sidebar;