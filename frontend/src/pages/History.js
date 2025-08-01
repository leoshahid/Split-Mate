import React from 'react';
import { styled } from '@mui/material/styles';
import { History } from '@mui/icons-material';
import {
    Box,
    Typography,
    Card
} from 'components';

const HistoryContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3),
}));

const ScreenHeader = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(4),
}));

const ScreenTitle = styled(Typography)(({ theme }) => ({
    fontSize: '1.875rem',
    fontWeight: 700,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(1),
}));

const ScreenSubtitle = styled(Typography)(({ theme }) => ({
    fontSize: '1.125rem',
    color: theme.palette.text.secondary,
}));

const PlaceholderCard = styled(Card)(({ theme }) => ({
    textAlign: 'center',
    padding: theme.spacing(6),
}));

const PlaceholderIcon = styled(Box)(({ theme }) => ({
    fontSize: '4rem',
    color: theme.palette.grey[400],
    marginBottom: theme.spacing(2),
}));

const PlaceholderTitle = styled(Typography)(({ theme }) => ({
    fontSize: '1.5rem',
    fontWeight: 600,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(1),
}));

const PlaceholderText = styled(Typography)(({ theme }) => ({
    fontSize: '1rem',
    color: theme.palette.text.secondary,
}));

const HistoryPage = () => {
    return (
        <HistoryContainer>
            <ScreenHeader>
                <ScreenTitle>History</ScreenTitle>
                <ScreenSubtitle>
                    View your complete transaction history and expense reports
                </ScreenSubtitle>
            </ScreenHeader>

            <PlaceholderCard>
                <PlaceholderIcon>
                    <History />
                </PlaceholderIcon>
                <PlaceholderTitle>Coming Soon</PlaceholderTitle>
                <PlaceholderText>
                    The transaction history feature will be implemented here. You'll be able to view all your past expenses, settlements, and generate reports.
                </PlaceholderText>
            </PlaceholderCard>
        </HistoryContainer>
    );
};

export default HistoryPage; 