const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    deliveryInfo: {
        firstName: String,
        lastName: String,
        email: String,
        street: String,
        city: String,
        zipcode: String,
        phone: String,
    },
    cartItems: [
        {
            itemName: String,
            quantity: Number,
            itemPrice: Number,
        },
    ],
    subtotal: Number,
    tax: Number,
    deliveryFee: Number,
    total: Number,
    paymentMethod: {
        type: String,
        enum: ['creditCard', 'paypal', 'cod'],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Order', orderSchema);
