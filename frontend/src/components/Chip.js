import React from 'react';
import { Chip as MuiChip } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledChip = styled(MuiChip)(({ theme, variant: chipVariant }) => ({
    borderRadius: theme.shape.borderRadius * 2,
    fontWeight: 600,
    fontSize: '0.875rem',
    height: 28,

    // Positive variant (green)
    ...(chipVariant === 'positive' && {
        backgroundColor: theme.palette.success.light,
        color: theme.palette.success.dark,
        '&:hover': {
            backgroundColor: theme.palette.success.main,
            color: theme.palette.success.contrastText,
        },
    }),

    // Negative variant (red)
    ...(chipVariant === 'negative' && {
        backgroundColor: theme.palette.error.light,
        color: theme.palette.error.dark,
        '&:hover': {
            backgroundColor: theme.palette.error.main,
            color: theme.palette.error.contrastText,
        },
    }),

    // Neutral variant (grey)
    ...(chipVariant === 'neutral' && {
        backgroundColor: theme.palette.grey[100],
        color: theme.palette.grey[700],
        '&:hover': {
            backgroundColor: theme.palette.grey[200],
        },
    }),

    // Primary variant (blue)
    ...(chipVariant === 'primary' && {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.dark,
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
        },
    }),

    // Warning variant (orange)
    ...(chipVariant === 'warning' && {
        backgroundColor: theme.palette.warning.light,
        color: theme.palette.warning.dark,
        '&:hover': {
            backgroundColor: theme.palette.warning.main,
            color: theme.palette.warning.contrastText,
        },
    }),
}));

const Chip = ({
    label,
    variant = 'neutral',
    size = 'medium',
    color = 'default',
    onDelete,
    clickable = false,
    ...props
}) => {
    return (
        <StyledChip
            label={label}
            variant={variant}
            size={size}
            color={color}
            onDelete={onDelete}
            clickable={clickable}
            {...props}
        />
    );
};

export default Chip; 