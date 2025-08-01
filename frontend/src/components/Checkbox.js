import React from 'react';
import { Checkbox as MuiCheckbox } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCheckbox = styled(MuiCheckbox)(({ theme }) => ({
    color: theme.palette.grey[400],

    '&.Mui-checked': {
        color: theme.palette.primary.main,
    },

    '&:hover': {
        backgroundColor: theme.palette.primary.light + '20',
    },
}));

const Checkbox = ({
    ...props
}) => {
    return (
        <StyledCheckbox {...props} />
    );
};

export default Checkbox; 