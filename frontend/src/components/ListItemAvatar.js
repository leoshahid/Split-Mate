import React from 'react';
import { ListItemAvatar as MuiListItemAvatar } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledListItemAvatar = styled(MuiListItemAvatar)(({ theme }) => ({
    minWidth: 40,
}));

const ListItemAvatar = ({
    children,
    ...props
}) => {
    return (
        <StyledListItemAvatar {...props}>
            {children}
        </StyledListItemAvatar>
    );
};

export default ListItemAvatar; 