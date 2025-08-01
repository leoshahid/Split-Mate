import React from 'react';
import { Radio as MuiRadio } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledRadio = styled(MuiRadio)(({ theme }) => ({
    color: theme.palette.grey[400],

    '&.Mui-checked': {
        color: theme.palette.primary.main,
    },

    '&:hover': {
        backgroundColor: theme.palette.primary.light + '20',
    },
}));

const Radio = ({
    ...props
}) => {
    return (
        <StyledRadio {...props} />
    );
};

export default Radio; 