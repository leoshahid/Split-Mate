import React from 'react';
import { ListItemIcon as MuiListItemIcon } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledListItemIcon = styled(MuiListItemIcon)(({ theme }) => ({
    minWidth: 40,
    color: theme.palette.grey[600],

    '& .MuiSvgIcon-root': {
        fontSize: '1.25rem',
    },
}));

const ListItemIcon = ({
    children,
    ...props
}) => {
    return (
        <StyledListItemIcon {...props}>
            {children}
        </StyledListItemIcon>
    );
};

export default ListItemIcon; 