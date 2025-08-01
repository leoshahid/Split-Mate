import React from 'react';
import { FormControlLabel as MuiFormControlLabel } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledFormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
    cursor: 'pointer',
    padding: theme.spacing(1.5),
    borderRadius: theme.shape.borderRadius * 1.5,
    transition: 'background-color 0.2s ease',

    '&:hover': {
        backgroundColor: theme.palette.grey[100],
    },

    '& .MuiFormControlLabel-label': {
        fontSize: '1rem',
        color: theme.palette.text.primary,
    },
}));

const FormControlLabel = ({
    control,
    label,
    ...props
}) => {
    return (
        <StyledFormControlLabel
            control={control}
            label={label}
            {...props}
        />
    );
};

export default FormControlLabel; 