import React from 'react';
import { Button as MuiButton } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledButton = styled(MuiButton)(({ theme, variant: buttonVariant, size: buttonSize }) => ({
    borderRadius: theme.shape.borderRadius * 1.5,
    textTransform: 'none',
    fontWeight: 500,
    minHeight: 48,
    padding: theme.spacing(1.5, 3),
    transition: 'all 0.2s ease',

    // Primary variant
    ...(buttonVariant === 'primary' && {
        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
        color: theme.palette.primary.contrastText,
        '&:hover': {
            background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
            boxShadow: theme.shadows[4],
            transform: 'translateY(-1px)',
        },
    }),

    // Secondary variant
    ...(buttonVariant === 'secondary' && {
        background: theme.palette.background.paper,
        color: theme.palette.primary.main,
        border: `2px solid ${theme.palette.primary.light}`,
        '&:hover': {
            background: theme.palette.primary.light + '20',
            borderColor: theme.palette.primary.main,
        },
    }),

    // Success variant
    ...(buttonVariant === 'success' && {
        background: `linear-gradient(135deg, ${theme.palette.success.main}, ${theme.palette.success.dark})`,
        color: theme.palette.success.contrastText,
        '&:hover': {
            background: `linear-gradient(135deg, ${theme.palette.success.dark}, ${theme.palette.success.main})`,
            boxShadow: theme.shadows[4],
        },
    }),

    // Warning variant
    ...(buttonVariant === 'warning' && {
        background: `linear-gradient(135deg, ${theme.palette.warning.main}, ${theme.palette.warning.dark})`,
        color: theme.palette.warning.contrastText,
        '&:hover': {
            background: `linear-gradient(135deg, ${theme.palette.warning.dark}, ${theme.palette.warning.main})`,
            boxShadow: theme.shadows[4],
        },
    }),

    // Danger variant
    ...(buttonVariant === 'danger' && {
        background: `linear-gradient(135deg, ${theme.palette.error.main}, ${theme.palette.error.dark})`,
        color: theme.palette.error.contrastText,
        '&:hover': {
            background: `linear-gradient(135deg, ${theme.palette.error.dark}, ${theme.palette.error.main})`,
            boxShadow: theme.shadows[4],
        },
    }),

    // Size variants
    ...(buttonSize === 'small' && {
        minHeight: 36,
        padding: theme.spacing(1, 2),
        fontSize: '0.875rem',
    }),

    ...(buttonSize === 'large' && {
        minHeight: 56,
        padding: theme.spacing(2, 4),
        fontSize: '1.125rem',
    }),

    // Disabled state
    '&:disabled': {
        opacity: 0.6,
        transform: 'none !important',
    },
}));

const Button = ({
    children,
    variant = 'primary',
    size = 'medium',
    startIcon,
    endIcon,
    fullWidth = false,
    disabled = false,
    loading = false,
    onClick,
    type = 'button',
    ...props
}) => {
    return (
        <StyledButton
            variant={variant}
            size={size}
            startIcon={loading ? null : startIcon}
            endIcon={loading ? null : endIcon}
            fullWidth={fullWidth}
            disabled={disabled || loading}
            onClick={onClick}
            type={type}
            {...props}
        >
            {loading ? 'Loading...' : children}
        </StyledButton>
    );
};

export default Button; 