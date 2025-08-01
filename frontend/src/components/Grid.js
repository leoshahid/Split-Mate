import React from 'react';
import { Grid as MuiGrid } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledGrid = styled(MuiGrid)(({ theme }) => ({
    // Add any custom styling here if needed
}));

const Grid = ({
    children,
    ...props
}) => {
    return (
        <StyledGrid {...props}>
            {children}
        </StyledGrid>
    );
};

export default Grid; 