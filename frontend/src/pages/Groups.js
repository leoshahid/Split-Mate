import React, { useState } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Person, Close } from '@mui/icons-material';
import {
    Box,
    Grid,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Divider,
    Card,
    Button,
    InputField,
    Avatar
} from 'components';

const GroupsContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2),
    },
}));

const ScreenHeader = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(3),
    },
}));

const ScreenTitle = styled(Typography)(({ theme }) => ({
    fontSize: '1.875rem',
    fontWeight: 700,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.5rem',
    },
}));

const ScreenSubtitle = styled(Typography)(({ theme }) => ({
    fontSize: '1.125rem',
    color: theme.palette.text.secondary,
    [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
    },
}));

const FormCard = styled(Card)(({ theme }) => ({
    maxWidth: 800,
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
        margin: 0,
    },
}));

const Form = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
        gap: theme.spacing(2),
    },
}));

const FormRow = styled(Grid)(({ theme }) => ({
    gap: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
        gap: theme.spacing(2),
    },
}));

const FormGroup = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
}));

const FormLabel = styled(Typography)(({ theme }) => ({
    fontSize: '0.875rem',
    fontWeight: 500,
    color: theme.palette.text.secondary,
}));

const MemberInput = styled(Box)(({ theme }) => ({
    border: `2px solid ${theme.palette.grey[300]}`,
    borderRadius: theme.shape.borderRadius * 1.5,
    padding: theme.spacing(1.5),
    backgroundColor: theme.palette.background.paper,
    minHeight: 60,
    transition: 'all 0.2s ease',

    '&:focus-within': {
        borderColor: theme.palette.primary.main,
        boxShadow: `0 0 0 3px ${theme.palette.primary.light}20`,
    },
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1),
        minHeight: 50,
    },
}));

const MemberTags = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1),
    marginBottom: theme.spacing(1.5),
    [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(1),
    },
}));

const MemberTag = styled(Box)(({ theme }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    padding: theme.spacing(1, 1.5),
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.dark,
    borderRadius: theme.shape.borderRadius * 2,
    fontSize: '0.875rem',
    fontWeight: 500,
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.75rem',
        padding: theme.spacing(0.5, 1),
    },
}));

const RemoveMemberButton = styled(Button)(({ theme }) => ({
    background: 'none',
    border: 'none',
    color: theme.palette.primary.main,
    cursor: 'pointer',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.shape.borderRadius * 2,
    width: 20,
    height: 20,
    minWidth: 'auto',
    minHeight: 'auto',

    '&:hover': {
        backgroundColor: theme.palette.primary.light,
    },
}));

const MemberSearch = styled(InputField)(({ theme }) => ({
    border: 'none',
    outline: 'none',
    width: '100%',
    padding: theme.spacing(1),
    fontSize: '1rem',
    backgroundColor: 'transparent',
    '& .MuiOutlinedInput-root': {
        border: 'none',
        boxShadow: 'none',
    },
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(0.5),
        fontSize: '0.875rem',
    },
}));

const SuggestedFriends = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
        marginTop: theme.spacing(1.5),
    },
}));

const SuggestedTitle = styled(Typography)(({ theme }) => ({
    fontSize: '1.125rem',
    fontWeight: 600,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
        marginBottom: theme.spacing(1.5),
    },
}));

const FriendList = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1.5),
    [theme.breakpoints.down('sm')]: {
        gap: theme.spacing(1),
    },
}));

const FriendItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
    padding: theme.spacing(1.5),
    borderRadius: theme.shape.borderRadius * 1.5,
    transition: 'background-color 0.2s ease',

    '&:hover': {
        backgroundColor: theme.palette.grey[100],
    },
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1),
        gap: theme.spacing(1),
    },
}));

const FriendInfo = styled(Box)(({ theme }) => ({
    flex: 1,
}));

const FriendName = styled(Typography)(({ theme }) => ({
    fontSize: '1rem',
    fontWeight: 600,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(0.5),
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.875rem',
    },
}));

const FriendEmail = styled(Typography)(({ theme }) => ({
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.75rem',
    },
}));

const AddFriendButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    border: 'none',
    padding: theme.spacing(1, 2),
    borderRadius: theme.shape.borderRadius,
    fontSize: '0.875rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    minHeight: 'auto',

    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
    },
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(0.5, 1.5),
        fontSize: '0.75rem',
    },
}));

const FormActions = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-end',
    gap: theme.spacing(2),
    marginTop: theme.spacing(3),
    paddingTop: theme.spacing(3),
    borderTop: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.down('sm')]: {
        marginTop: theme.spacing(2),
        paddingTop: theme.spacing(2),
        gap: theme.spacing(1),
    },
}));

const Groups = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [formData, setFormData] = useState({
        groupName: 'Trip to Murree',
        description: 'Weekend trip with friends to Murree',
        members: ['Sara Ahmed', 'Usman Khan', 'Fatima Ali'],
        memberSearch: '',
    });

    const suggestedFriends = [
        { name: 'Ahmed Hassan', email: 'ahmed@example.com' },
        { name: 'Zara Khan', email: 'zara@example.com' },
    ];

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleRemoveMember = (memberToRemove) => {
        setFormData(prev => ({
            ...prev,
            members: prev.members.filter(member => member !== memberToRemove),
        }));
    };

    const handleAddFriend = (friend) => {
        if (!formData.members.includes(friend.name)) {
            setFormData(prev => ({
                ...prev,
                members: [...prev.members, friend.name],
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Creating group:', formData);
        // Handle form submission
    };

    return (
        <GroupsContainer>
            <ScreenHeader>
                <ScreenTitle>Create New Group</ScreenTitle>
                <ScreenSubtitle>
                    Start a new expense group with your friends
                </ScreenSubtitle>
            </ScreenHeader>

            <FormCard variant="form">
                <Form component="form" onSubmit={handleSubmit}>
                    <FormGroup>
                        <FormLabel>Group Name</FormLabel>
                        <InputField
                            placeholder="e.g., Trip to Murree"
                            value={formData.groupName}
                            onChange={(e) => handleInputChange('groupName', e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Description (Optional)</FormLabel>
                        <InputField
                            multiline
                            rows={isMobile ? 2 : 3}
                            placeholder="Add a description for this group"
                            value={formData.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Add Members</FormLabel>
                        <MemberInput>
                            <MemberTags>
                                {formData.members.map((member, index) => (
                                    <MemberTag key={index}>
                                        {member}
                                        <RemoveMemberButton
                                            onClick={() => handleRemoveMember(member)}
                                            size="small"
                                        >
                                            <Close fontSize="small" />
                                        </RemoveMemberButton>
                                    </MemberTag>
                                ))}
                            </MemberTags>
                            <MemberSearch
                                placeholder="Search friends..."
                                value={formData.memberSearch}
                                onChange={(e) => handleInputChange('memberSearch', e.target.value)}
                                inputVariant="member"
                            />
                        </MemberInput>
                    </FormGroup>

                    <SuggestedFriends>
                        <SuggestedTitle>Suggested Friends</SuggestedTitle>
                        <FriendList>
                            {suggestedFriends.map((friend, index) => (
                                <FriendItem key={index}>
                                    <Avatar variant="grey" size="medium">
                                        <Person />
                                    </Avatar>
                                    <FriendInfo>
                                        <FriendName>{friend.name}</FriendName>
                                        <FriendEmail>{friend.email}</FriendEmail>
                                    </FriendInfo>
                                    <AddFriendButton
                                        onClick={() => handleAddFriend(friend)}
                                        disabled={formData.members.includes(friend.name)}
                                    >
                                        {formData.members.includes(friend.name) ? 'Added' : 'Add'}
                                    </AddFriendButton>
                                </FriendItem>
                            ))}
                        </FriendList>
                    </SuggestedFriends>

                    <FormActions>
                        <Button variant="primary" type="submit" fullWidth={isMobile}>
                            Create Group
                        </Button>
                    </FormActions>
                </Form>
            </FormCard>
        </GroupsContainer>
    );
};

export default Groups; 