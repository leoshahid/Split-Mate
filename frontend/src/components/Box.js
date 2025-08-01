import React from 'react';
import { Box as MuiBox } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledBox = styled(MuiBox)(({ theme }) => ({
    // Add any custom styling here if needed
}));

const Box = ({
    children,
    ...props
}) => {
    return (
        <StyledBox {...props}>
            {children}
        </StyledBox>
    );
};

export default Box; 