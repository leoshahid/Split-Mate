import React from 'react';
import { Card as MuiCard, CardContent, CardHeader } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(MuiCard)(({ theme, variant }) => ({
    borderRadius: theme.shape.borderRadius * 1.5,
    boxShadow: theme.shadows[2],
    border: `1px solid ${theme.palette.divider}`,
    transition: 'all 0.2s ease',
    overflow: 'hidden',

    '&:hover': {
        boxShadow: theme.shadows[4],
        transform: 'translateY(-2px)',
    },

    // Balance card variants
    ...(variant === 'balance-positive' && {
        background: `linear-gradient(135deg, ${theme.palette.success.main}, ${theme.palette.success.dark})`,
        color: theme.palette.success.contrastText,
        border: 'none',
    }),

    ...(variant === 'balance-negative' && {
        background: `linear-gradient(135deg, ${theme.palette.error.main}, ${theme.palette.error.dark})`,
        color: theme.palette.error.contrastText,
        border: 'none',
    }),

    ...(variant === 'balance-primary' && {
        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
        color: theme.palette.primary.contrastText,
        border: 'none',
    }),

    // Action card variant
    ...(variant === 'action' && {
        border: `2px solid ${theme.palette.grey[200]}`,
        background: theme.palette.background.paper,
        cursor: 'pointer',
        '&:hover': {
            borderColor: theme.palette.primary.light,
            background: theme.palette.primary.light + '10',
        },
    }),

    // Form card variant
    ...(variant === 'form' && {
        maxWidth: 800,
        margin: '0 auto',
    }),

    // Profile card variant
    ...(variant === 'profile' && {
        padding: theme.spacing(3),
    }),
}));

const StyledCardContent = styled(CardContent)(({ theme, variant }) => ({
    padding: theme.spacing(3),

    // Balance card content
    ...(variant?.startsWith('balance-') && {
        padding: theme.spacing(4),
    }),

    // Action card content
    ...(variant === 'action' && {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: theme.spacing(2),
        padding: theme.spacing(4),
    }),

    // Form card content
    ...(variant === 'form' && {
        padding: theme.spacing(4),
    }),
}));

const StyledCardHeader = styled(CardHeader)(({ theme, variant }) => ({
    padding: theme.spacing(3),
    borderBottom: `1px solid ${theme.palette.divider}`,

    '& .MuiCardHeader-title': {
        fontSize: '1.25rem',
        fontWeight: 600,
        color: variant?.startsWith('balance-') ? 'inherit' : theme.palette.text.primary,
    },

    '& .MuiCardHeader-action': {
        margin: 0,
    },
}));

const Card = ({
    children,
    variant = 'default',
    title,
    subtitle,
    action,
    headerAction,
    ...props
}) => {
    return (
        <StyledCard variant={variant} {...props}>
            {title && (
                <StyledCardHeader
                    title={title}
                    subtitle={subtitle}
                    action={headerAction}
                    variant={variant}
                />
            )}
            <StyledCardContent variant={variant}>
                {children}
            </StyledCardContent>
        </StyledCard>
    );
};

export default Card; 