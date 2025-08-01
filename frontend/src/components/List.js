import React from 'react';
import { List as MuiList } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledList = styled(MuiList)(({ theme }) => ({
    padding: theme.spacing(2),
}));

const List = ({
    children,
    ...props
}) => {
    return (
        <StyledList {...props}>
            {children}
        </StyledList>
    );
};

export default List; 