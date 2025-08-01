import React from 'react';
import { ListItem as MuiListItem } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledListItem = styled(MuiListItem)(({ theme }) => ({
    padding: theme.spacing(1.5, 0),
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
    transition: 'background-color 0.2s ease',

    '&:last-child': {
        borderBottom: 'none',
    },

    '&:hover': {
        backgroundColor: theme.palette.grey[50],
    },
}));

const ListItem = ({
    children,
    ...props
}) => {
    return (
        <StyledListItem {...props}>
            {children}
        </StyledListItem>
    );
};

export default ListItem; 