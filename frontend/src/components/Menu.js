import React from 'react';
import { Menu as MuiMenu } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledMenu = styled(MuiMenu)(({ theme }) => ({
    '& .MuiPaper-root': {
        minWidth: 200,
        borderRadius: theme.shape.borderRadius * 1.5,
        boxShadow: theme.shadows[4],
        border: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(1),
    },
}));

const Menu = ({
    children,
    anchorEl,
    open,
    onClose,
    anchorOrigin = {
        vertical: 'bottom',
        horizontal: 'right',
    },
    transformOrigin = {
        vertical: 'top',
        horizontal: 'right',
    },
    ...props
}) => {
    return (
        <StyledMenu
            anchorEl={anchorEl}
            open={open}
            onClose={onClose}
            anchorOrigin={anchorOrigin}
            transformOrigin={transformOrigin}
            {...props}
        >
            {children}
        </StyledMenu>
    );
};

export default Menu; 