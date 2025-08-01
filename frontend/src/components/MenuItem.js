import React from 'react';
import { MenuItem as MuiMenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledMenuItem = styled(MuiMenuItem)(({ theme }) => ({
    padding: theme.spacing(1.5, 2),
    gap: theme.spacing(1.5),
    transition: 'background-color 0.2s ease',

    '&:hover': {
        backgroundColor: theme.palette.grey[100],
    },

    '&:active': {
        backgroundColor: theme.palette.grey[200],
    },
}));

const MenuItem = ({
    children,
    onClick,
    disabled = false,
    ...props
}) => {
    return (
        <StyledMenuItem
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {children}
        </StyledMenuItem>
    );
};

export default MenuItem; 