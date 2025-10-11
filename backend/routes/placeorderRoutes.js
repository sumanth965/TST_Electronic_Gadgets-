const express = require('express');
const router = express.Router();
const sendEmail = require('../mailer'); // Import your mailer
const Order = require('../Model/placeorder'); // Replace with your actual Order model

const { placeOrder, getUserOrders,deleteOrder} = require('../Controllers/placeorderCtrl');


router.post('/', async (req, res) => {
    const { user, deliveryInfo, cartItems, subtotal, tax, deliveryFee, total, paymentMethod } = req.body;

    try {
        // Create a new order
        const newOrder = await Order.create({
            user,
            deliveryInfo,
            cartItems,
            subtotal,
            tax,
            deliveryFee,
            total,
            paymentMethod,
        });

        // Send email confirmation
        const emailSubject = 'Order Confirmation';
        const emailText = `Thank you for your order!\n\nYour order details:\n\n` +
            `Subtotal: ₹${subtotal}\n` +
            `Tax: ₹${tax}\n` +
            `Delivery Fee: ₹${deliveryFee}\n` +
            `Total: ₹${total}\n\n` +
            `Delivery Address:\n${deliveryInfo.street}, ${deliveryInfo.city}, ${deliveryInfo.zipcode}\n` +
            `We will notify you once your order is shipped.\n\n` +
            `Thank you for shopping with us!`;

        await sendEmail(deliveryInfo.email, emailSubject, emailText); // Send the email

        res.status(201).json({ message: 'Order placed successfully!', order: newOrder });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ message: 'Failed to place order. Please try again.' });
    }
});

router.get('/:userId/orders', getUserOrders); // Ensure this route is set up
router.delete('/:orderId', deleteOrder);
  


module.exports = router;
