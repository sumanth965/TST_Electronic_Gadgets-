import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, Card, ListGroup, Form, InputGroup, Button } from 'react-bootstrap';
import './UserDetails.css';

export default function UserDetails() {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const userId = '607f1f77bcf86cd799439011'; // Replace with actual user ID

    useEffect(() => {
        fetchOrders();
    }, [userId]);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/orders/${userId}/orders`);
            setOrders(response.data.orders);
        } catch (err) {
            console.error('Error fetching orders:', err);
            setError('Failed to fetch orders. Please try again later.');
        }
    };

    const handleDeleteOrder = async (orderId) => {
        try {
            await axios.delete(`http://localhost:3000/api/orders/${orderId}`);
            setOrders(orders.filter(order => order._id !== orderId));
        } catch (err) {
            console.error('Error deleting order:', err);
            setError('Failed to delete order. Please try again later.');
        }
    };

    const filteredOrders = orders.filter(order =>
        `${order.deliveryInfo.firstName} ${order.deliveryInfo.lastName}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    return (
        <div className="user-details-container container py-5">
            {error && <Alert variant="danger">{error}</Alert>}

            {/* Search bar */}
            <InputGroup className="mb-4">
                <Form.Control
                    type="text"
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </InputGroup>

            {filteredOrders.length > 0 ? (
                filteredOrders.map((order, index) => (
                    <Card key={index} className="mb-3 shadow-sm">
                        <Card.Body>
                            <h5>Order ID: {order._id}</h5>
                            <h6>Delivery Info:</h6>
                            <p>{order.deliveryInfo.firstName} {order.deliveryInfo.lastName}</p>
                            <p>{order.deliveryInfo.street}, {order.deliveryInfo.city}, {order.deliveryInfo.zipcode}</p>
                            <h6>Order Summary:</h6>
                            <ListGroup>
                                {order.cartItems.map((item, itemIndex) => (
                                    <ListGroup.Item key={itemIndex}>
                                        {item.itemName} (x{item.quantity}) - ₹{(item.itemPrice * item.quantity).toFixed(2)}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                            <h6 className="mt-2">Subtotal: ₹{order.subtotal.toFixed(2)}</h6>
                            <h6>Tax: ₹{order.tax.toFixed(2)}</h6>
                            <h6>Delivery Fee: ₹{order.deliveryFee.toFixed(2)}</h6>
                            <h4 className="text-primary">Total: ₹{order.total.toFixed(2)}</h4>
                            <Button variant="danger" onClick={() => handleDeleteOrder(order._id)}>Delete Order</Button>
                        </Card.Body>
                    </Card>
                ))
            ) : (
                <p className="no-orders">No orders found.</p>
            )}
        </div>
    );
}
