import React from 'react';
import { DialogActions as MuiDialogActions } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledDialogActions = styled(MuiDialogActions)(({ theme }) => ({
    padding: theme.spacing(2, 3, 3, 3),
    gap: theme.spacing(1),
}));

const DialogActions = ({ children, ...props }) => {
    return <StyledDialogActions {...props}>{children}</StyledDialogActions>;
};

export default DialogActions; 