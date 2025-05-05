import { useState, useEffect } from 'react';
import { Box, Typography, Paper, Tabs, Tab, Menu, MenuItem, Button, Chip, Card } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ChatWindow from '../components/ChatWindow';
import LiveStatus from '../components/LiveStatus';
import { Message, User, Game, GameStatus } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Mock current user
const currentUser: User = {
    id: '123',
    name: 'FURIA_Fan',
    avatar: 'https://placehold.co/100/121212/ffdd00?text=FF',
};

// Mock users
const users: User[] = [
    {
        id: '456',
        name: 'CS_Legend',
        avatar: 'https://placehold.co/100/121212/ffdd00?text=CL',
    },
    {
        id: '789',
        name: 'YellowPower',
        avatar: 'https://placehold.co/100/121212/ffdd00?text=YP',
    },
    {
        id: '101',
        name: 'BrazilFan',
        avatar: 'https://placehold.co/100/121212/ffdd00?text=BF',
    },
    {
        id: 'bot',
        name: 'Bot FURIA',
        avatar: 'https://placehold.co/100/121212/ffdd00?text=FB',
    },
];

// Salas de chat para diferentes jogos da FURIA
const gameChannels = [
    { id: 'csgo', name: 'CS:GO', icon: '🔫' },
    { id: 'valorant', name: 'VALORANT', icon: '🎯' },
    { id: 'lol', name: 'League of Legends', icon: '⚔️' },
    { id: 'dota2', name: 'Dota 2', icon: '🛡️' },
    { id: 'r6', name: 'Rainbow Six Siege', icon: '🚨' },
    { id: 'fortnite', name: 'Fortnite', icon: '🏗️' },
    { id: 'apex', name: 'Apex Legends', icon: '🏆' },
    { id: 'fifa', name: 'FIFA', icon: '⚽' },
];

// Sample initial messages
const initialMessages: Message[] = [
    {
        id: '1',
        text: 'Bem-vindo ao Chat de Fãs da FURIA! Aqui você pode discutir sobre todos os jogos e equipes da organização.',
        user: users[3], // Bot
        timestamp: Date.now() - 3600000,
    },
    {
        id: '2',
        text: 'Olá pessoal! Animado para a partida de hoje contra a NAVI!',
        user: users[0],
        timestamp: Date.now() - 1800000,
    },
    {
        id: '3',
        text: 'A FURIA tem estado em ótima forma ultimamente! Acho que temos boas chances hoje.',
        user: users[1],
        timestamp: Date.now() - 900000,
    },
    {
        id: '4',
        text: 'Alguém sabe quem vai começar jogando hoje?',
        user: users[2],
        timestamp: Date.now() - 600000,
    },
];

// Game-specific initial messages
const gameSpecificMessages: { [key: string]: Message[] } = {
    csgo: [
        {
            id: 'cs1',
            text: 'Bem-vindo ao chat de CS:GO! Discuta sobre os jogos, táticas e jogadores da FURIA CS:GO aqui.',
            user: users[3], // Bot
            timestamp: Date.now() - 3000000,
        },
    ],
    valorant: [
        {
            id: 'val1',
            text: 'Bem-vindo ao chat de VALORANT! Compartilhe suas opiniões sobre o time de VALORANT da FURIA.',
            user: users[3], // Bot
            timestamp: Date.now() - 2800000,
        },
    ],
    lol: [
        {
            id: 'lol1',
            text: 'Bem-vindo ao chat de League of Legends! Aqui você pode discutir sobre o desempenho do time da FURIA no CBLOL.',
            user: users[3], // Bot
            timestamp: Date.now() - 2700000,
        },
    ],
};

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
];

// Predefined bot responses
const botResponses = [
    "Não esqueça de conferir os novos produtos da FURIA na loja oficial!",
    "A FURIA venceu os últimos 3 confrontos contra essa equipe. Boas perspectivas para hoje!",
    "O pool de mapas atual para este torneio é Mirage, Inferno, Nuke, Vertigo, Anubis, Overpass e Ancient.",
    "Você sabia? A FURIA tem a maior porcentagem de vitórias em Mirage nesta temporada.",
    "Não deixe de seguir a FURIA nas redes sociais para as últimas atualizações e conteúdo dos bastidores!",
];

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`chat-tabpanel-${index}`}
            aria-labelledby={`chat-tab-${index}`}
            style={{ height: '100%', display: value !== index ? 'none' : 'block' }}
            {...other}
        >
            {value === index && <Box sx={{ height: '100%' }}>{children}</Box>}
        </div>
    );
};

const Chat = () => {
    const [tabValue, setTabValue] = useState(0);
    const [generalMessages, setGeneralMessages] = useState<Message[]>(initialMessages);
    const [matchMessages, setMatchMessages] = useState<Message[]>([]);
    const [tacticsMessages, setTacticsMessages] = useState<Message[]>([]);
    const [gameSpecificChats, setGameSpecificChats] = useState<{ [key: string]: Message[] }>({
        csgo: gameSpecificMessages.csgo || [],
        valorant: gameSpecificMessages.valorant || [],
        lol: gameSpecificMessages.lol || [],
        dota2: [],
        r6: [],
        fortnite: [],
        apex: [],
        fifa: [],
    });
    const [currentGameChat, setCurrentGameChat] = useState('csgo');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const liveGame = sampleGames.find((game) => game.status === GameStatus.LIVE);

    // Function to handle tab changes
    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleGameMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleGameMenuClose = (gameId?: string) => {
        setAnchorEl(null);
        if (gameId) {
            setCurrentGameChat(gameId);
        }
    };

    // Add random bot messages occasionally
    useEffect(() => {
        const botMessageInterval = setInterval(() => {
            // 20% chance of adding a bot message
            if (Math.random() < 0.2) {
                const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
                const botMessage: Message = {
                    id: uuidv4(),
                    text: randomResponse,
                    user: users[3], // Bot user
                    timestamp: Date.now(),
                };

                // Add to relevant chat tab
                if (tabValue === 0) {
                    setGeneralMessages((prev) => [...prev, botMessage]);
                } else if (tabValue === 1) {
                    // Adiciona à sala do jogo específico atual
                    if (currentGameChat) {
                        setGameSpecificChats((prev) => ({
                            ...prev,
                            [currentGameChat]: [...(prev[currentGameChat] || []), botMessage],
                        }));
                    }
                } else if (tabValue === 2 && liveGame) {
                    setMatchMessages((prev) => [...prev, botMessage]);
                } else if (tabValue === 3) {
                    setTacticsMessages((prev) => [...prev, botMessage]);
                }
            }
        }, 30000); // Every 30 seconds

        return () => clearInterval(botMessageInterval);
    }, [tabValue, liveGame, currentGameChat]);

    // Handle message send
    const handleSendMessage = (text: string) => {
        const newMessage: Message = {
            id: uuidv4(),
            text,
            user: currentUser,
            timestamp: Date.now(),
        };

        // Add to relevant chat tab
        if (tabValue === 0) {
            setGeneralMessages((prev) => [...prev, newMessage]);
        } else if (tabValue === 1) {
            // Adiciona à sala do jogo específico atual
            if (currentGameChat) {
                setGameSpecificChats((prev) => ({
                    ...prev,
                    [currentGameChat]: [...(prev[currentGameChat] || []), newMessage],
                }));
            }
        } else if (tabValue === 2) {
            setMatchMessages((prev) => [...prev, newMessage]);
        } else if (tabValue === 3) {
            setTacticsMessages((prev) => [...prev, newMessage]);
        }
    };

    // Handle message like
    const handleLikeMessage = (messageId: string) => {
        if (tabValue === 0) {
            setGeneralMessages((prev) =>
                prev.map((msg) => (msg.id === messageId ? { ...msg, likes: (msg.likes || 0) + 1 } : msg))
            );
        } else if (tabValue === 1) {
            // Atualiza likes na sala do jogo específico atual
            if (currentGameChat) {
                setGameSpecificChats((prev) => ({
                    ...prev,
                    [currentGameChat]: prev[currentGameChat].map((msg) =>
                        msg.id === messageId ? { ...msg, likes: (msg.likes || 0) + 1 } : msg
                    ),
                }));
            }
        } else if (tabValue === 2) {
            setMatchMessages((prev) =>
                prev.map((msg) => (msg.id === messageId ? { ...msg, likes: (msg.likes || 0) + 1 } : msg))
            );
        } else if (tabValue === 3) {
            setTacticsMessages((prev) =>
                prev.map((msg) => (msg.id === messageId ? { ...msg, likes: (msg.likes || 0) + 1 } : msg))
            );
        }
    };

    // Encontra o canal de jogo atual
    const currentGameChannel = gameChannels.find((channel) => channel.id === currentGameChat);

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Paper sx={{ mb: 2, borderRadius: 0 }}>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    variant="fullWidth"
                    textColor="primary"
                    indicatorColor="primary"
                >
                    <Tab label="Chat Geral" />
                    <Tab label="Jogos Específicos" />
                    <Tab label="Discussão da Partida" />
                    <Tab label="Táticas e Análises" />
                </Tabs>
            </Paper>

            <Box sx={{ display: 'flex', flexGrow: 1, gap: 2, overflow: 'hidden' }}>
                <Box
                    sx={{
                        flexBasis: { xs: '100%', md: '66.666%', lg: '75%' },
                        height: '100%',
                    }}
                >
                    {tabValue === 1 && (
                        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                            <Button
                                variant="outlined"
                                onClick={handleGameMenuClick}
                                endIcon={<ArrowDropDownIcon />}
                                sx={{ textTransform: 'none' }}
                            >
                                {currentGameChannel?.icon} {currentGameChannel?.name}
                            </Button>
                            <Menu anchorEl={anchorEl} open={open} onClose={() => handleGameMenuClose()}>
                                {gameChannels.map((channel) => (
                                    <MenuItem
                                        key={channel.id}
                                        onClick={() => handleGameMenuClose(channel.id)}
                                        selected={currentGameChat === channel.id}
                                    >
                                        {channel.icon} {channel.name}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    )}

                    <TabPanel value={tabValue} index={0}>
                        <ChatWindow
                            title="Chat Geral"
                            messages={generalMessages}
                            currentUser={currentUser}
                            onSendMessage={handleSendMessage}
                            onLikeMessage={handleLikeMessage}
                        />
                    </TabPanel>

                    <TabPanel value={tabValue} index={1}>
                        <ChatWindow
                            title={`Chat ${currentGameChannel?.name}`}
                            messages={gameSpecificChats[currentGameChat] || []}
                            currentUser={currentUser}
                            onSendMessage={handleSendMessage}
                            onLikeMessage={handleLikeMessage}
                        />
                    </TabPanel>

                    <TabPanel value={tabValue} index={2}>
                        <ChatWindow
                            title="Discussão da Partida"
                            messages={matchMessages}
                            currentUser={currentUser}
                            onSendMessage={handleSendMessage}
                            onLikeMessage={handleLikeMessage}
                        />
                    </TabPanel>

                    <TabPanel value={tabValue} index={3}>
                        <ChatWindow
                            title="Táticas e Análises"
                            messages={tacticsMessages}
                            currentUser={currentUser}
                            onSendMessage={handleSendMessage}
                            onLikeMessage={handleLikeMessage}
                        />
                    </TabPanel>
                </Box>

                <Box
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        flexBasis: { md: '33.333%', lg: '25%' },
                        height: '100%',
                    }}
                >
                    <Paper
                        elevation={3}
                        sx={{
                            height: '100%',
                            p: 2,
                            bgcolor: 'background.paper',
                            borderRadius: 2,
                            overflow: 'auto',
                        }}
                    >
                        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box
                                sx={{
                                    width: 12,
                                    height: 12,
                                    bgcolor: 'error.main',
                                    borderRadius: '50%',
                                    animation: 'pulse 2s infinite',
                                    display: 'inline-block',
                                }}
                            />
                            Partidas Ao Vivo
                        </Typography>

                        {liveGame ? (
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
                        ) : (
                            <Card sx={{ mb: 3, bgcolor: 'background.default', p: 2, borderRadius: 2 }}>
                                <Typography color="text.secondary" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 2 }}>
                                    Nenhuma partida ao vivo no momento
                                </Typography>
                            </Card>
                        )}

                        <Box sx={{ mt: 4 }}>
                            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Box component="span" sx={{ color: 'primary.main', fontSize: '1.2rem' }}>🎮</Box>
                                Jogos da FURIA
                            </Typography>

                            <Box 
                                sx={{ 
                                    display: 'grid', 
                                    gridTemplateColumns: 'repeat(2, 1fr)', 
                                    gap: 1.5,
                                    bgcolor: 'background.default',
                                    p: 1.5,
                                    borderRadius: 2
                                }}
                            >
                                {gameChannels.map((channel) => (
                                    <Chip
                                        key={channel.id}
                                        label={`${channel.icon} ${channel.name}`}
                                        onClick={() => {
                                            setTabValue(1);
                                            setCurrentGameChat(channel.id);
                                        }}
                                        sx={{ 
                                            mb: 0.5, 
                                            py: 1.5,
                                            fontSize: '0.85rem',
                                            fontWeight: currentGameChat === channel.id ? 'bold' : 'normal',
                                            bgcolor: currentGameChat === channel.id ? 'primary.main' : 'action.hover',
                                            color: currentGameChat === channel.id ? 'white' : 'text.primary',
                                            '&:hover': {
                                                bgcolor: currentGameChat === channel.id ? 'primary.dark' : 'action.selected',
                                            }
                                        }}
                                    />
                                ))}
                            </Box>
                        </Box>

                        <Box sx={{ mt: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Usuários Ativos
                            </Typography>

                            {[...users, currentUser].map((user) => (
                                <Box
                                    key={user.id}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                        mb: 1,
                                        p: 1,
                                        borderRadius: 1,
                                        '&:hover': {
                                            bgcolor: 'background.default',
                                        },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            position: 'relative',
                                            display: 'inline-flex',
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={user.avatar}
                                            alt={user.name}
                                            sx={{
                                                width: 32,
                                                height: 32,
                                                borderRadius: '50%',
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                bottom: 0,
                                                right: 0,
                                                width: 10,
                                                height: 10,
                                                bgcolor: 'success.main',
                                                borderRadius: '50%',
                                                border: '1px solid',
                                                borderColor: 'background.paper',
                                            }}
                                        />
                                    </Box>
                                    <Typography>{user.name}</Typography>
                                </Box>
                            ))}
                        </Box>
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
};

export default Chat;