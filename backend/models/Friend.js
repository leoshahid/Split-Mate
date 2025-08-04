const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
    // User 1 in the friendship
    user1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // User 2 in the friendship
    user2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // Status of the friendship (only accepted for transaction-based friendships)
    status: {
        type: String,
        enum: ['accepted'],
        default: 'accepted'
    },
    // If they've had any transactions together (auto-friend)
    hasTransactions: {
        type: Boolean,
        default: true
    },
    // Last interaction between them
    lastInteraction: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Compound index to ensure unique friend relationships
friendSchema.index({ user1: 1, user2: 1 }, { unique: true });

// Virtual for checking if friendship is active
friendSchema.virtual('isActive').get(function () {
    return this.status === 'accepted';
});

// Static method to find friends of a user
friendSchema.statics.findFriends = function (userId) {
    return this.find({
        $or: [
            { user1: userId },
            { user2: userId }
        ],
        status: 'accepted'
    }).populate('user1', 'name email profilePicture')
        .populate('user2', 'name email profilePicture');
};

// Static method to check if two users are friends
friendSchema.statics.areFriends = function (userId1, userId2) {
    return this.findOne({
        $or: [
            { user1: userId1, user2: userId2 },
            { user1: userId2, user2: userId1 }
        ],
        status: 'accepted'
    });
};

// Static method to create or update friend relationship
friendSchema.statics.createOrUpdateFriendship = function (userId1, userId2) {
    return this.findOneAndUpdate(
        {
            $or: [
                { user1: userId1, user2: userId2 },
                { user1: userId2, user2: userId1 }
            ]
        },
        {
            user1: userId1,
            user2: userId2,
            status: 'accepted',
            hasTransactions: true,
            lastInteraction: new Date()
        },
        {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true
        }
    );
};

module.exports = mongoose.model('Friend', friendSchema); 