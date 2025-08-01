import React from 'react';
import { IconButton as MuiIconButton } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledIconButton = styled(MuiIconButton)(({ theme, variant = 'default', size = 'medium' }) => ({
    borderRadius: theme.shape.borderRadius * 1.5,
    transition: 'all 0.2s ease',

    // Size variants
    ...(size === 'small' && {
        width: 32,
        height: 32,
        '& .MuiSvgIcon-root': {
            fontSize: '1rem',
        },
    }),

    ...(size === 'medium' && {
        width: 40,
        height: 40,
        '& .MuiSvgIcon-root': {
            fontSize: '1.25rem',
        },
    }),

    ...(size === 'large' && {
        width: 48,
        height: 48,
        '& .MuiSvgIcon-root': {
            fontSize: '1.5rem',
        },
    }),

    // Variant styles
    ...(variant === 'default' && {
        color: theme.palette.grey[600],
        '&:hover': {
            backgroundColor: theme.palette.grey[100],
            color: theme.palette.grey[900],
        },
    }),

    ...(variant === 'primary' && {
        color: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: theme.palette.primary.light + '20',
            color: theme.palette.primary.dark,
        },
    }),

    ...(variant === 'secondary' && {
        color: theme.palette.secondary.main,
        '&:hover': {
            backgroundColor: theme.palette.secondary.light + '20',
            color: theme.palette.secondary.dark,
        },
    }),

    // Disabled state
    '&:disabled': {
        opacity: 0.5,
        cursor: 'not-allowed',
    },
}));

const IconButton = ({
    children,
    variant = 'default',
    size = 'medium',
    onClick,
    disabled = false,
    ...props
}) => {
    return (
        <StyledIconButton
            variant={variant}
            size={size}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {children}
        </StyledIconButton>
    );
};

export default IconButton; 