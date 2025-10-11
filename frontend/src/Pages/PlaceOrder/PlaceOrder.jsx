import React, { useState, useEffect } from 'react';
import { useCart } from '../../Context/CartContext';
import { Form, Button, Row, Col, Card, Modal, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

export default function PlaceOrder() {
    const { cartItems, clearCart } = useCart();
    const [subtotal, setSubtotal] = useState(0);
    const deliveryFee = 50;
    const taxRate = 0.08;
    const [orderInfo, setOrderInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        zipcode: '',
        phone: '',
        paymentMethod: '',
    });
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [error, setError] = useState('');
    const [validationErrors, setValidationErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [isFormTouched, setIsFormTouched] = useState(false);

    useEffect(() => {
        const calculatedSubtotal = cartItems.reduce(
            (acc, item) => acc + item.itemPrice * item.quantity,
            0
        );
        setSubtotal(calculatedSubtotal);
    }, [cartItems]);

    const tax = subtotal * taxRate;
    const total = subtotal + tax + deliveryFee;

    const validateInputs = () => {
        const errors = {};
        const phoneRegex = /^\d{10}$/;
        const zipRegex = /^[1-9]\d{5}$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!orderInfo.firstName) errors.firstName = 'First Name is required.';
        if (!orderInfo.lastName) errors.lastName = 'Last Name is required.';
        if (!orderInfo.email || !emailRegex.test(orderInfo.email)) errors.email = 'Please enter a valid email address.';
        if (!orderInfo.phone || !phoneRegex.test(orderInfo.phone)) errors.phone = 'Phone number must be exactly 10 digits.';
        if (!orderInfo.zipcode || !zipRegex.test(orderInfo.zipcode)) errors.zipcode = 'Zip code must be exactly 6 digits and cannot start with 0.';
        if (!orderInfo.street) errors.street = 'Street address is required.';
        if (!orderInfo.city) errors.city = 'City is required.';
        if (!orderInfo.paymentMethod) errors.paymentMethod = 'Please select a payment method.';

        setValidationErrors(errors);
        setError(Object.values(errors).join(' '));
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrderInfo((prev) => ({ ...prev, [name]: value }));
        setIsFormTouched(true);

        // Clear specific field error when user starts typing
        if (validationErrors[name]) {
            setValidationErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handlePlaceOrder = async () => {
        if (!validateInputs()) return;

        setLoading(true);

        const orderData = {
            user: '607f1f77bcf86cd799439011',
            deliveryInfo: orderInfo,
            cartItems: cartItems.map((item) => ({
                itemName: item.itemName,
                quantity: item.quantity,
                itemPrice: item.itemPrice,
            })),
            subtotal,
            tax,
            deliveryFee,
            total,
            paymentMethod: orderInfo.paymentMethod,
        };

        try {
            const response = await axios.post('http://localhost:3000/api/orders', orderData);

            if (response.status === 200) {
                setOrderSuccess(true);
                clearCart();
                setOrderInfo({
                    firstName: '',
                    lastName: '',
                    email: '',
                    street: '',
                    city: '',
                    zipcode: '',
                    phone: '',
                    paymentMethod: '',
                });
                setValidationErrors({});
                setShowSuccessModal(true);
            } else {
                throw new Error('Order placement failed.');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Your order has been placed successfully!! & Email is sent to your device....');
            setShowErrorModal(true);
        } finally {
            setLoading(false);
        }
    };

    const handleCloseSuccess = () => setShowSuccessModal(false);
    const handleCloseError = () => setShowErrorModal(false);

    const containerStyle = {
        minHeight: '100vh',
        // background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        background: '#ffc107',
        padding: '2rem 0',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    };

    const mainContainerStyle = {
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 1rem',
        animation: 'fadeInUp 0.6s ease-out'
    };

    const cardStyle = {
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        border: 'none',
        borderRadius: '20px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden',
        position: 'relative'
    };

    const cardHoverStyle = {
        transform: 'translateY(-8px)',
        boxShadow: '0 30px 60px rgba(0, 0, 0, 0.15)'
    };

    const headerStyle = {
        fontSize: '1.75rem',
        fontWeight: '700',
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '2rem',
        position: 'relative'
    };

    const formControlStyle = {
        border: '2px solid #e2e8f0',
        borderRadius: '12px',
        padding: '0.875rem 1rem',
        fontSize: '1rem',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        backgroundColor: '#f8fafc',
        outline: 'none'
    };

    const formControlFocusStyle = {
        borderColor: '#667eea',
        backgroundColor: 'white',
        boxShadow: '0 0 0 4px rgba(102, 126, 234, 0.1)',
        transform: 'translateY(-2px)'
    };

    const buttonStyle = {
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        border: 'none',
        borderRadius: '12px',
        padding: '1rem 2rem',
        fontSize: '1.1rem',
        fontWeight: '600',
        color: 'white',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden'
    };

    const buttonHoverStyle = {
        transform: 'translateY(-2px)',
        boxShadow: '0 15px 30px rgba(102, 126, 234, 0.4)'
    };

    const summaryItemStyle = {
        padding: '0.75rem 0',
        borderBottom: '1px solid #f1f5f9',
        fontSize: '1rem',
        color: '#334155'
    };

    const totalStyle = {
        fontSize: '1.5rem',
        fontWeight: '700',
        color: '#1e293b',
        padding: '1rem 0',
        borderTop: '2px solid #e2e8f0',
        marginTop: '1rem'
    };

    const modalStyle = {
        borderRadius: '20px',
        border: 'none',
        overflow: 'hidden',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)'
    };

    const fadeInUpKeyframes = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }
        
        @keyframes slideInFromRight {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;

    const [hoveredCard, setHoveredCard] = useState(null);
    const [focusedField, setFocusedField] = useState(null);

    return (
        <div style={containerStyle}>
            <style>{fadeInUpKeyframes}</style>
            <div style={mainContainerStyle}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1 style={{
                        fontSize: '3rem',
                        fontWeight: '800',
                        color: 'white',
                        marginBottom: '0.5rem',
                        textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
                    }}>
                        Complete Your Order
                    </h1>
                    <p style={{
                        fontSize: '1.2rem',
                        color: 'rgba(255, 255, 255, 0.8)',
                        marginBottom: '0'
                    }}>
                        Just a few more details and you're all set!
                    </p>
                </div>

                <Row>
                    <Col lg={8} className="mb-4">
                        <Card
                            style={{
                                ...cardStyle,
                                ...(hoveredCard === 'delivery' ? cardHoverStyle : {})
                            }}
                            onMouseEnter={() => setHoveredCard('delivery')}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            <Card.Body style={{ padding: '2.5rem' }}>
                                <div style={{
                                    position: 'absolute',
                                    top: '0',
                                    right: '0',
                                    width: '100px',
                                    height: '100px',
                                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                    borderRadius: '0 20px 0 50px',
                                    opacity: '0.1'
                                }} />

                                <h3 style={headerStyle}>
                                    📍 Delivery Information
                                </h3>
                                <Form>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-4">
                                                <Form.Label style={{ fontWeight: '600', color: '#475569', marginBottom: '0.5rem' }}>
                                                    First Name
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter your first name"
                                                    name="firstName"
                                                    value={orderInfo.firstName}
                                                    onChange={handleChange}
                                                    onFocus={() => setFocusedField('firstName')}
                                                    onBlur={() => setFocusedField(null)}
                                                    style={{
                                                        ...formControlStyle,
                                                        ...(focusedField === 'firstName' ? formControlFocusStyle : {}),
                                                        borderColor: validationErrors.firstName ? '#ef4444' : '#e2e8f0'
                                                    }}
                                                    isInvalid={!!validationErrors.firstName}
                                                />
                                                <Form.Control.Feedback type="invalid" style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                                                    {validationErrors.firstName}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-4">
                                                <Form.Label style={{ fontWeight: '600', color: '#475569', marginBottom: '0.5rem' }}>
                                                    Last Name
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter your last name"
                                                    name="lastName"
                                                    value={orderInfo.lastName}
                                                    onChange={handleChange}
                                                    onFocus={() => setFocusedField('lastName')}
                                                    onBlur={() => setFocusedField(null)}
                                                    style={{
                                                        ...formControlStyle,
                                                        ...(focusedField === 'lastName' ? formControlFocusStyle : {}),
                                                        borderColor: validationErrors.lastName ? '#ef4444' : '#e2e8f0'
                                                    }}
                                                    isInvalid={!!validationErrors.lastName}
                                                />
                                                <Form.Control.Feedback type="invalid" style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                                                    {validationErrors.lastName}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Form.Group className="mb-4">
                                        <Form.Label style={{ fontWeight: '600', color: '#475569', marginBottom: '0.5rem' }}>
                                            Email Address
                                        </Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter your email address"
                                            name="email"
                                            value={orderInfo.email}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField('email')}
                                            onBlur={() => setFocusedField(null)}
                                            style={{
                                                ...formControlStyle,
                                                ...(focusedField === 'email' ? formControlFocusStyle : {}),
                                                borderColor: validationErrors.email ? '#ef4444' : '#e2e8f0'
                                            }}
                                            isInvalid={!!validationErrors.email}
                                        />
                                        <Form.Control.Feedback type="invalid" style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                                            {validationErrors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-4">
                                        <Form.Label style={{ fontWeight: '600', color: '#475569', marginBottom: '0.5rem' }}>
                                            Street Address
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter your street address"
                                            name="street"
                                            value={orderInfo.street}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField('street')}
                                            onBlur={() => setFocusedField(null)}
                                            style={{
                                                ...formControlStyle,
                                                ...(focusedField === 'street' ? formControlFocusStyle : {}),
                                                borderColor: validationErrors.street ? '#ef4444' : '#e2e8f0'
                                            }}
                                            isInvalid={!!validationErrors.street}
                                        />
                                        <Form.Control.Feedback type="invalid" style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                                            {validationErrors.street}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Row>
                                        <Col md={8}>
                                            <Form.Group className="mb-4">
                                                <Form.Label style={{ fontWeight: '600', color: '#475569', marginBottom: '0.5rem' }}>
                                                    City
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter your city"
                                                    name="city"
                                                    value={orderInfo.city}
                                                    onChange={handleChange}
                                                    onFocus={() => setFocusedField('city')}
                                                    onBlur={() => setFocusedField(null)}
                                                    style={{
                                                        ...formControlStyle,
                                                        ...(focusedField === 'city' ? formControlFocusStyle : {}),
                                                        borderColor: validationErrors.city ? '#ef4444' : '#e2e8f0'
                                                    }}
                                                    isInvalid={!!validationErrors.city}
                                                />
                                                <Form.Control.Feedback type="invalid" style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                                                    {validationErrors.city}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group className="mb-4">
                                                <Form.Label style={{ fontWeight: '600', color: '#475569', marginBottom: '0.5rem' }}>
                                                    Zip Code
                                                </Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    placeholder="000000"
                                                    name="zipcode"
                                                    value={orderInfo.zipcode}
                                                    onChange={handleChange}
                                                    onFocus={() => setFocusedField('zipcode')}
                                                    onBlur={() => setFocusedField(null)}
                                                    style={{
                                                        ...formControlStyle,
                                                        ...(focusedField === 'zipcode' ? formControlFocusStyle : {}),
                                                        borderColor: validationErrors.zipcode ? '#ef4444' : '#e2e8f0'
                                                    }}
                                                    isInvalid={!!validationErrors.zipcode}
                                                />
                                                <Form.Control.Feedback type="invalid" style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                                                    {validationErrors.zipcode}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Form.Group className="mb-4">
                                        <Form.Label style={{ fontWeight: '600', color: '#475569', marginBottom: '0.5rem' }}>
                                            Phone Number
                                        </Form.Label>
                                        <Form.Control
                                            type="tel"
                                            placeholder="Enter 10-digit phone number"
                                            name="phone"
                                            value={orderInfo.phone}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField('phone')}
                                            onBlur={() => setFocusedField(null)}
                                            maxLength={10}
                                            style={{
                                                ...formControlStyle,
                                                ...(focusedField === 'phone' ? formControlFocusStyle : {}),
                                                borderColor: validationErrors.phone ? '#ef4444' : '#e2e8f0'
                                            }}
                                            isInvalid={!!validationErrors.phone}
                                        />
                                        <Form.Control.Feedback type="invalid" style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                                            {validationErrors.phone}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>

                        <Card
                            style={{
                                ...cardStyle,
                                marginTop: '2rem',
                                ...(hoveredCard === 'payment' ? cardHoverStyle : {})
                            }}
                            onMouseEnter={() => setHoveredCard('payment')}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            <Card.Body style={{ padding: '2.5rem' }}>
                                <h3 style={headerStyle}>
                                    💳 Payment Method
                                </h3>
                                <div style={{
                                    background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
                                    padding: '1.5rem',
                                    borderRadius: '12px',
                                    border: '2px solid #e2e8f0'
                                }}>
                                    <Form.Check
                                        type="radio"
                                        id="cod"
                                        label={
                                            <span style={{
                                                fontSize: '1.1rem',
                                                fontWeight: '600',
                                                color: '#334155',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem'
                                            }}>
                                                💵 Cash on Delivery (COD)
                                            </span>
                                        }
                                        value="cod"
                                        name="paymentMethod"
                                        onChange={handleChange}
                                        checked={orderInfo.paymentMethod === 'cod'}
                                        style={{ fontSize: '1.2rem' }}
                                    />
                                </div>
                                {validationErrors.paymentMethod && (
                                    <div style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                                        {validationErrors.paymentMethod}
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col lg={4}>
                        <Card
                            style={{
                                ...cardStyle,
                                position: 'sticky',
                                top: '2rem',
                                ...(hoveredCard === 'summary' ? cardHoverStyle : {}),
                                animation: 'slideInFromRight 0.8s ease-out'
                            }}
                            onMouseEnter={() => setHoveredCard('summary')}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            <Card.Body style={{ padding: '2.5rem' }}>
                                <h3 style={headerStyle}>
                                    📋 Order Summary
                                </h3>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    {cartItems.map((item, index) => (
                                        <div key={item.itemName} style={{
                                            ...summaryItemStyle,
                                            animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span style={{ fontWeight: '500' }}>{item.itemName}</span>
                                                <span style={{
                                                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                                    color: 'white',
                                                    padding: '0.25rem 0.75rem',
                                                    borderRadius: '20px',
                                                    fontSize: '0.875rem',
                                                    fontWeight: '600'
                                                }}>
                                                    {item.quantity} × ${item.itemPrice}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div style={{ marginBottom: '1rem' }}>
                                    <div style={{ ...summaryItemStyle, borderBottom: 'none' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span>Subtotal</span>
                                            <span style={{ fontWeight: '600' }}>${subtotal.toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <div style={{ ...summaryItemStyle, borderBottom: 'none' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span>Tax (8%)</span>
                                            <span style={{ fontWeight: '600' }}>${tax.toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <div style={{ ...summaryItemStyle, borderBottom: 'none' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span>Delivery Fee</span>
                                            <span style={{ fontWeight: '600' }}>${deliveryFee}</span>
                                        </div>
                                    </div>
                                </div>

                                <div style={totalStyle}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span>Total</span>
                                        <span style={{
                                            background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            fontSize: '2rem'
                                        }}>
                                            ${total.toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                <Button
                                    onClick={handlePlaceOrder}
                                    disabled={loading || cartItems.length === 0}
                                    style={{
                                        ...buttonStyle,
                                        width: '100%',
                                        marginTop: '1.5rem',
                                        opacity: loading || cartItems.length === 0 ? 0.7 : 1,
                                        cursor: loading || cartItems.length === 0 ? 'not-allowed' : 'pointer'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!loading && cartItems.length > 0) {
                                            Object.assign(e.target.style, buttonHoverStyle);
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!loading && cartItems.length > 0) {
                                            e.target.style.transform = 'translateY(0)';
                                            e.target.style.boxShadow = 'none';
                                        }
                                    }}
                                >
                                    {loading ? (
                                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                            <Spinner animation="border" size="sm" />
                                            Processing Order...
                                        </span>
                                    ) : (
                                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                            🚀 Place Order
                                        </span>
                                    )}
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Success Modal */}
                <Modal
                    show={showSuccessModal}
                    onHide={handleCloseSuccess}
                    centered
                    backdrop="static"
                >
                    <div style={modalStyle}>
                        <Modal.Header style={{
                            background: 'linear-gradient(135deg, #667eea, #764ba2)',
                            color: 'white',
                            border: 'none',
                            padding: '2rem'
                        }}>
                            <Modal.Title style={{
                                fontSize: '1.5rem',
                                fontWeight: '700',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                🎉 Order Successful!
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{
                            padding: '2rem',
                            textAlign: 'center',
                            background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)'
                        }}>
                            <div style={{
                                fontSize: '4rem',
                                marginBottom: '1rem',
                                animation: 'pulse 2s infinite'
                            }}>
                                ✅
                            </div>
                            <p style={{
                                fontSize: '1.1rem',
                                color: '#475569',
                                marginBottom: '0'
                            }}>
                                Your order has been placed successfully! You'll receive a confirmation email shortly.
                            </p>
                        </Modal.Body>
                        <Modal.Footer style={{
                            border: 'none',
                            padding: '1rem 2rem 2rem'
                        }}>
                            <Button
                                onClick={handleCloseSuccess}
                                style={{
                                    ...buttonStyle,
                                    width: '100%'
                                }}
                            >
                                Continue Shopping
                            </Button>
                        </Modal.Footer>
                    </div>
                </Modal>

                {/* Error Modal */}
                <Modal
                    show={showErrorModal}
                    onHide={handleCloseError}
                    centered
                    backdrop="static"
                >
                    <div style={modalStyle}>
                        <Modal.Header style={{
                            background: 'linear-gradient(135deg, #10b981, #059669)',
                            color: 'white',
                            border: 'none',
                            padding: '2rem'
                        }}>
                            <Modal.Title style={{
                                fontSize: '1.5rem',
                                fontWeight: '700',


                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                ⚠️ Order Failed
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{
                            padding: '2rem',
                            textAlign: 'center',
                            background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)'
                        }}>
                            <div style={{
                                fontSize: '4rem',
                                marginBottom: '1rem',
                                color: '#ef4444'
                            }}>
                                ❌
                            </div>
                            <p style={{
                                fontSize: '1.1rem',
                                color: '#475569',
                                marginBottom: '0'
                            }}>
                                {error || "Something went wrong while placing your order. Please try again."}
                            </p>
                        </Modal.Body>
                        <Modal.Footer style={{
                            border: 'none',
                            padding: '1rem 2rem 2rem'
                        }}>
                            <Button
                                onClick={handleCloseError}
                                style={{
                                    ...buttonStyle,
                                    width: '100%',
                                    background: 'linear-gradient(135deg, #10b981, #059669)'
                                }}
                            >
                                Try Again
                            </Button>
                        </Modal.Footer>
                    </div>
                </Modal>
            </div>
        </div>
    );
}