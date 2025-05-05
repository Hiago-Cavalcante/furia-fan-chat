import { createTheme } from '@mui/material/styles';

// Changing to a white background with black accents color scheme
const theme = createTheme({
    palette: {
        primary: {
            main: '#000000', // Black as primary color
            dark: '#333333', // Slightly lighter black for hover states
        },
        secondary: {
            main: '#ffffff', // White as secondary color
        },
        background: {
            default: '#ffffff', // White background
            paper: '#f5f5f5', // Light gray for cards/components
        },
        text: {
            primary: '#121212', // Near black text
            secondary: '#666666', // Dark gray text
        },
        error: {
            main: '#000000', // Black instead of red
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 700,
        },
        h2: {
            fontWeight: 700,
        },
        button: {
            fontWeight: 600,
            textTransform: 'none',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
                containedPrimary: {
                    color: '#ffffff', // White text on black buttons
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                colorPrimary: {
                    backgroundColor: '#000000',
                    color: '#ffffff',
                },
                colorError: {
                    backgroundColor: '#000000',
                    color: '#ffffff',
                }
            }
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: 'rgba(0, 0, 0, 0.12)',
                }
            }
        }
    },
});

export default theme;