import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledGoogleButton = styled(Button)(({ theme }) => ({
    width: '100%',
    height: '60px',
    borderRadius: theme.spacing(2),
    border: `2px solid ${theme.palette.grey[300]}`,
    backgroundColor: '#ffffff',
    color: theme.palette.text.primary,
    fontSize: '1.1rem',
    fontWeight: 600,
    textTransform: 'none',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',

    '&:hover': {
        backgroundColor: '#f8f9fa',
        borderColor: theme.palette.grey[400],
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        transform: 'translateY(-1px)',
    },

    '&:active': {
        transform: 'translateY(0)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    },

    '& .MuiButton-startIcon': {
        marginRight: theme.spacing(1.5),
    },

    '& .google-icon': {
        fontSize: '1.5rem',
        color: '#4285f4',
    }
}));

const GoogleAuthButton = ({ onClick, disabled = false, loading = false }) => {
    return (
        <Box sx={{ width: '100%' }}>
            <StyledGoogleButton
                variant="outlined"
                startIcon={<GoogleIcon className="google-icon" />}
                onClick={onClick}
                disabled={disabled || loading}
                sx={{
                    opacity: loading ? 0.7 : 1,
                    cursor: loading ? 'not-allowed' : 'pointer'
                }}
            >
                {loading ? (
                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                        Signing in with Google...
                    </Typography>
                ) : (
                    <Typography variant="body1">
                        Continue with Google
                    </Typography>
                )}
            </StyledGoogleButton>
        </Box>
    );
};

export default GoogleAuthButton; 