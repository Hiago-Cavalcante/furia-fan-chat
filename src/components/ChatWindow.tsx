import { useState, useRef, useEffect } from 'react';
import { Box, TextField, IconButton, Paper, Typography, Divider } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import MessageBubble from './MessageBubble';
import { Message, User } from '../types';

interface ChatWindowProps {
    title: string;
    messages: Message[];
    currentUser: User;
    onSendMessage: (text: string) => void;
    onLikeMessage?: (messageId: string) => void;
}

const ChatWindow = ({
    title,
    messages,
    currentUser,
    onSendMessage,
    onLikeMessage,
}: ChatWindowProps) => {
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSend = () => {
        if (newMessage.trim()) {
            onSendMessage(newMessage);
            setNewMessage('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <Paper
            elevation={3}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                bgcolor: 'background.default',
                borderRadius: 2,
                overflow: 'hidden',
                border: '1px solid rgba(0, 0, 0, 0.12)',
            }}
        >
            <Box sx={{ p: 2, bgcolor: 'background.paper', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
                <Typography variant="h6">{title}</Typography>
            </Box>
            <Divider />
            <Box
                sx={{
                    p: 2,
                    flexGrow: 1,
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {messages.length === 0 ? (
                    <Box
                        sx={{
                            display: 'flex',
                            flexGrow: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="body1" color="text.secondary">
                            Nenhuma mensagem ainda. Seja o primeiro a enviar uma mensagem!
                        </Typography>
                    </Box>
                ) : (
                    messages.map((message) => (
                        <MessageBubble
                            key={message.id}
                            message={message}
                            isOwnMessage={message.user.id === currentUser.id}
                            onLike={onLikeMessage}
                        />
                    ))
                )}
                <div ref={messagesEndRef} />
            </Box>
            <Divider />
            <Box
                component="form"
                sx={{
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    bgcolor: 'background.paper',
                    borderTop: '1px solid rgba(0, 0, 0, 0.12)',
                }}
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                }}
            >
                <IconButton size="small" sx={{ color: 'text.secondary' }}>
                    <EmojiEmotionsOutlinedIcon />
                </IconButton>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Digite uma mensagem..."
                    size="small"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 3,
                            bgcolor: 'background.default',
                        },
                    }}
                />
                <IconButton
                    color="primary"
                    onClick={handleSend}
                    disabled={!newMessage.trim()}
                    sx={{
                        bgcolor: 'primary.main',
                        color: 'secondary.main',
                        '&:hover': {
                            bgcolor: 'primary.dark',
                        },
                        '&.Mui-disabled': {
                            bgcolor: 'rgba(0, 0, 0, 0.12)',
                            color: 'rgba(0, 0, 0, 0.26)',
                        },
                    }}
                >
                    <SendIcon />
                </IconButton>
            </Box>
        </Paper>
    );
};

export default ChatWindow;