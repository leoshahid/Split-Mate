const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Expense title is required'],
        trim: true,
        maxlength: [200, 'Title cannot be more than 200 characters']
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required'],
        min: [0.01, 'Amount must be greater than 0']
    },
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        required: true
    },
    paidBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    splitWith: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    splitType: {
        type: String,
        enum: ['equal', 'percentage', 'custom'],
        default: 'equal'
    },
    splitDetails: {
        type: Map,
        of: Number,
        default: new Map()
    },
    notes: {
        type: String,
        trim: true,
        maxlength: [500, 'Notes cannot be more than 500 characters']
    }
}, {
    timestamps: true
});

// Ensure paidBy is included in splitWith
expenseSchema.pre('save', function (next) {
    if (!this.splitWith.includes(this.paidBy)) {
        this.splitWith.push(this.paidBy);
    }
    next();
});

module.exports = mongoose.model('Expense', expenseSchema); 