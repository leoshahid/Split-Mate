import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#2196f3',
            light: '#64b5f6',
            dark: '#1976d2',
            contrastText: '#ffffff'
        },
        secondary: {
            main: '#e91e63',
            light: '#f48fb1',
            dark: '#c2185b',
            contrastText: '#ffffff'
        },
        background: {
            default: '#fafafa',
            paper: '#ffffff'
        },
        text: {
            primary: '#212121',
            secondary: '#757575'
        },
        success: {
            main: '#4caf50',
            light: '#c8e6c9',
            dark: '#388e3c'
        },
        error: {
            main: '#f44336',
            light: '#ffcdd2',
            dark: '#d32f2f'
        },
        warning: {
            main: '#ff9800',
            light: '#ffe0b2',
            dark: '#f57c00'
        },
        info: {
            main: '#2196f3',
            light: '#bbdefb',
            dark: '#1976d2'
        },
        grey: {
            50: '#fafafa',
            100: '#f5f5f5',
            200: '#eeeeee',
            300: '#e0e0e0',
            400: '#bdbdbd',
            500: '#9e9e9e',
            600: '#757575',
            700: '#616161',
            800: '#424242',
            900: '#212121',
        },
    },
    typography: {
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        h1: {
            fontSize: '2.25rem',
            fontWeight: 700,
            lineHeight: 1.2
        },
        h2: {
            fontSize: '1.875rem',
            fontWeight: 700,
            lineHeight: 1.3
        },
        h3: {
            fontSize: '1.5rem',
            fontWeight: 600,
            lineHeight: 1.3
        },
        h4: {
            fontSize: '1.25rem',
            fontWeight: 600,
            lineHeight: 1.4
        },
        h5: {
            fontSize: '1.125rem',
            fontWeight: 600,
            lineHeight: 1.4
        },
        h6: {
            fontSize: '1rem',
            fontWeight: 600,
            lineHeight: 1.4
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.6
        },
        body2: {
            fontSize: '0.875rem',
            lineHeight: 1.5
        },
        button: {
            textTransform: 'none',
            fontWeight: 500
        },
    },
    shape: {
        borderRadius: 8
    },
    spacing: 8,
    shadows: [
        'none',
        '0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
        '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
        '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)',
        '0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
    ],
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    textTransform: 'none',
                    fontWeight: 500,
                    padding: '12px 24px',
                    minHeight: 48,
                    transition: 'all 0.2s ease',
                },
                contained: {
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    '&:hover': {
                        boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                        transform: 'translateY(-1px)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    border: '1px solid #e0e0e0',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 12,
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    fontWeight: 600,
                },
            },
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    fontWeight: 600,
                },
            },
        },
    },
});

export default theme; 