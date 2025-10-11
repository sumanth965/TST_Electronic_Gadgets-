import React from 'react';
import Nav from '../../Components/Nav/Nav';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../Context/CartContext';

function ProductInfo() {
    const { state } = useLocation();
    const product = state?.product;
    const { addToCart } = useCart();
    const navigate = useNavigate();

    if (!product) {
        return <p>Product not found.</p>;
    }

    const handleAddToCart = () => {
        addToCart(product);
        navigate('/cart');
    };
    const strikeThroughPrice = (product.itemPrice * 1.1).toFixed(2);

    const handleBuyNow = () => {
        addToCart(product);
        navigate('/checkout');
    };

    const styles = {
        container: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '2rem 0',
        },
        productInfo: {
            maxWidth: '1200px',
            margin: '2rem auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
            gap: '3rem',
            padding: '2rem',
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '24px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(10px)',
            animation: 'slideUp 0.6s ease-out',
        },
        imageContainer: {
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '16px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
            transition: 'transform 0.3s ease',
        },
        productImage: {
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 0.5s ease',
        },
        productDetail: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            padding: '1rem',
        },
        title: {
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#1a202c',
            marginBottom: '0.5rem',
            lineHeight: '1.2',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
        },
        priceContainer: {
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
        },
        price: {
            fontSize: '2rem',
            fontWeight: '700',
            color: '#2d3748',
        },
        strikePrice: {
            fontSize: '1.5rem',
            color: '#a0aec0',
            textDecoration: 'line-through',
        },
        discount: {
            display: 'inline-block',
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            color: 'white',
            padding: '0.5rem 1.5rem',
            borderRadius: '50px',
            fontSize: '1rem',
            fontWeight: '600',
            boxShadow: '0 4px 15px rgba(245, 87, 108, 0.4)',
            animation: 'pulse 2s ease-in-out infinite',
        },
        rating: {
            fontSize: '1.8rem',
            letterSpacing: '0.2rem',
            padding: '0.5rem 0',
        },
        description: {
            fontSize: '1.1rem',
            color: '#4a5568',
            lineHeight: '1.6',
            marginBottom: '1rem',
        },
        stock: {
            fontSize: '1rem',
            color: '#e53e3e',
            fontWeight: '600',
            padding: '0.5rem 1rem',
            background: 'rgba(245, 101, 101, 0.1)',
            borderRadius: '8px',
            display: 'inline-block',
        },
        buttonContainer: {
            display: 'flex',
            gap: '1rem',
            marginTop: '1rem',
            flexWrap: 'wrap',
        },
        cartBtn: {
            flex: '1',
            minWidth: '200px',
            padding: '1rem 2rem',
            fontSize: '1.1rem',
            fontWeight: '600',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            background: 'linear-gradient(135deg, #ffd89b 0%, #19547b 100%)',
            color: 'white',
            boxShadow: '0 4px 15px rgba(255, 193, 7, 0.4)',
            textTransform: 'uppercase',
            letterSpacing: '1px',
        },
        buyBtn: {
            flex: '1',
            minWidth: '200px',
            padding: '1rem 2rem',
            fontSize: '1.1rem',
            fontWeight: '600',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
            textTransform: 'uppercase',
            letterSpacing: '1px',
        },
    };

    return (
        <div style={styles.container}>
            <style>
                {`
                    @keyframes slideUp {
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
                        0%, 100% {
                            transform: scale(1);
                        }
                        50% {
                            transform: scale(1.05);
                        }
                    }

                    #product-info:hover #product-image {
                        transform: scale(1.05);
                    }

                    #cart-btn-info:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 6px 20px rgba(255, 193, 7, 0.6);
                    }

                    #buy-now-info:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
                    }

                    #cart-btn-info:active, #buy-now-info:active {
                        transform: translateY(0);
                    }

                    @media (max-width: 768px) {
                        #product-info {
                            grid-template-columns: 1fr !important;
                            gap: 2rem !important;
                            padding: 1.5rem !important;
                        }
                    }
                `}
            </style>
            <Nav />
            <div id='product-info' style={styles.productInfo}>
                <div style={styles.imageContainer}>
                    <img 
                        src={`/images/${product.itemImage}`} 
                        alt={product.itemName} 
                        id='product-image' 
                        style={styles.productImage}
                    />
                </div>

                <div id='product-detail' style={styles.productDetail}>
                    <h1 style={styles.title}>{product.itemName}</h1>
                    <div style={styles.priceContainer}>
                        <h2 style={styles.price}>
                            ₹{product.itemPrice}
                        </h2>
                        <strike style={styles.strikePrice}>₹{strikeThroughPrice}</strike>
                        <h5 style={styles.discount}>10% off</h5>
                    </div>

                    <div id='rating' className="d-flex align-items-center mb-2" style={styles.rating}>
                        <span className="text-warning rating-stars">
                            {'★'.repeat(product.itemQuality) + '☆'.repeat(5 - product.itemQuality)}
                        </span>
                    </div>

                    <h3 style={styles.description}>{product.itemDescription}</h3>
                    <h5 style={styles.stock}>Only {product.stock} stocks available</h5>
                    <p style={styles.description}>{product.description}</p>

                    <div style={styles.buttonContainer}>
                        <input
                            id='cart-btn-info'
                            type="submit"
                            className="btn"
                            value="Add to Cart"
                            onClick={handleAddToCart}
                            style={styles.cartBtn}
                        />
                        <input
                            id='buy-now-info'
                            type="submit"
                            className="btn"
                            value="Buy Now"
                            onClick={handleBuyNow}
                            style={styles.buyBtn}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductInfo;