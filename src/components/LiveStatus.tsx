import { Box, Card, CardContent, Typography, LinearProgress, Chip, Avatar, Divider } from '@mui/material';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import { LiveStats, Game } from '../types';

interface LiveStatusProps {
    game: Game;
    liveStats?: LiveStats;
}

const LiveStatus = ({ game, liveStats }: LiveStatusProps) => {
    if (!liveStats) {
        return (
            <Card sx={{ 
                mb: 2, 
                bgcolor: 'background.paper', 
                borderRadius: 2,
                borderLeft: '4px solid', 
                borderColor: 'primary.main',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="h6" fontWeight="bold">
                            FURIA vs {game.opponent}
                        </Typography>
                        <Chip 
                            label={game.status === 'live' ? 'AO VIVO' : (game.status === 'finished' ? 'ENCERRADO' : 'EM BREVE')} 
                            color={game.status === 'live' ? "error" : game.status === 'finished' ? "default" : "primary"}
                            size="small"
                            sx={{ borderRadius: 1 }} 
                        />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                        {game.tournament} | {game.date} | {game.time}
                    </Typography>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card sx={{ 
            mb: 2, 
            bgcolor: 'background.paper', 
            borderRadius: 2,
            overflow: 'hidden',
            position: 'relative',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
            <Box sx={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '4px', 
                height: '100%', 
                bgcolor: 'error.main',
                animation: 'pulse 1.5s infinite'
            }} />
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Chip 
                            icon={<SportsTennisIcon />}
                            label="AO VIVO" 
                            color="error"
                            size="small"
                            sx={{ 
                                borderRadius: 1,
                                animation: 'pulse 2s infinite'
                            }} 
                        />
                        <Typography variant="h6" fontWeight="bold">
                            {liveStats.currentMap}
                        </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ bgcolor: 'action.hover', px: 1, py: 0.5, borderRadius: 1 }}>
                        Round {liveStats.currentRound} {liveStats.timeLeft ? `| ${liveStats.timeLeft}` : ''}
                    </Typography>
                </Box>

                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    mb: 2,
                    px: 2,
                    py: 2,
                    bgcolor: 'background.default',
                    borderRadius: 2
                }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                        <Avatar 
                            alt="FURIA" 
                            src="/furia-logo.png" 
                            sx={{ 
                                width: 40, 
                                height: 40, 
                                bgcolor: 'primary.main', 
                                color: 'secondary.main',
                                border: '2px solid',
                                borderColor: 'primary.main'
                            }}
                        >
                            F
                        </Avatar>
                        <Typography variant="body1" fontWeight="bold">FURIA</Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h4" fontWeight="bold" sx={{ letterSpacing: 2 }}>
                            {liveStats.score.furia} - {liveStats.score.opponent}
                        </Typography>
                        <Chip 
                            label="1º MAPA" 
                            size="small" 
                            sx={{ 
                                mt: 0.5, 
                                fontSize: '0.7rem',
                                bgcolor: 'primary.main',
                                color: 'white'
                            }} 
                        />
                    </Box>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                        <Avatar 
                            alt={game.opponent} 
                            sx={{ 
                                width: 40, 
                                height: 40, 
                                bgcolor: 'text.secondary', 
                                color: 'background.default',
                                border: '2px solid',
                                borderColor: 'text.secondary'
                            }}
                        >
                            {game.opponent[0]}
                        </Avatar>
                        <Typography variant="body1" fontWeight="bold">{game.opponent}</Typography>
                    </Box>
                </Box>

                <Divider sx={{ my: 1.5 }} />

                <Box sx={{ mb: 1 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                        Jogadores vivos
                    </Typography>
                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        gap: 1,
                        mb: 1
                    }}>
                        <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            width: 24, 
                            height: 24, 
                            bgcolor: 'primary.main', 
                            color: 'white',
                            borderRadius: '50%',
                            fontWeight: 'bold'
                        }}>
                            {liveStats.playersAlive.furia}
                        </Box>
                        <LinearProgress 
                            variant="determinate" 
                            value={(liveStats.playersAlive.furia / 5) * 100}
                            sx={{ 
                                flex: 1, 
                                height: 10, 
                                borderRadius: 5,
                                bgcolor: 'rgba(0, 0, 0, 0.08)',
                                '& .MuiLinearProgress-bar': {
                                    bgcolor: 'primary.main'
                                }
                            }} 
                        />
                        <LinearProgress 
                            variant="determinate" 
                            value={(liveStats.playersAlive.opponent / 5) * 100}
                            sx={{ 
                                flex: 1, 
                                height: 10, 
                                borderRadius: 5,
                                bgcolor: 'rgba(0, 0, 0, 0.08)',
                                '& .MuiLinearProgress-bar': {
                                    bgcolor: 'text.secondary'
                                }
                            }} 
                        />
                        <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            width: 24, 
                            height: 24, 
                            bgcolor: 'text.secondary', 
                            color: 'white',
                            borderRadius: '50%',
                            fontWeight: 'bold'
                        }}>
                            {liveStats.playersAlive.opponent}
                        </Box>
                    </Box>
                </Box>
                
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 1 }}>
                    Acompanhe a transmissão ao vivo
                </Typography>
            </CardContent>
        </Card>
    );
};

export default LiveStatus;