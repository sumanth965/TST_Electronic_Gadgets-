const Order = require('../Model/placeorder');

exports.placeOrder = async (req, res) => {
    try {
        const { user, deliveryInfo, cartItems, subtotal, tax, deliveryFee, total, paymentMethod } = req.body;

        // Validate input data here (optional, but recommended)

        // Create new order
        const order = new Order({
            user,
            deliveryInfo,
            cartItems,
            subtotal,
            tax,
            deliveryFee,
            total,
            paymentMethod,
        });

        // Save order to the database
        await order.save();

        return res.status(201).json({
            message: 'Order placed successfully!',
            order,
        });
    } catch (error) {
        console.error('Error placing order:', error);
        return res.status(500).json({ message: 'Failed to place order.' });
    }
};


// In your order controller
exports.getUserOrders = async (req, res) => {
    try {
        const userId = req.params.userId; // Assuming you pass userId in the route
        const orders = await Order.find({ user: userId }); // Find orders by user ID

        if (!orders) {
            return res.status(404).json({ message: 'No orders found for this user.' });
        }

        res.status(200).json({ orders });
    } catch (error) {
        console.error('Error fetching user orders:', error);
        res.status(500).json({ message: 'Failed to fetch orders.' });
    }
};
exports.deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const deletedOrder = await Order.findByIdAndDelete(orderId);

        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found.' });
        }

        res.status(200).json({ message: 'Order deleted successfully.' });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ message: 'Failed to delete order.' });
    }
};
