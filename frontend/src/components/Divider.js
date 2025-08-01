import React from 'react';
import { Divider as MuiDivider } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledDivider = styled(MuiDivider)(({ theme, variant = 'horizontal' }) => ({
    margin: theme.spacing(1, 0),
    backgroundColor: theme.palette.divider,

    ...(variant === 'vertical' && {
        margin: theme.spacing(0, 1),
        height: 'auto',
        alignSelf: 'stretch',
    }),
}));

const Divider = ({
    variant = 'horizontal',
    orientation = 'horizontal',
    flexItem = false,
    ...props
}) => {
    return (
        <StyledDivider
            variant={variant}
            orientation={orientation}
            flexItem={flexItem}
            {...props}
        />
    );
};

export default Divider; 