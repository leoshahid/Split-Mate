import React from 'react';
import { DialogContent as MuiDialogContent } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledDialogContent = styled(MuiDialogContent)(({ theme }) => ({
    padding: theme.spacing(2, 3, 1, 3),
}));

const DialogContent = ({ children, ...props }) => {
    return <StyledDialogContent {...props}>{children}</StyledDialogContent>;
};

export default DialogContent; 