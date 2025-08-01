import React, { useState } from 'react';
import {
    AppBar as MuiAppBar,
    Toolbar,
    Box,
    useTheme,
    useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
    Notifications,
    Person,
    Settings,
    Logout,
    ChevronRight,
    Menu as MenuIcon
} from '@mui/icons-material';
import IconButton from '../IconButton';
import Badge from '../Badge';
import Menu from '../Menu';
import MenuItem from '../MenuItem';
import Divider from '../Divider';
import ListItemIcon from '../ListItemIcon';
import ListItemText from '../ListItemText';
import Avatar from '../Avatar';
import Typography from '../Typography';

const StyledAppBar = styled(MuiAppBar)(({ theme }) => ({
    height: 64,
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[1],
    position: 'sticky',
    top: 0,
    zIndex: 100,
    color: theme.palette.text.primary,
}));

const AppBarContent = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    padding: theme.spacing(0, 3),
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(0, 2),
    },
}));

const AppBarLeft = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
}));

const PageTitle = styled(Typography)(({ theme }) => ({
    fontSize: '1.25rem',
    fontWeight: 600,
    color: theme.palette.text.primary,
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.125rem',
    },
}));

const AppBarRight = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
}));

const UserMenu = styled(Box)(({ theme }) => ({
    position: 'relative',
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
        backgroundColor: theme.palette.primary.light,
    },
}));

const UserInfo = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
}));

const UserName = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(0.5),
}));

const UserEmail = styled(Typography)(({ theme }) => ({
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
}));

const AppBar = ({ pageTitle, user, onLogout, onMobileMenuToggle }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleUserMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleUserMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleUserMenuClose();
        onLogout();
    };

    return (
        <StyledAppBar elevation={0}>
            <Toolbar>
                <AppBarContent>
                    <AppBarLeft>
                        {isMobile && (
                            <IconButton
                                onClick={onMobileMenuToggle}
                                size="large"
                                variant="default"
                                aria-label="menu"
                            >
                                <MenuIcon />
                            </IconButton>
                        )}
                        <PageTitle>{pageTitle}</PageTitle>
                    </AppBarLeft>

                    <AppBarRight>
                        <Badge badgeContent={3} color="error">
                            <IconButton variant="default" size="medium">
                                <Notifications />
                            </IconButton>
                        </Badge>

                        <UserMenu>
                            <UserAvatar
                                onClick={handleUserMenuClick}
                                size="medium"
                                variant="primary"
                            >
                                <Person />
                            </UserAvatar>

                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleUserMenuClose}
                            >
                                <UserInfo>
                                    <UserName>{user?.name || 'User Name'}</UserName>
                                    <UserEmail>{user?.email || 'user@example.com'}</UserEmail>
                                </UserInfo>

                                <Divider />

                                <MenuItem onClick={handleUserMenuClose}>
                                    <ListItemIcon>
                                        <Person fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText primary="Profile" />
                                </MenuItem>

                                <MenuItem onClick={handleUserMenuClose}>
                                    <ListItemIcon>
                                        <Settings fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText primary="Settings" />
                                </MenuItem>

                                <Divider />

                                <MenuItem onClick={handleLogout}>
                                    <ListItemIcon>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText primary="Sign Out" />
                                </MenuItem>
                            </Menu>
                        </UserMenu>
                    </AppBarRight>
                </AppBarContent>
            </Toolbar>
        </StyledAppBar>
    );
};

export default AppBar; 