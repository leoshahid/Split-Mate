const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    // Who paid for this expense
    payer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // Who participated in this expense (including payer)
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    // How much was paid
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    // Currency of the transaction
    currency: {
        type: String,
        default: 'PKR'
    },
    // Description of the expense
    description: {
        type: String,
        required: true,
        trim: true
    },
    // Category of the expense
    category: {
        type: String,
        enum: ['food', 'transport', 'entertainment', 'shopping', 'bills', 'other'],
        default: 'other'
    },
    // Group this transaction belongs to (optional for individual expenses)
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    },
    // Date of the transaction
    date: {
        type: Date,
        default: Date.now
    },
    // Split type: equal, percentage, custom amounts
    splitType: {
        type: String,
        enum: ['equal', 'percentage', 'custom'],
        default: 'equal'
    },
    // Custom split amounts (for custom split type)
    customSplits: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        amount: {
            type: Number,
            default: 0
        }
    }],
    // Receipt image URL (optional)
    receipt: {
        type: String
    },
    // Notes about the transaction
    notes: {
        type: String,
        trim: true
    },
    // Whether this transaction is settled
    isSettled: {
        type: Boolean,
        default: false
    },
    // Settlement date
    settledAt: {
        type: Date
    }
}, {
    timestamps: true
});

// Index for efficient queries
transactionSchema.index({ payer: 1, date: -1 });
transactionSchema.index({ participants: 1, date: -1 });
transactionSchema.index({ group: 1, date: -1 });

// Virtual for calculating per-person amount
transactionSchema.virtual('perPersonAmount').get(function () {
    if (this.splitType === 'equal') {
        return this.amount / this.participants.length;
    }
    return 0; // For custom splits, calculate individually
});

// Method to calculate what each person owes
transactionSchema.methods.calculateSplits = function () {
    const splits = [];

    if (this.splitType === 'equal') {
        const perPerson = this.amount / this.participants.length;
        this.participants.forEach(participant => {
            if (participant.toString() === this.payer.toString()) {
                // Payer gets back what others owe them
                splits.push({
                    user: participant,
                    amount: this.amount - perPerson,
                    owes: false
                });
            } else {
                // Others owe the per-person amount
                splits.push({
                    user: participant,
                    amount: perPerson,
                    owes: true
                });
            }
        });
    } else if (this.splitType === 'custom') {
        this.customSplits.forEach(split => {
            if (split.user.toString() === this.payer.toString()) {
                splits.push({
                    user: split.user,
                    amount: this.amount - split.amount,
                    owes: false
                });
            } else {
                splits.push({
                    user: split.user,
                    amount: split.amount,
                    owes: true
                });
            }
        });
    }

    return splits;
};

// Static method to get balance between two users
transactionSchema.statics.getBalanceBetweenUsers = async function (userId1, userId2) {
    const transactions = await this.find({
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

    return balance;
};

// Static method to get all balances for a user
transactionSchema.statics.getAllBalances = async function (userId) {
    const transactions = await this.find({
        participants: userId
    }).populate('payer', 'name email')
        .populate('participants', 'name email');

    const balances = {};

    transactions.forEach(transaction => {
        const splits = transaction.calculateSplits();
        splits.forEach(split => {
            const otherUserId = split.user.toString();
            if (otherUserId !== userId) {
                if (!balances[otherUserId]) {
                    balances[otherUserId] = {
                        user: split.user,
                        balance: 0
                    };
                }

                if (split.owes) {
                    balances[otherUserId].balance += split.amount;
                } else {
                    balances[otherUserId].balance -= split.amount;
                }
            }
        });
    });

    return Object.values(balances);
};

module.exports = mongoose.model('Transaction', transactionSchema); 