// models/Expense.js
const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    vendor: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: String, required: true },
    status: { type: String, required: true },
});

// optional: create a text index for full‐text search
expenseSchema.index({ vendor: 'text', category: 'text', status: 'text' });

module.exports = mongoose.model('Expense', expenseSchema);
