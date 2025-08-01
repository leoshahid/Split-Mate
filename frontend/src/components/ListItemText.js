import React from 'react';
import { ListItemText as MuiListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledListItemText = styled(MuiListItemText)(({ theme }) => ({
    flex: 1,

    '& .MuiListItemText-primary': {
        fontSize: '1rem',
        color: theme.palette.text.primary,
        fontWeight: 500,
    },

    '& .MuiListItemText-secondary': {
        fontSize: '0.875rem',
        color: theme.palette.text.secondary,
    },
}));

const ListItemText = ({
    primary,
    secondary,
    ...props
}) => {
    return (
        <StyledListItemText
            primary={primary}
            secondary={secondary}
            {...props}
        />
    );
};

export default ListItemText; 