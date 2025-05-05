import { Box, Typography, Button, Card, CardContent, CardMedia, Chip, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LiveStatus from '../components/LiveStatus';
import { Game, GameStatus } from '../types';

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

// Sample news items
const newsItems = [
    {
        id: 1,
        title: 'FURIA avança para as semifinais',
        description: 'Após uma partida acirrada contra a Team Liquid, a FURIA garante sua vaga nas semifinais.',
        image: 'https://placehold.co/600x400/000000/ffffff?text=Notícias+FURIA',
        date: '2025-05-04',
    },
    {
        id: 2,
        title: 'Destaque do jogador: kscerato',
        description: 'Uma análise detalhada do jogador estrela da FURIA e seu impacto nas partidas recentes.',
        image: 'https://placehold.co/600x400/000000/ffffff?text=Destaque+Jogador',
        date: '2025-05-03',
    },
    {
        id: 3,
        title: 'Novos produtos FURIA disponíveis',
        description: 'Confira as novas camisetas e equipamentos da FURIA em nossa loja online.',
        image: 'https://placehold.co/600x400/000000/ffffff?text=Produtos+FURIA',
        date: '2025-05-02',
    },
];

const Home = () => {
    const liveGame = sampleGames.find(game => game.status === GameStatus.LIVE);
    
    return (
        <Container maxWidth={false} sx={{ py: 4, width: '100%' }}>
            <Box sx={{ mb: 6, textAlign: 'center' }}>
                <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
                    Bem-vindo ao Chat da FURIA
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
                    Conecte-se com outros fãs e acompanhe todas as partidas da FURIA em diversas modalidades de esports
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    size="large" 
                    component={Link}
                    to="/chat"
                    endIcon={<ArrowForwardIcon />}
                    sx={{ px: 4, py: 1 }}
                >
                    Entrar no Chat
                </Button>
            </Box>

            {liveGame && (
                <Box sx={{ mb: 6 }}>
                    <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                        Ao Vivo Agora 🔴
                    </Typography>
                    <LiveStatus 
                        game={liveGame}
                        liveStats={{
                            gameId: liveGame.id,
                            currentMap: liveGame.map || 'Mirage',
                            currentRound: 15,
                            playersAlive: {
                                furia: 3,
                                opponent: 2,
                            },
                            score: liveGame.score || {
                                furia: 8,
                                opponent: 6,
                            },
                            timeLeft: '1:15',
                        }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button 
                            variant="outlined" 
                            color="primary"
                            component={Link}
                            to="/chat"
                            sx={{ mt: 1 }}
                        >
                            Participar da Discussão
                        </Button>
                    </Box>
                </Box>
            )}

            <Box sx={{ mb: 6 }}>
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                    Próximas Partidas
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -1 }}>
                    {sampleGames
                        .filter(game => game.status === GameStatus.UPCOMING)
                        .map((game) => (
                            <Box 
                                key={game.id} 
                                sx={{ 
                                    width: { xs: '100%', sm: '50%', md: '33.333%' },
                                    p: 1
                                }}
                            >
                                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <CardContent>
                                        <Typography variant="h6" component="div">
                                            FURIA vs {game.opponent}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {game.tournament}
                                        </Typography>
                                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Typography variant="body2">
                                                {new Date(game.date).toLocaleDateString()} | {game.time}
                                            </Typography>
                                            <Chip label="Em breve" size="small" color="primary" variant="outlined" />
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Box>
                        ))}
                </Box>
            </Box>

            <Box sx={{ mb: 6 }}>
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                    Últimas Notícias
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -1.5 }}>
                    {newsItems.map((item) => (
                        <Box 
                            key={item.id} 
                            sx={{ 
                                width: { xs: '100%', sm: '50%', md: '33.333%' },
                                p: 1.5
                            }}
                        >
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={item.image}
                                    alt={item.title}
                                />
                                <CardContent sx={{ 
                                    flexGrow: 1, 
                                    color: '#000000',
                                    backgroundColor: '#ffffff'
                                }}>
                                    <Typography gutterBottom variant="h6" component="div" sx={{ color: '#000000' }}>
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#000000' }}>
                                        {item.description}
                                    </Typography>
                                    <Typography variant="caption" sx={{ mt: 1, display: 'block', color: '#000000' }}>
                                        {new Date(item.date).toLocaleDateString()}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Box>
                    ))}
                </Box>
            </Box>

            <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                    Junte-se à Comunidade FURIA
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                    Conecte-se com milhares de fãs da FURIA e não perca nenhum momento das partidas
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    size="large" 
                    component={Link}
                    to="/chat"
                    endIcon={<ArrowForwardIcon />}
                    sx={{ px: 4, py: 1 }}
                >
                    Abrir Chat
                </Button>
            </Box>
        </Container>
    );
};

export default Home;