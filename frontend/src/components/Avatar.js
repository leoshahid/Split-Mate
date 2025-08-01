import React from 'react';
import { Avatar as MuiAvatar } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledAvatar = styled(MuiAvatar)(({ theme, variant: avatarVariant, size: avatarSize }) => ({
    // Default styling
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.dark,
    fontWeight: 600,
    fontSize: '1rem',

    // Size variants
    ...(avatarSize === 'small' && {
        width: 32,
        height: 32,
        fontSize: '0.75rem',
    }),

    ...(avatarSize === 'medium' && {
        width: 40,
        height: 40,
        fontSize: '1rem',
    }),

    ...(avatarSize === 'large' && {
        width: 56,
        height: 56,
        fontSize: '1.25rem',
    }),

    ...(avatarSize === 'xlarge' && {
        width: 100,
        height: 100,
        fontSize: '2rem',
    }),

    // Variant styling
    ...(avatarVariant === 'primary' && {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.dark,
    }),

    ...(avatarVariant === 'secondary' && {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.secondary.dark,
    }),

    ...(avatarVariant === 'success' && {
        backgroundColor: theme.palette.success.light,
        color: theme.palette.success.dark,
    }),

    ...(avatarVariant === 'error' && {
        backgroundColor: theme.palette.error.light,
        color: theme.palette.error.dark,
    }),

    ...(avatarVariant === 'warning' && {
        backgroundColor: theme.palette.warning.light,
        color: theme.palette.warning.dark,
    }),

    ...(avatarVariant === 'info' && {
        backgroundColor: theme.palette.info.light,
        color: theme.palette.info.dark,
    }),

    ...(avatarVariant === 'grey' && {
        backgroundColor: theme.palette.grey[200],
        color: theme.palette.grey[600],
    }),
}));

const Avatar = ({
    src,
    alt,
    children,
    variant = 'primary',
    size = 'medium',
    ...props
}) => {
    return (
        <StyledAvatar
            src={src}
            alt={alt}
            variant={variant}
            size={size}
            {...props}
        >
            {children}
        </StyledAvatar>
    );
};

export default Avatar; 