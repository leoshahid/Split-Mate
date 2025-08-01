import React from 'react';
import { FormControl, InputLabel, Select as MuiSelect, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledFormControl = styled(FormControl)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: theme.shape.borderRadius * 1.5,
        transition: 'all 0.2s ease',

        '& fieldset': {
            borderColor: theme.palette.grey[300],
            borderWidth: 2,
        },

        '&:hover fieldset': {
            borderColor: theme.palette.primary.light,
        },

        '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.main,
            borderWidth: 2,
        },
    },

    '& .MuiInputLabel-root': {
        color: theme.palette.text.secondary,
        fontWeight: 500,

        '&.Mui-focused': {
            color: theme.palette.primary.main,
        },
    },

    '& .MuiSelect-select': {
        fontSize: '1rem',
        padding: theme.spacing(1.5, 2),
    },
}));

const Select = ({
    label,
    value,
    onChange,
    options = [],
    required = false,
    disabled = false,
    fullWidth = true,
    error,
    helperText,
    ...props
}) => {
    return (
        <StyledFormControl
            fullWidth={fullWidth}
            required={required}
            disabled={disabled}
            error={error}
        >
            {label && <InputLabel>{label}</InputLabel>}
            <MuiSelect
                value={value}
                onChange={onChange}
                label={label}
                {...props}
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </MuiSelect>
        </StyledFormControl>
    );
};

export default Select; 