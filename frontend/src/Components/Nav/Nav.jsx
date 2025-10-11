import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../img/logo.png';
import { useNavigate } from 'react-router-dom';

function Header() {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState("");

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleOutsideClick = (event) => {
        if (!event.target.closest('#menu') && !event.target.closest('#dropdown-menu')) {
            setDropdownVisible(false);
        }
    };

    React.useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/devices?search=${searchInput}`);
    };

    const styles = {
        header: {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        },
        container: {
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 20px',
        },
        navbar: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '15px 0',
            gap: '20px',
        },
        logo: {
            height: '50px',
            cursor: 'pointer',
            transition: 'transform 0.3s ease',
            filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.2))',
        },
        searchForm: {
            flex: '1',
            maxWidth: '600px',
            display: 'flex',
            position: 'relative',
            animation: 'slideIn 0.5s ease-out',
        },
        searchBar: {
            width: '100%',
            padding: '12px 20px',
            border: 'none',
            borderRadius: '50px',
            fontSize: '15px',
            outline: 'none',
            background: 'rgba(255, 255, 255, 0.95)',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
            paddingRight: '50px',
        },
        searchBtn: {
            position: 'absolute',
            right: '5px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 12px rgba(245, 87, 108, 0.4)',
        },
        dropdownMenu: {
            position: 'absolute',
            top: '100%',
            right: '20px',
            marginTop: '10px',
            background: 'rgba(255, 255, 255, 0.98)',
            borderRadius: '16px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
            listStyle: 'none',
            padding: '10px 0',
            minWidth: '200px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            animation: 'dropdownSlide 0.3s ease-out',
            overflow: 'hidden',
        },
        dropdownItem: {
            padding: '0',
        },
        navLink: {
            display: 'block',
            padding: '12px 25px',
            color: '#2d3748',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: '500',
            transition: 'all 0.3s ease',
            position: 'relative',
        },
        cartIcon: {
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)',
        },
        menuIcon: {
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)',
        },
    };

    return (
        <>
            <style>
                {`
                    @keyframes slideIn {
                        from {
                            opacity: 0;
                            transform: translateY(-10px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    @keyframes dropdownSlide {
                        from {
                            opacity: 0;
                            transform: translateY(-20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    @keyframes bounce {
                        0%, 100% {
                            transform: translateY(0);
                        }
                        50% {
                            transform: translateY(-5px);
                        }
                    }

                    #logo:hover {
                        transform: scale(1.1) rotate(5deg);
                    }

                    #search-bar:focus {
                        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
                        transform: translateY(-2px);
                    }

                    #search-btn:hover {
                        transform: translateY(-50%) scale(1.1);
                        box-shadow: 0 6px 16px rgba(245, 87, 108, 0.6);
                    }

                    #search-btn:active {
                        transform: translateY(-50%) scale(0.95);
                    }

                    .nav-link:hover {
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white !important;
                        transform: translateX(5px);
                    }

                    .nav-link::before {
                        content: '';
                        position: absolute;
                        left: 0;
                        top: 50%;
                        transform: translateY(-50%);
                        width: 4px;
                        height: 0;
                        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                        transition: height 0.3s ease;
                        border-radius: 0 4px 4px 0;
                    }

                    .nav-link:hover::before {
                        height: 100%;
                    }

                    #cart:hover {
                        transform: scale(1.15);
                        background: rgba(255, 255, 255, 0.3);
                        animation: bounce 0.6s ease;
                    }

                    #menu:hover {
                        transform: rotate(90deg) scale(1.15);
                        background: rgba(255, 255, 255, 0.3);
                    }

                    #cart svg, #menu svg {
                        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
                    }

                    #cart svg {
                        fill: white;
                    }

                    #menu svg {
                        fill: white;
                    }

                    @media (max-width: 768px) {
                        .navbar {
                            flex-wrap: wrap;
                        }
                        
                        #search {
                            order: 3;
                            width: 100%;
                            margin-top: 15px;
                        }

                        #dropdown-menu {
                            right: 10px;
                            left: 10px;
                            width: auto;
                        }
                    }

                    @media (max-width: 480px) {
                        #logo {
                            height: 40px;
                        }

                        #search-bar {
                            font-size: 14px;
                            padding: 10px 15px;
                        }

                        #cart, #menu {
                            width: 35px;
                            height: 35px;
                        }
                    }
                `}
            </style>

            <header style={styles.header}>
                <div className="container" style={styles.container}>
                    <nav className="navbar" style={styles.navbar}>
                        <img src={logo} alt="Logo" id="logo" style={styles.logo} />

                        {/* Search Form */}
                        <form id="search" style={styles.searchForm} onSubmit={handleSearch}>
                            <input 
                                type="text" 
                                placeholder="Search for products..." 
                                id="search-bar" 
                                style={styles.searchBar}
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                            <button type="submit" id="search-btn" style={styles.searchBtn}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                </svg>
                            </button>
                        </form>

                        {/* Dropdown Menu */}
                        <ul id="dropdown-menu" style={{
                            ...styles.dropdownMenu,
                            display: dropdownVisible ? 'block' : 'none'
                        }}>
                            <li style={styles.dropdownItem}>
                                <Link className="nav-link" to="/" style={styles.navLink}>Home</Link>
                            </li>
                            <li style={styles.dropdownItem}>
                                <Link className="nav-link" to="/devices" style={styles.navLink}>Categories</Link>
                            </li>
                            <li style={styles.dropdownItem}>
                                <Link className="nav-link" to="/review" style={styles.navLink}>Reviews</Link>
                            </li>
                        </ul>

                        {/* Cart Icon */}
                        <Link to="/cart" id="cart" style={styles.cartIcon}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="white" className="bi bi-cart3" viewBox="0 0 16 16">
                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                            </svg>
                        </Link>

                        {/* Menu Toggle Icon */}
                        <a href="javascript:void(0);" id="menu" onClick={toggleDropdown} style={styles.menuIcon}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="white" className="bi bi-list" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                            </svg>
                        </a>
                    </nav>
                </div>
            </header>
        </>
    );
}

export default Header;