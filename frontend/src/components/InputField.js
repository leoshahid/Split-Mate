import React from 'react';
import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)(({ theme, variant: inputVariant }) => ({
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

    '& .MuiInputBase-input': {
        fontSize: '1rem',
        padding: theme.spacing(1.5, 2),
    },

    // Amount input variant
    ...(inputVariant === 'amount' && {
        '& .MuiOutlinedInput-root': {
            paddingLeft: 0,
        },

        '& .MuiInputBase-input': {
            paddingLeft: theme.spacing(2),
        },
    }),

    // Member input variant
    ...(inputVariant === 'member' && {
        '& .MuiOutlinedInput-root': {
            minHeight: 60,
            padding: theme.spacing(1.5),
        },

        '& .MuiInputBase-input': {
            padding: theme.spacing(1),
        },
    }),
}));

const InputField = ({
    variant = 'outlined',
    inputVariant,
    label,
    placeholder,
    value,
    onChange,
    error,
    helperText,
    required = false,
    disabled = false,
    fullWidth = true,
    multiline = false,
    rows = 1,
    type = 'text',
    startAdornment,
    endAdornment,
    ...props
}) => {
    return (
        <StyledTextField
            variant={variant}
            inputVariant={inputVariant}
            label={label}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            error={error}
            helperText={helperText}
            required={required}
            disabled={disabled}
            fullWidth={fullWidth}
            multiline={multiline}
            rows={rows}
            type={type}
            InputProps={{
                startAdornment,
                endAdornment,
            }}
            {...props}
        />
    );
};

export default InputField; 