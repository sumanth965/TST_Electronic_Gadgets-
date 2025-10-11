const mongoose = require('mongoose');

const addSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
    },
    itemDescription: {
        type: String,
        required: true,
    },
    itemImage: {
        type: String,
        required: true,
    },
    itemPrice: {
        type: Number,
        required: true,
    },
    itemQuality: {
        type: Number,
        required: true,
        min: 1,
        max: 5, // Ensuring that the value is between 1 and 5
    },
    itemCategory: {
        type: String,
        required: true,
        min: 1,
        max: 1, // Ensuring that the value is between 1 and 5
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

// Create and export the Add model
const Add = mongoose.model('Add', addSchema);
module.exports = Add;
