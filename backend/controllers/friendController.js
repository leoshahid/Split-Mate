const Friend = require('../models/Friend');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

// Get all friends with balances (people you've had transactions with)
const getFriends = async (req, res) => {
    try {
        const userId = req.user.id;

        // Get all accepted friends (people you've had transactions with)
        const friends = await Friend.findFriends(userId);

        // Get balances for each friend
        const friendsWithBalances = await Promise.all(
            friends.map(async (friendship) => {
                const friendId = friendship.user1._id.toString() === userId
                    ? friendship.user2._id
                    : friendship.user1._id;

                const friend = friendship.user1._id.toString() === userId
                    ? friendship.user2
                    : friendship.user1;

                // Calculate balance between users
                const balance = await calculateBalance(userId, friendId);

                // Get breakdown by groups
                const breakdown = await getBalanceBreakdown(userId, friendId);

                return {
                    id: friend._id,
                    name: friend.name,
                    email: friend.email,
                    profilePicture: friend.profilePicture,
                    avatar: friend.name.split(' ').map(n => n[0]).join('').toUpperCase(),
                    balance: balance.total,
                    currency: friend.currency || 'PKR',
                    breakdown: breakdown
                };
            })
        );

        // Calculate overall balance
        const overallBalance = friendsWithBalances.reduce((acc, friend) => {
            if (friend.balance > 0) {
                acc.owed += friend.balance;
            } else {
                acc.owe += Math.abs(friend.balance);
            }
            return acc;
        }, { owed: 0, owe: 0 });

        res.json({
            success: true,
            data: {
                friends: friendsWithBalances,
                overallBalance: {
                    total: `PKR ${overallBalance.owed.toFixed(2)} + $${(overallBalance.owed * 0.0036).toFixed(2)}`, // Rough USD conversion
                    breakdown: `You're owed PKR ${overallBalance.owed.toFixed(2)} and owe PKR ${overallBalance.owe.toFixed(2)}`
                }
            }
        });
    } catch (error) {
        console.error('Error getting friends:', error);
        res.status(500).json({ success: false, message: 'Error fetching friends' });
    }
};

// Search for users by email or name
const searchUsers = async (req, res) => {
    try {
        const { query } = req.query;
        const userId = req.user.id;

        if (!query || query.length < 2) {
            return res.json({ success: true, data: [] });
        }

        // Search by email or name
        const users = await User.find({
            $or: [
                { email: { $regex: query, $options: 'i' } },
                { name: { $regex: query, $options: 'i' } }
            ],
            _id: { $ne: userId } // Exclude current user
        }).select('name email profilePicture');

        // Check if they're already friends (have transactions together)
        const usersWithStatus = await Promise.all(
            users.map(async (user) => {
                const friendship = await Friend.findOne({
                    $or: [
                        { user1: userId, user2: user._id },
                        { user1: user._id, user2: userId }
                    ],
                    status: 'accepted'
                });

                return {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    profilePicture: user.profilePicture,
                    isFriend: !!friendship
                };
            })
        );

        res.json({ success: true, data: usersWithStatus });
    } catch (error) {
        console.error('Error searching users:', error);
        res.status(500).json({ success: false, message: 'Error searching users' });
    }
};

// Auto-create friendship when transaction is created
const autoCreateFriendship = async (userId1, userId2) => {
    try {
        const existingFriendship = await Friend.findOne({
            $or: [
                { user1: userId1, user2: userId2 },
                { user1: userId2, user2: userId1 }
            ]
        });

        if (!existingFriendship) {
            // Auto-accept friendship when they have transactions
            await Friend.createOrUpdateFriendship(userId1, userId2);
        }
    } catch (error) {
        console.error('Error auto-creating friendship:', error);
    }
};

// Helper function to calculate balance between two users
const calculateBalance = async (userId1, userId2) => {
    try {
        const transactions = await Transaction.find({
            $or: [
                { payer: userId1, participants: userId2 },
                { payer: userId2, participants: userId1 }
            ]
        });

        let balance = 0;
        transactions.forEach(transaction => {
            if (transaction.payer.toString() === userId1) {
                // User 1 paid, so user 2 owes money
                balance += transaction.amount;
            } else {
                // User 2 paid, so user 1 owes money
                balance -= transaction.amount;
            }
        });

        return { total: balance };
    } catch (error) {
        console.error('Error calculating balance:', error);
        return { total: 0 };
    }
};

// Helper function to get balance breakdown by groups
const getBalanceBreakdown = async (userId1, userId2) => {
    try {
        const transactions = await Transaction.find({
            $or: [
                { payer: userId1, participants: userId2 },
                { payer: userId2, participants: userId1 }
            ]
        }).populate('group', 'name');

        const breakdown = {};
        transactions.forEach(transaction => {
            const groupName = transaction.group ? transaction.group.name : 'non-group expenses';
            const amount = transaction.payer.toString() === userId1 ? transaction.amount : -transaction.amount;

            if (!breakdown[groupName]) {
                breakdown[groupName] = 0;
            }
            breakdown[groupName] += amount;
        });

        return Object.entries(breakdown).map(([group, amount]) => ({
            group,
            amount
        }));
    } catch (error) {
        console.error('Error getting balance breakdown:', error);
        return [];
    }
};

module.exports = {
    getFriends,
    searchUsers,
    autoCreateFriendship
}; 