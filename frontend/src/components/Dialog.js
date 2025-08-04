import React from 'react';
import { Dialog as MuiDialog } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledDialog = styled(MuiDialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        borderRadius: theme.spacing(2),
        boxShadow: theme.shadows[24],
    },
}));

const Dialog = ({ children, ...props }) => {
    return <StyledDialog {...props}>{children}</StyledDialog>;
};

export default Dialog; 