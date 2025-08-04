import React from 'react';
import { DialogTitle as MuiDialogTitle } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledDialogTitle = styled(MuiDialogTitle)(({ theme }) => ({
    fontSize: '1.25rem',
    fontWeight: 600,
    padding: theme.spacing(3, 3, 1, 3),
}));

const DialogTitle = ({ children, ...props }) => {
    return <StyledDialogTitle {...props}>{children}</StyledDialogTitle>;
};

export default DialogTitle; 