import React from 'react';
import { Typography as MuiTypography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTypography = styled(MuiTypography)(({ theme, variant: textVariant }) => ({
    // Add any custom styling here if needed
    ...(textVariant === 'h1' && {
        fontSize: '2.25rem',
        fontWeight: 700,
        lineHeight: 1.2,
    }),

    ...(textVariant === 'h2' && {
        fontSize: '1.875rem',
        fontWeight: 700,
        lineHeight: 1.3,
    }),

    ...(textVariant === 'h3' && {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.3,
    }),

    ...(textVariant === 'h4' && {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.4,
    }),

    ...(textVariant === 'h5' && {
        fontSize: '1.125rem',
        fontWeight: 600,
        lineHeight: 1.4,
    }),

    ...(textVariant === 'h6' && {
        fontSize: '1rem',
        fontWeight: 600,
        lineHeight: 1.4,
    }),

    ...(textVariant === 'body1' && {
        fontSize: '1rem',
        lineHeight: 1.6,
    }),

    ...(textVariant === 'body2' && {
        fontSize: '0.875rem',
        lineHeight: 1.5,
    }),
}));

const Typography = ({
    children,
    variant = 'body1',
    ...props
}) => {
    return (
        <StyledTypography variant={variant} {...props}>
            {children}
        </StyledTypography>
    );
};

export default Typography; 