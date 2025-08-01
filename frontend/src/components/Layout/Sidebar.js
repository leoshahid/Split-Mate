import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, IconButton, Drawer, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
    Dashboard,
    Group,
    ReceiptLong,
    History,
    Person,
    Receipt,
    Menu,
    Close
} from '@mui/icons-material';

const SidebarContainer = styled(Box)(({ theme, isMobile }) => ({
    width: isMobile ? '100%' : 280,
    backgroundColor: theme.palette.background.paper,
    borderRight: isMobile ? 'none' : `1px solid ${theme.palette.divider}`,
    position: isMobile ? 'static' : 'fixed',
    height: isMobile ? 'auto' : '100vh',
    overflowY: isMobile ? 'visible' : 'auto',
    zIndex: 1000,
}));

const SidebarHeader = styled(Box)(({ theme, isMobile }) => ({
    padding: theme.spacing(3),
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: isMobile ? 'space-between' : 'flex-start',
}));

const Logo = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
}));

const LogoIcon = styled(Box)(({ theme }) => ({
    width: 40,
    height: 40,
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    borderRadius: theme.shape.borderRadius * 1.5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.primary.contrastText,
}));

const LogoText = styled(Typography)(({ theme }) => ({
    fontSize: '1.25rem',
    fontWeight: 700,
    color: theme.palette.primary.main,
}));

const StyledListItemButton = styled(ListItemButton)(({ theme, active }) => ({
    margin: theme.spacing(0.5, 2),
    borderRadius: theme.shape.borderRadius * 1.5,
    transition: 'all 0.2s ease',

    ...(active && {
        backgroundColor: theme.palette.primary.light + '20',
        color: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: theme.palette.primary.light + '30',
        },
    }),

    '&:hover': {
        backgroundColor: theme.palette.grey[100],
    },
}));

const StyledListItemIcon = styled(ListItemIcon)(({ theme, active }) => ({
    minWidth: 40,
    color: active ? theme.palette.primary.main : theme.palette.grey[600],
}));

const StyledListItemText = styled(ListItemText)(({ theme, active }) => ({
    '& .MuiListItemText-primary': {
        fontWeight: 500,
        color: active ? theme.palette.primary.main : theme.palette.text.primary,
    },
}));

const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Dashboard },
    { id: 'groups', label: 'Groups', icon: Group },
    { id: 'expenses', label: 'Expenses', icon: ReceiptLong },
    { id: 'history', label: 'History', icon: History },
    { id: 'profile', label: 'Profile', icon: Person },
];

const Sidebar = ({ activeScreen, onScreenChange, mobileOpen, onMobileToggle }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleNavClick = (screenId) => {
        onScreenChange(screenId);
        if (isMobile && mobileOpen) {
            onMobileToggle();
        }
    };

    const sidebarContent = (
        <>
            <SidebarHeader isMobile={isMobile}>
                <Logo>
                    <LogoIcon>
                        <Receipt />
                    </LogoIcon>
                    <LogoText>SplitMate</LogoText>
                </Logo>
                {isMobile && (
                    <IconButton onClick={onMobileToggle}>
                        <Close />
                    </IconButton>
                )}
            </SidebarHeader>

            <List sx={{ padding: theme => theme.spacing(2, 0) }}>
                {navigationItems.map((item) => {
                    const IconComponent = item.icon;
                    const isActive = activeScreen === item.id;

                    return (
                        <ListItem key={item.id} disablePadding>
                            <StyledListItemButton
                                active={isActive ? 1 : 0}
                                onClick={() => handleNavClick(item.id)}
                            >
                                <StyledListItemIcon active={isActive ? 1 : 0}>
                                    <IconComponent />
                                </StyledListItemIcon>
                                <StyledListItemText
                                    primary={item.label}
                                    active={isActive ? 1 : 0}
                                />
                            </StyledListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </>
    );

    if (isMobile) {
        return (
            <Drawer
                variant="temporary"
                anchor="left"
                open={mobileOpen}
                onClose={onMobileToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': {
                        width: 280,
                        boxSizing: 'border-box',
                    },
                }}
            >
                {sidebarContent}
            </Drawer>
        );
    }

    return (
        <SidebarContainer isMobile={isMobile}>
            {sidebarContent}
        </SidebarContainer>
    );
};

export default Sidebar; 