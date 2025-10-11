import React, { useState, useEffect } from 'react';
import { useCart } from '../../Context/CartContext';
import { Link } from 'react-router-dom';
import { Card, Button, Row, Col, Modal, Toast } from 'react-bootstrap';

const Cart = () => {
    const { cartItems, updateQuantity, removeFromCart } = useCart();
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [itemToRemove, setItemToRemove] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [animatingItems, setAnimatingItems] = useState(new Set());

    const subtotal = cartItems.reduce((acc, item) => acc + (item.itemPrice * (item.quantity || 1)), 0);
    const tax = subtotal * 0.08; // Fixed the typo from 'taax' to 'tax'
    const total = subtotal + tax;
    const itemCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

    const renderStars = (quality) => {
        const fullStar = '★';
        const emptyStar = '☆';
        return (
            <span className="stars">
                {fullStar.repeat(quality) + emptyStar.repeat(5 - quality)}
            </span>
        );
    };

    const showNotification = (message) => {
        setToastMessage(message);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const handleQuantityChange = (item, newQuantity) => {
        if (newQuantity < 1) {
            setItemToRemove(item);
            setShowRemoveModal(true);
        } else {
            setAnimatingItems(prev => new Set(prev).add(item._id));
            updateQuantity(item._id, newQuantity);
            setTimeout(() => {
                setAnimatingItems(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(item._id);
                    return newSet;
                });
            }, 300);
        }
    };

    const confirmRemoval = () => {
        if (itemToRemove) {
            removeFromCart(itemToRemove._id);
            showNotification(`${itemToRemove.itemName} removed from cart`);
        }
        setShowRemoveModal(false);
        setItemToRemove(null);
    };

    const incrementQuantity = (item) => {
        if ((item.quantity || 1) < 50) {
            handleQuantityChange(item, (item.quantity || 1) + 1);
        }
    };

    const decrementQuantity = (item) => {
        handleQuantityChange(item, (item.quantity || 1) - 1);
    };

    const handleDirectRemove = (item) => {
        setItemToRemove(item);
        setShowRemoveModal(true);
    };

    return (
        <>
            <style>{`
                .cart-page {
                    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                    min-height: 100vh;
                    padding: 2rem 0;
                }

                .cart-title {
                    color: #2c3e50;
                    font-weight: 700;
                    font-size: 2.5rem;
                    text-align: center;
                    margin-bottom: 2rem;
                    text-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }

                @media (max-width: 768px) {
                    .cart-title {
                        font-size: 2rem;
                    }
                }

                .cart-item-card {
                    border: none;
                    border-radius: 15px;
                    overflow: hidden;
                    transition: all 0.3s ease;
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(10px);
                    margin-bottom: 1.5rem;
                }

                .cart-item-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 35px rgba(0,0,0,0.1);
                }

                .cart-item-card.animating {
                    animation: pulse 0.3s ease-in-out;
                }

                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.02); }
                    100% { transform: scale(1); }
                }

                .cart-item-image img {
                    width: 100%;
                    height: 120px;
                    object-fit: cover;
                    border-radius: 10px;
                    transition: transform 0.3s ease;
                }

                .cart-item-image img:hover {
                    transform: scale(1.05);
                }

                @media (max-width: 768px) {
                    .cart-item-image img {
                        height: 100px;
                        margin-bottom: 1rem;
                    }
                }

                .cart-item-details {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    padding: 0 1rem;
                }

                .item-name {
                    color: #2c3e50;
                    font-weight: 600;
                    font-size: 1.3rem;
                    margin-bottom: 0.5rem;
                    line-height: 1.3;
                }

                @media (max-width: 768px) {
                    .item-name {
                        font-size: 1.1rem;
                        text-align: center;
                    }
                }

                .item-price {
                    color: #e74c3c;
                    font-size: 1.4rem;
                    font-weight: 700;
                    margin-bottom: 0.5rem;
                }

                @media (max-width: 768px) {
                    .item-price {
                        font-size: 1.2rem;
                        text-align: center;
                    }
                }

                .item-quality {
                    color: #7f8c8d;
                    font-size: 0.9rem;
                }

                @media (max-width: 768px) {
                    .item-quality {
                        text-align: center;
                    }
                }

                .stars {
                    color: #f39c12;
                    font-size: 1rem;
                    margin-left: 0.5rem;
                }

                .cart-item-actions {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    gap: 1rem;
                }

                .quantity-controls {
                    background: #ecf0f1;
                    border-radius: 25px;
                    padding: 0.3rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
                }

                .quantity-controls button {
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    border: none;
                    background: #3498db;
                    color: white;
                    font-weight: bold;
                    font-size: 1.1rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s ease;
                }

                .quantity-controls button:hover {
                    background: #2980b9;
                    transform: scale(1.1);
                }

                .quantity-controls button:active {
                    transform: scale(0.95);
                }

                .quantity-input {
                    width: 60px;
                    height: 35px;
                    text-align: center;
                    border: 2px solid #bdc3c7;
                    border-radius: 8px;
                    font-weight: 600;
                    font-size: 1rem;
                }

                .quantity-input:focus {
                    border-color: #3498db;
                    box-shadow: 0 0 0 0.2rem rgba(52, 152, 219, 0.25);
                }

                .remove-btn {
                    background: #e74c3c;
                    border: none;
                    color: white;
                    padding: 0.4rem 1rem;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    transition: all 0.2s ease;
                }

                .remove-btn:hover {
                    background: #c0392b;
                    transform: translateY(-2px);
                }

                .cart-summary {
                    background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
                    border: none;
                    border-radius: 20px;
                    position: sticky;
                    top: 2rem;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                    backdrop-filter: blur(10px);
                }

                .cart-summary h4 {
                    color: #2c3e50;
                    font-weight: 700;
                    border-bottom: 2px solid #3498db;
                    padding-bottom: 0.5rem;
                }

                .summary-row {
                    display: flex;
                    justify-content: space-between;
                    padding: 0.5rem 0;
                    font-size: 1rem;
                }

                .summary-row.total {
                    font-size: 1.2rem;
                    font-weight: 700;
                    color: #2c3e50;
                    border-top: 2px solid #ecf0f1;
                    padding-top: 1rem;
                    margin-top: 1rem;
                }

                .checkout-btn {
                    background: linear-gradient(45deg, #f39c12, #e67e22);
                    border: none;
                    border-radius: 25px;
                    padding: 0.8rem 2rem;
                    font-weight: 600;
                    font-size: 1.1rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(243, 156, 18, 0.3);
                }

                .checkout-btn:hover {
                    background: linear-gradient(45deg, #e67e22, #d35400);
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(243, 156, 18, 0.4);
                }

                .empty-cart-container {
                    text-align: center;
                    padding: 4rem 2rem;
                    background: rgba(255, 255, 255, 0.9);
                    border-radius: 20px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                }

                .empty-cart-icon {
                    font-size: 5rem;
                    color: #bdc3c7;
                    margin-bottom: 1rem;
                }

                .empty-cart-message {
                    font-size: 1.5rem;
                    color: #7f8c8d;
                    margin-bottom: 1.5rem;
                }

                .shop-now-btn {
                    background: linear-gradient(45deg, #3498db, #2980b9);
                    border: none;
                    border-radius: 25px;
                    padding: 0.8rem 2rem;
                    font-weight: 600;
                    color: white;
                    text-decoration: none;
                    display: inline-block;
                    transition: all 0.3s ease;
                }

                .shop-now-btn:hover {
                    background: linear-gradient(45deg, #2980b9, #1f618d);
                    transform: translateY(-2px);
                    color: white;
                    text-decoration: none;
                }

                .item-count {
                    background: #3498db;
                    color: white;
                    border-radius: 50%;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.8rem;
                    font-weight: 600;
                    margin-left: 1rem;
                }

                .toast-container {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 9999;
                }

                .custom-toast {
                    background: linear-gradient(45deg, #27ae60, #2ecc71);
                    color: white;
                    border: none;
                    border-radius: 10px;
                    box-shadow: 0 4px 15px rgba(39, 174, 96, 0.3);
                }

                .modal-content {
                    border-radius: 15px;
                    border: none;
                }

                .modal-header {
                    background: linear-gradient(45deg, #e74c3c, #c0392b);
                    color: white;
                    border-radius: 15px 15px 0 0;
                }

                .modal-footer button {
                    border-radius: 20px;
                    padding: 0.5rem 1.5rem;
                    font-weight: 600;
                }

                @media (max-width: 768px) {
                    .cart-page {
                        padding: 1rem;
                    }
                    
                    .cart-item-details,
                    .cart-item-actions {
                        text-align: center;
                        margin: 1rem 0;
                    }
                    
                    .quantity-controls {
                        justify-content: center;
                        margin: 1rem 0;
                    }
                    
                    .cart-summary {
                        margin-top: 2rem;
                        position: relative;
                        top: auto;
                    }
                }

                @media (max-width: 576px) {
                    .cart-title {
                        font-size: 1.8rem;
                    }
                    
                    .item-name {
                        font-size: 1rem;
                    }
                    
                    .item-price {
                        font-size: 1.1rem;
                    }
                    
                    .summary-row {
                        font-size: 0.9rem;
                    }
                }
            `}</style>

            <div className="cart-page container-fluid">
                <Row className="justify-content-center">
                    <Col lg={10}>
                        <h2 className="cart-title">
                            Your Cart
                            {itemCount > 0 && <span className="item-count">{itemCount}</span>}
                        </h2>
                        
                        <Row>
                            <Col lg={8}>
                                {cartItems.length === 0 ? (
                                    <div className="empty-cart-container">
                                        <div className="empty-cart-icon">🛒</div>
                                        <p className="empty-cart-message">Your cart is empty</p>
                                        <Link to="/shop" className="shop-now-btn">
                                            Start Shopping
                                        </Link>
                                    </div>
                                ) : (
                                    cartItems.map(item => (
                                        <Card 
                                            className={`cart-item-card ${animatingItems.has(item._id) ? 'animating' : ''}`} 
                                            key={item._id}
                                        >
                                            <Card.Body className="p-4">
                                                <Row className="align-items-center">
                                                    <Col md={3} sm={6} xs={12} className="cart-item-image">
                                                        <img 
                                                            src={`/images/${item.itemImage}`} 
                                                            alt={item.itemName}
                                                            onError={(e) => {
                                                                e.target.src = 'https://via.placeholder.com/150x120?text=Image';
                                                            }}
                                                        />
                                                    </Col>
                                                    <Col md={5} sm={6} xs={12} className="cart-item-details">
                                                        <h5 className="item-name">{item.itemName}</h5>
                                                        <p className="item-price">₹{item.itemPrice.toFixed(2)}</p>
                                                        {item.itemQuality && (
                                                            <div className="item-quality">
                                                                Quality: {renderStars(item.itemQuality)}
                                                            </div>
                                                        )}
                                                    </Col>
                                                    <Col md={4} xs={12} className="cart-item-actions">
                                                        <div className="quantity-controls">
                                                            <button onClick={() => decrementQuantity(item)}>
                                                                −
                                                            </button>
                                                            <input
                                                                type="number"
                                                                className="quantity-input"
                                                                value={item.quantity || 1}
                                                                min="1"
                                                                max="50"
                                                                onChange={(e) => {
                                                                    const value = Math.max(1, Math.min(50, parseInt(e.target.value) || 1));
                                                                    handleQuantityChange(item, value);
                                                                }}
                                                            />
                                                            <button onClick={() => incrementQuantity(item)}>
                                                                +
                                                            </button>
                                                        </div>
                                                        <button 
                                                            className="remove-btn"
                                                            onClick={() => handleDirectRemove(item)}
                                                        >
                                                            Remove
                                                        </button>
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                    ))
                                )}
                            </Col>

                            {cartItems.length > 0 && (
                                <Col lg={4}>
                                    <Card className="cart-summary p-4">
                                        <h4 className="mb-4">Order Summary</h4>
                                        <div className="summary-row">
                                            <span>Items ({itemCount}):</span>
                                            <span>₹{subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="summary-row">
                                            <span>Tax (8%):</span>
                                            <span>₹{tax.toFixed(2)}</span>
                                        </div>
                                        <div className="summary-row">
                                            <span>Shipping:</span>
                                            <span className="text-success">FREE</span>
                                        </div>
                                        <div className="summary-row total">
                                            <span>Total:</span>
                                            <span>₹{total.toFixed(2)}</span>
                                        </div>
                                        <Link to="/checkout" className="text-decoration-none">
                                            <button className="checkout-btn w-100 mt-4">
                                                Proceed to Checkout
                                            </button>
                                        </Link>
                                    </Card>
                                </Col>
                            )}
                        </Row>
                    </Col>
                </Row>
            </div>

            {/* Remove Confirmation Modal */}
            <Modal show={showRemoveModal} onHide={() => setShowRemoveModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Remove Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to remove "{itemToRemove?.itemName}" from your cart?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowRemoveModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmRemoval}>
                        Remove
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Toast Notification */}
            <div className="toast-container">
                <Toast show={showToast} className="custom-toast">
                    <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
            </div>
        </>
    );
};

export default Cart;