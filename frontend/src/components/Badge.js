import React from 'react';
import { Badge as MuiBadge } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledBadge = styled(MuiBadge)(({ theme, color = 'error' }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: theme.palette[color].main,
        color: theme.palette[color].contrastText,
        fontSize: '0.75rem',
        fontWeight: 600,
        minWidth: 18,
        height: 18,
        borderRadius: theme.shape.borderRadius * 2,
        padding: theme.spacing(0, 0.5),
    },
}));

const Badge = ({
    children,
    badgeContent,
    color = 'error',
    showZero = false,
    max = 99,
    ...props
}) => {
    return (
        <StyledBadge
            badgeContent={badgeContent}
            color={color}
            showZero={showZero}
            max={max}
            {...props}
        >
            {children}
        </StyledBadge>
    );
};

export default Badge; 