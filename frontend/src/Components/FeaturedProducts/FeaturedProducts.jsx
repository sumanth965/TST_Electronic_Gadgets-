import React from "react";
import { Link } from "react-router-dom";
import product1 from "../../img/product-1.jpg";
import product2 from "../../img/product-2.jpg";
import product3 from "../../img/product-3.jpg";
import product4 from "../../img/product-4.jpg";

const products = [
  { id: 1, name: "Virtual Reality Glasses", img: product1, price: "299.00" },
  { id: 2, name: "Facial Recognition Home Hub", img: product2, price: "149.00" },
  { id: 3, name: "3D Printing Pen", img: product3, price: "45.00" },
  { id: 4, name: "Delivery Drone", img: product4, price: "199.00" },
];

const FeaturedProducts = () => {
  const styles = {
    mainContainer: {
      background: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)',
      padding: '60px 0',
    },
    sectionHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '40px',
      flexWrap: 'wrap',
      gap: '20px',
    },
    sectionTitle: {
      fontSize: '2.5rem',
      fontWeight: '800',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      margin: 0,
      animation: 'fadeInLeft 0.6s ease-out',
    },
    exploreLink: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      textDecoration: 'none',
      color: '#667eea',
      fontWeight: '600',
      fontSize: '1.1rem',
      transition: 'all 0.3s ease',
      padding: '10px 20px',
      borderRadius: '50px',
      background: 'rgba(102, 126, 234, 0.1)',
    },
    productsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '30px',
      marginTop: '30px',
    },
    productCard: {
      position: 'relative',
      background: 'white',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.4s ease',
      textDecoration: 'none',
      display: 'block',
      height: '100%',
    },
    productImageContainer: {
      position: 'relative',
      width: '100%',
      height: '300px',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)',
    },
    productImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.5s ease',
    },
    productOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%)',
      opacity: 0,
      transition: 'opacity 0.4s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '1.2rem',
      fontWeight: '600',
    },
    productBody: {
      padding: '25px',
      textAlign: 'center',
    },
    productName: {
      fontSize: '1.3rem',
      fontWeight: '700',
      color: '#2d3748',
      marginBottom: '10px',
      transition: 'color 0.3s ease',
    },
    productPrice: {
      fontSize: '1.5rem',
      fontWeight: '800',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      margin: 0,
    },
    badge: {
      position: 'absolute',
      top: '15px',
      right: '15px',
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      color: 'white',
      padding: '8px 16px',
      borderRadius: '50px',
      fontSize: '0.85rem',
      fontWeight: '600',
      zIndex: 2,
      boxShadow: '0 4px 15px rgba(245, 87, 108, 0.4)',
    },
    whyBuySection: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '80px 0',
      marginTop: '80px',
      position: 'relative',
      overflow: 'hidden',
    },
    whyBuyPattern: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.1,
      backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
      backgroundSize: '30px 30px',
      pointerEvents: 'none',
    },
    whyBuyTitle: {
      fontSize: '3rem',
      fontWeight: '900',
      color: 'white',
      textAlign: 'center',
      marginBottom: '60px',
      textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
      animation: 'fadeInDown 0.6s ease-out',
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '30px',
      position: 'relative',
      zIndex: 1,
    },
    featureCard: {
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '20px',
      padding: '40px 30px',
      textAlign: 'center',
      boxShadow: '0 15px 40px rgba(0, 0, 0, 0.2)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      transition: 'all 0.4s ease',
      height: '100%',
    },
    featureIcon: {
      width: '80px',
      height: '80px',
      margin: '0 auto 25px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '2.5rem',
      boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
      transition: 'all 0.4s ease',
    },
    featureTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#2d3748',
      marginBottom: '15px',
    },
    featureDescription: {
      fontSize: '1rem',
      color: '#4a5568',
      lineHeight: '1.8',
    },
  };

  return (
    <>
      <style>
        {`
          @keyframes fadeInLeft {
            from {
              opacity: 0;
              transform: translateX(-30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

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
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
          }

          .product-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 50px rgba(102, 126, 234, 0.3);
          }

          .product-card:hover .product-image {
            transform: scale(1.1);
          }

          .product-card:hover .product-overlay {
            opacity: 1;
          }

          .product-card:hover .product-name {
            color: #667eea;
          }

          .explore-link:hover {
            background: rgba(102, 126, 234, 0.2);
            transform: translateX(5px);
          }

          .explore-link:hover svg {
            transform: translateX(5px);
          }

          .feature-card:hover {
            transform: translateY(-15px);
            box-shadow: 0 25px 60px rgba(0, 0, 0, 0.3);
          }

          .feature-card:hover .feature-icon {
            transform: scale(1.15) rotate(360deg);
            box-shadow: 0 15px 40px rgba(102, 126, 234, 0.6);
          }

          .badge {
            animation: pulse 2s ease-in-out infinite;
          }

          /* Responsive Design */
          @media (max-width: 768px) {
            .section-title {
              font-size: 2rem !important;
            }

            .why-buy-title {
              font-size: 2rem !important;
            }

            .products-grid {
              grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)) !important;
              gap: 20px !important;
            }

            .features-grid {
              grid-template-columns: 1fr !important;
              gap: 20px !important;
            }

            .product-image-container {
              height: 250px !important;
            }

            .feature-card {
              padding: 30px 20px !important;
            }
          }

          @media (max-width: 480px) {
            .section-title {
              font-size: 1.5rem !important;
            }

            .why-buy-title {
              font-size: 1.8rem !important;
            }

            .product-name {
              font-size: 1.1rem !important;
            }

            .product-price {
              font-size: 1.3rem !important;
            }

            .explore-link {
              font-size: 1rem !important;
              padding: 8px 16px !important;
            }
          }
        `}
      </style>

      <div style={styles.mainContainer}>
        {/* Header Section */}
        <div className="container">
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle} className="section-title">
              Go to Categories
            </h2>
            <Link
              to="/devices"
              style={styles.exploreLink}
              className="explore-link"
            >
              <span>Explore All</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-arrow-right-circle"
                viewBox="0 0 16 16"
                style={{ transition: 'transform 0.3s ease' }}
              >
                <path
                  fillRule="evenodd"
                  d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
                />
              </svg>
            </Link>
          </div>

          {/* Products Grid */}
          <div style={styles.productsGrid} className="products-grid">
            {products.map((p, index) => (
              <Link
                to="/devices"
                style={styles.productCard}
                className="product-card"
                key={p.id}
              >
                <span style={styles.badge} className="badge">Featured</span>
                <div style={styles.productImageContainer} className="product-image-container">
                  <img
                    src={p.img}
                    alt={p.name}
                    style={styles.productImage}
                    className="product-image"
                  />
                  <div style={styles.productOverlay} className="product-overlay">
                    View Product
                  </div>
                </div>
                <div style={styles.productBody}>
                  <h5 style={styles.productName} className="product-name">
                    {p.name}
                  </h5>
                  <p style={styles.productPrice}>${p.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Why Buy From Us Section */}
        <section style={styles.whyBuySection}>
          <div style={styles.whyBuyPattern}></div>
          <div className="container">
            <h2 style={styles.whyBuyTitle} className="why-buy-title">
              Why Buy From Us?
            </h2>
            <div style={styles.featuresGrid} className="features-grid">
              {[
                {
                  title: "High Quality",
                  desc: "Our products are made from the best materials and craftsmanship to ensure durability and excellence.",
                  icon: "✓",
                },
                {
                  title: "Affordable Prices",
                  desc: "We offer competitive pricing on all our products without compromising on quality.",
                  icon: "₹",
                },
                {
                  title: "Fast Shipping",
                  desc: "Receive your orders in no time with our fast and reliable shipping service nationwide.",
                  icon: "⚡",
                },
              ].map((feature, idx) => (
                <div key={idx} style={styles.featureCard} className="feature-card">
                  <div style={styles.featureIcon} className="feature-icon">
                    {feature.icon}
                  </div>
                  <h3 style={styles.featureTitle}>{feature.title}</h3>
                  <p style={styles.featureDescription}>{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default FeaturedProducts;