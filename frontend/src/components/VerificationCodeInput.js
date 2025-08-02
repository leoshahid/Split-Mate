import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: theme.spacing(2),
        transition: 'all 0.2s ease',
        width: '60px',
        height: '60px',
        textAlign: 'center',
        fontSize: '1.5rem',
        fontWeight: 'bold',

        '& fieldset': {
            borderColor: theme.palette.grey[300],
            borderWidth: 2,
        },

        '&:hover fieldset': {
            borderColor: theme.palette.primary.main,
        },

        '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.main,
            borderWidth: 2,
        },

        '& input': {
            textAlign: 'center',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            padding: theme.spacing(1.5),
        }
    },

    '& .MuiInputBase-input': {
        '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0,
        },
        '&[type=number]': {
            '-moz-appearance': 'textfield',
        },
    }
}));

const VerificationCodeInput = ({
    length = 6,
    onComplete,
    onCodeChange,
    error = false,
    helperText = '',
    disabled = false
}) => {
    const [code, setCode] = useState(Array(length).fill(''));
    const inputRefs = useRef([]);

    useEffect(() => {
        inputRefs.current = inputRefs.current.slice(0, length);
    }, [length]);

    const handleChange = (index, value) => {
        if (value.length > 1) {
            value = value.slice(-1);
        }

        if (!/^\d*$/.test(value)) {
            return;
        }

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Call onCodeChange with the current code
        const currentCode = newCode.join('');
        onCodeChange?.(currentCode);

        // Move to next input if value is entered
        if (value && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }

        // Check if code is complete
        if (newCode.every(digit => digit !== '') && onComplete) {
            onComplete(currentCode);
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text/plain').slice(0, length);

        if (!/^\d+$/.test(pastedData)) {
            return;
        }

        const newCode = Array(length).fill('');
        for (let i = 0; i < pastedData.length && i < length; i++) {
            newCode[i] = pastedData[i];
        }

        setCode(newCode);
        const currentCode = newCode.join('');
        onCodeChange?.(currentCode);

        if (currentCode.length === length && onComplete) {
            onComplete(currentCode);
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box
                sx={{
                    display: 'flex',
                    gap: 2,
                    justifyContent: 'center',
                    mb: 2
                }}
            >
                {Array.from({ length }, (_, index) => (
                    <StyledTextField
                        key={index}
                        inputRef={el => inputRefs.current[index] = el}
                        value={code[index]}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        inputProps={{
                            maxLength: 1,
                            inputMode: 'numeric',
                            pattern: '[0-9]*'
                        }}
                        error={error}
                        disabled={disabled}
                        autoFocus={index === 0}
                    />
                ))}
            </Box>
            {helperText && (
                <Typography
                    variant="body2"
                    color={error ? 'error' : 'text.secondary'}
                    textAlign="center"
                    sx={{ mt: 1 }}
                >
                    {helperText}
                </Typography>
            )}
        </Box>
    );
};

export default VerificationCodeInput; 