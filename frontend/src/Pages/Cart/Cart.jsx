import React from 'react';
import Nav from '../../Components/Nav/Nav'
import CartItem from '../../Components/CartItem/CartItem'

export default function Cart() {
  const styles = {
    pageContainer: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative',
      overflow: 'hidden',
    },
    backgroundPattern: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.1,
      backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
      backgroundSize: '30px 30px',
      pointerEvents: 'none',
    },
    cartpage: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '40px 20px',
      position: 'relative',
      zIndex: 1,
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px',
      animation: 'fadeInDown 0.6s ease-out',
    },
    title: {
      fontSize: '3rem',
      fontWeight: '800',
      color: 'white',
      marginBottom: '10px',
      textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
      letterSpacing: '1px',
    },
    subtitle: {
      fontSize: '1.2rem',
      color: 'rgba(255, 255, 255, 0.9)',
      fontWeight: '400',
    },
    contentWrapper: {
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '24px',
      padding: '30px',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      animation: 'slideUp 0.6s ease-out',
    },
  };

  return (
    <>
      <style>
        {`
          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }

          .cartpage:empty::after {
            content: '🛒 Your cart is empty';
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 300px;
            font-size: 1.5rem;
            color: #666;
            font-weight: 600;
          }

          @media (max-width: 768px) {
            .cartpage {
              padding: 20px 15px !important;
            }
          }

          /* Scrollbar styling */
          ::-webkit-scrollbar {
            width: 12px;
          }

          ::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
          }

          ::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 10px;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
          }
        `}
      </style>

      <div style={styles.pageContainer}>
        <div style={styles.backgroundPattern}></div>
        
        <Nav />
        
        <div style={styles.cartpage}>
          <div style={styles.header}>
            <h1 style={styles.title}>Shopping Cart</h1>
            <p style={styles.subtitle}>Review your items and proceed to checkout</p>
          </div>

          <div style={styles.contentWrapper} className='cartpage'>
            <CartItem />
          </div>
        </div>
      </div>
    </>
  );
}