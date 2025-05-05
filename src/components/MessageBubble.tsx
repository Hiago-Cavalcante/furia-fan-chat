import { Avatar, Box, Paper, Typography, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import { Message } from '../types';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    borderRadius: 12,
    maxWidth: '70%',
    position: 'relative',
}));

interface MessageBubbleProps {
    message: Message;
    isOwnMessage: boolean;
    onLike?: (messageId: string) => void;
}

const MessageBubble = ({ message, isOwnMessage, onLike }: MessageBubbleProps) => {
    const { text, user, timestamp, likes = 0 } = message;
    const messageDate = new Date(timestamp);
    const timeString = messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: isOwnMessage ? 'row-reverse' : 'row',
                mb: 2,
                gap: 1,
                alignItems: 'flex-end',
            }}
        >
            {!isOwnMessage && (
                <Avatar alt={user.name} src={user.avatar} sx={{ width: 32, height: 32 }} />
            )}
            <Box>
                {!isOwnMessage && (
                    <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                        {user.name}
                    </Typography>
                )}
                <StyledPaper
                    elevation={1}
                    sx={{
                        bgcolor: isOwnMessage ? 'primary.main' : 'background.paper',
                        color: isOwnMessage ? 'secondary.main' : 'text.primary',
                        border: isOwnMessage ? 'none' : '1px solid rgba(0, 0, 0, 0.12)',
                    }}
                >
                    <Typography variant="body1">{text}</Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mt: 1,
                        }}
                    >
                        <Typography variant="caption" color={isOwnMessage ? 'secondary.main' : 'text.secondary'}>
                            {timeString}
                        </Typography>
                        {!isOwnMessage && (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <IconButton
                                    size="small"
                                    onClick={() => onLike && onLike(message.id)}
                                    sx={{ color: 'text.secondary' }}
                                >
                                    <ThumbUpAltOutlinedIcon fontSize="small" />
                                </IconButton>
                                {likes > 0 && (
                                    <Typography variant="caption" color="text.secondary">
                                        {likes}
                                    </Typography>
                                )}
                            </Box>
                        )}
                    </Box>
                </StyledPaper>
            </Box>
        </Box>
    );
};

export default MessageBubble;