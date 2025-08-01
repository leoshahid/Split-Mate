import React from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
    Person,
    Group,
    Receipt,
    CheckCircle,
    Notifications,
    Security,
    Help,
    Info,
    ChevronRight
} from '@mui/icons-material';
import {
    Box,
    Grid,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Card,
    Button,
    Avatar
} from 'components';

const ProfileContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2),
    },
}));

const ProfileHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(3),
    marginBottom: theme.spacing(4),
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius * 1.5,
    boxShadow: theme.shadows[2],
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        textAlign: 'center',
        gap: theme.spacing(2),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
    },
}));

const ProfileAvatarLarge = styled(Avatar)(({ theme }) => ({
    width: 100,
    height: 100,
    fontSize: '3rem',
    [theme.breakpoints.down('sm')]: {
        width: 80,
        height: 80,
        fontSize: '2.5rem',
    },
}));

const ProfileInfo = styled(Box)(({ theme }) => ({
    flex: 1,
}));

const ProfileName = styled(Typography)(({ theme }) => ({
    fontSize: '1.875rem',
    fontWeight: 700,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.5rem',
    },
}));

const ProfileEmail = styled(Typography)(({ theme }) => ({
    fontSize: '1.125rem',
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
        marginBottom: theme.spacing(1.5),
    },
}));

const StatsGrid = styled(Grid)(({ theme }) => ({
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(3),
    },
}));

const StatCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2),
        gap: theme.spacing(1.5),
    },
}));

const StatIcon = styled(Box)(({ theme }) => ({
    width: 48,
    height: 48,
    backgroundColor: theme.palette.primary.light,
    borderRadius: theme.shape.borderRadius * 1.5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.primary.dark,
    [theme.breakpoints.down('sm')]: {
        width: 40,
        height: 40,
    },
}));

const StatContent = styled(Box)(({ theme }) => ({
    flex: 1,
}));

const StatNumber = styled(Typography)(({ theme }) => ({
    fontSize: '1.5rem',
    fontWeight: 700,
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(0.5),
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.25rem',
    },
}));

const StatLabel = styled(Typography)(({ theme }) => ({
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.75rem',
    },
}));

const SettingsCard = styled(Card)(({ theme }) => ({
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(3),
    },
}));

const SettingsTitle = styled(Typography)(({ theme }) => ({
    fontSize: '1.25rem',
    fontWeight: 600,
    color: theme.palette.text.primary,
    padding: theme.spacing(2, 3),
    borderBottom: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.125rem',
        padding: theme.spacing(1.5, 2),
    },
}));

const SettingsList = styled(List)(({ theme }) => ({
    padding: 0,
}));

const SettingsItem = styled(ListItem)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
    padding: theme.spacing(2, 3),
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',

    '&:hover': {
        backgroundColor: theme.palette.grey[100],
    },
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1.5, 2),
        gap: theme.spacing(1),
    },
}));

const SettingsItemText = styled(ListItemText)(({ theme }) => ({
    flex: 1,
    '& .MuiListItemText-primary': {
        fontSize: '1rem',
        color: theme.palette.text.primary,
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.875rem',
        },
    },
}));

const SettingsItemIcon = styled(ListItemIcon)(({ theme }) => ({
    minWidth: 40,
    color: theme.palette.grey[600],
    [theme.breakpoints.down('sm')]: {
        minWidth: 32,
    },
}));

const ChevronIcon = styled(Box)(({ theme }) => ({
    color: theme.palette.grey[400],
}));

const LogoutSection = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(3),
    },
}));

const Profile = ({ onLogout }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const stats = [
        {
            icon: Group,
            number: '5',
            label: 'Active Groups',
        },
        {
            icon: Receipt,
            number: '12',
            label: 'Total Expenses',
        },
        {
            icon: CheckCircle,
            number: '8',
            label: 'Settled Up',
        },
    ];

    const settingsItems = [
        { icon: Notifications, label: 'Notifications' },
        { icon: Security, label: 'Privacy & Security' },
        { icon: Help, label: 'Help & Support' },
        { icon: Info, label: 'About SplitMate' },
    ];

    const handleSettingClick = (setting) => {
        console.log(`${setting} clicked`);
        // Handle setting navigation
    };

    return (
        <ProfileContainer>
            {/* Profile Header */}
            <ProfileHeader>
                <ProfileAvatarLarge variant="primary" size="xlarge">
                    <Person />
                </ProfileAvatarLarge>
                <ProfileInfo>
                    <ProfileName>Ali Ahmed</ProfileName>
                    <ProfileEmail>ali@example.com</ProfileEmail>
                    <Button variant="secondary" size="small">
                        Edit Profile
                    </Button>
                </ProfileInfo>
            </ProfileHeader>

            {/* Stats Grid */}
            <StatsGrid container spacing={isMobile ? 2 : 3}>
                {stats.map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <StatCard>
                                <StatIcon>
                                    <IconComponent />
                                </StatIcon>
                                <StatContent>
                                    <StatNumber>{stat.number}</StatNumber>
                                    <StatLabel>{stat.label}</StatLabel>
                                </StatContent>
                            </StatCard>
                        </Grid>
                    );
                })}
            </StatsGrid>

            {/* Settings */}
            <SettingsCard>
                <SettingsTitle>Settings</SettingsTitle>
                <SettingsList>
                    {settingsItems.map((item, index) => {
                        const IconComponent = item.icon;
                        return (
                            <React.Fragment key={index}>
                                <SettingsItem onClick={() => handleSettingClick(item.label)}>
                                    <SettingsItemIcon>
                                        <IconComponent />
                                    </SettingsItemIcon>
                                    <SettingsItemText primary={item.label} />
                                    <ChevronIcon>
                                        <ChevronRight />
                                    </ChevronIcon>
                                </SettingsItem>
                                {index < settingsItems.length - 1 && <Divider />}
                            </React.Fragment>
                        );
                    })}
                </SettingsList>
            </SettingsCard>

            {/* Logout Section */}
            <LogoutSection>
                <Button variant="danger" onClick={onLogout} fullWidth={isMobile}>
                    Sign Out
                </Button>
            </LogoutSection>
        </ProfileContainer>
    );
};

export default Profile; 