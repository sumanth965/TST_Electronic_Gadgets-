import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "../../Components/Nav/Nav";
import { useCart } from "../../Context/CartContext";
import {
    BsInfoCircle,
    BsSearch,
    // BsGrid3x3,   // ✅ correct replacement
    BsList,
    BsFilterLeft,
    BsX
} from "react-icons/bs";

// Debounce function
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
};

const Devices = () => {
    const [items, setItems] = useState([]);
    const [category, setCategory] = useState("all");
    const [categorySearch, setCategorySearch] = useState("");
    const [productSearch, setProductSearch] = useState("");
    const [viewMode, setViewMode] = useState("grid"); // grid or list
    const [sortBy, setSortBy] = useState("name"); // name, price, rating
    const [sortOrder, setSortOrder] = useState("asc"); // asc or desc
    const [showFilters, setShowFilters] = useState(false);
    const [loading, setLoading] = useState(true);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
    const [selectedRating, setSelectedRating] = useState(0);

    const location = useLocation();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    // Fetch items
    useEffect(() => {
        const fetchItems = async () => {
            try {
                setLoading(true);
                const response = await axios.get("https://tst-electronic-gadgets-su-manth09-backend.onrender.com/api/v1/items");
                setItems(response.data);

                // Set initial price range based on data
                if (response.data.length > 0) {
                    const prices = response.data.map(item => item.itemPrice);
                    setPriceRange({
                        min: Math.min(...prices),
                        max: Math.max(...prices)
                    });
                }
            } catch (error) {
                console.error("Error fetching items:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, []);

    // Memoized calculations
    const uniqueCategories = useMemo(() =>
        Array.from(new Set(items.map((item) => item.itemCategory))),
        [items]
    );

    const categoryDisplayNames = { all: "All Products" };

    // Debounced search
    const debouncedProductSearch = useDebounce(productSearch, 300);
    const debouncedCategorySearch = useDebounce(categorySearch, 300);

    // Advanced filtering and sorting
    const filteredAndSortedItems = useMemo(() => {
        let filtered = items.filter((item) => {
            const matchesCategory = category === "all" || item.itemCategory === category;
            const matchesSearch = item.itemName
                .toLowerCase()
                .includes(debouncedProductSearch.toLowerCase());
            const matchesPrice = item.itemPrice >= priceRange.min && item.itemPrice <= priceRange.max;
            const matchesRating = selectedRating === 0 || item.itemQuality >= selectedRating;

            return matchesCategory && matchesSearch && matchesPrice && matchesRating;
        });

        // Sort items
        filtered.sort((a, b) => {
            let comparison = 0;

            switch (sortBy) {
                case 'name':
                    comparison = a.itemName.localeCompare(b.itemName);
                    break;
                case 'price':
                    comparison = a.itemPrice - b.itemPrice;
                    break;
                case 'rating':
                    comparison = a.itemQuality - b.itemQuality;
                    break;
                default:
                    comparison = 0;
            }

            return sortOrder === 'desc' ? -comparison : comparison;
        });

        return filtered;
    }, [items, category, debouncedProductSearch, priceRange, selectedRating, sortBy, sortOrder]);

    // Filter categories
    const filteredCategories = useMemo(() =>
        uniqueCategories.filter((cat) =>
            cat.toLowerCase().includes(debouncedCategorySearch.toLowerCase())
        ),
        [uniqueCategories, debouncedCategorySearch]
    );

    const handleAddToCart = (product) => {
        addToCart(product);
        navigate("/cart");
    };

    const handleLogoClick = (product) => {
        navigate("/i", { state: { product } });
    };

    const resetFilters = () => {
        setCategory("all");
        setProductSearch("");
        setCategorySearch("");
        setSelectedRating(0);
        if (items.length > 0) {
            const prices = items.map(item => item.itemPrice);
            setPriceRange({
                min: Math.min(...prices),
                max: Math.max(...prices)
            });
        }
    };

    const ProductCard = ({ product, isListView }) => (
        <div className={`${isListView ? 'col-12' : 'col-12 col-sm-6 col-md-4 col-xl-3'}`}>
            <div className={`card h-100 shadow-sm product-card ${isListView ? 'product-card-list' : ''}`}>
                {!isListView ? (
                    <>
                        <div className="card-img-container">
                            <img
                                src={`/images/${product.itemImage}`}
                                alt={product.itemName}
                                className="card-img-top"
                                loading="lazy"
                            />
                            <div className="card-overlay">
                                <BsInfoCircle
                                    size={24}
                                    onClick={() => handleLogoClick(product)}
                                    className="info-icon-overlay"
                                />
                            </div>
                        </div>
                        <div className="card-body text-center">
                            <h5 className="card-title">
                                {product.itemName}
                                <div className="rating-container mt-1">
                                    <span className="rating-stars">
                                        {"★".repeat(product.itemQuality)}
                                        {"☆".repeat(5 - product.itemQuality)}
                                    </span>
                                    <span className="rating-number">({product.itemQuality}/5)</span>
                                </div>
                            </h5>
                            <p className="card-price">₹{product.itemPrice.toLocaleString()}</p>
                            <button
                                className="btn btn-warning btn-add-to-cart"
                                onClick={() => handleAddToCart(product)}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="row g-0">
                        <div className="col-md-3">
                            <img
                                src={`/images/${product.itemImage}`}
                                alt={product.itemName}
                                className="img-fluid rounded-start h-100"
                                style={{ objectFit: 'cover' }}
                                loading="lazy"
                            />
                        </div>
                        <div className="col-md-9">
                            <div className="card-body d-flex flex-column justify-content-between h-100">
                                <div>
                                    <div className="d-flex justify-content-between align-items-start">
                                        <h5 className="card-title mb-2">{product.itemName}</h5>
                                        <BsInfoCircle
                                            size={20}
                                            onClick={() => handleLogoClick(product)}
                                            className="info-icon ms-2"
                                        />
                                    </div>
                                    <div className="rating-container mb-2">
                                        <span className="rating-stars">
                                            {"★".repeat(product.itemQuality)}
                                            {"☆".repeat(5 - product.itemQuality)}
                                        </span>
                                        <span className="rating-number">({product.itemQuality}/5)</span>
                                    </div>
                                    <p className="card-text text-muted">{product.itemCategory}</p>
                                </div>
                                <div className="d-flex justify-content-between align-items-end">
                                    <p className="card-price mb-0">₹{product.itemPrice.toLocaleString()}</p>
                                    <button
                                        className="btn btn-warning btn-sm"
                                        onClick={() => handleAddToCart(product)}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <>
            <div className="devices-container">
                {/* Mobile Filter Toggle */}
                <div className="mobile-filter-toggle d-lg-none">
                    <button
                        className="btn btn-outline-warning"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <BsFilterLeft size={20} className="me-1" />
                        Filters
                    </button>
                </div>

                <div className="main-content">
                    {/* Sidebar */}
                    <aside className={`sidebar ${showFilters ? 'show' : ''}`}>
                        <div className="sidebar-header">
                            <h5>Filters</h5>
                            <button
                                className="btn-close-sidebar d-lg-none"
                                onClick={() => setShowFilters(false)}
                            >
                                <BsX size={24} />
                            </button>
                        </div>

                        <div className="sidebar-content">
                            {/* Category Search */}
                            <div className="filter-section">
                                <label className="filter-label">Search Categories</label>
                                <div className="search-input-container">
                                    <BsSearch className="search-icon" />
                                    <input
                                        type="text"
                                        className="form-control search-input"
                                        placeholder="Search categories..."
                                        value={categorySearch}
                                        onChange={(e) => setCategorySearch(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="filter-section">
                                <label className="filter-label">Categories</label>
                                <ul className="category-list">
                                    <li>
                                        <button
                                            className={`category-btn ${category === "all" ? "active" : ""}`}
                                            onClick={() => setCategory("all")}
                                        >
                                            {categoryDisplayNames["all"]}
                                        </button>
                                    </li>
                                    {filteredCategories.map((cat) => (
                                        <li key={cat}>
                                            <button
                                                className={`category-btn ${category === cat ? "active" : ""}`}
                                                onClick={() => setCategory(cat)}
                                            >
                                                {cat}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Price Range */}
                            <div className="filter-section">
                                <label className="filter-label">Price Range</label>
                                <div className="price-inputs">
                                    <input
                                        type="number"
                                        className="form-control form-control-sm"
                                        placeholder="Min"
                                        value={priceRange.min}
                                        onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) || 0 })}
                                    />
                                    <span className="px-2">to</span>
                                    <input
                                        type="number"
                                        className="form-control form-control-sm"
                                        placeholder="Max"
                                        value={priceRange.max}
                                        onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) || 100000 })}
                                    />
                                </div>
                            </div>

                            {/* Rating Filter */}
                            <div className="filter-section">
                                <label className="filter-label">Minimum Rating</label>
                                <div className="rating-filter">
                                    {[0, 1, 2, 3, 4, 5].map((rating) => (
                                        <button
                                            key={rating}
                                            className={`rating-btn ${selectedRating === rating ? 'active' : ''}`}
                                            onClick={() => setSelectedRating(rating)}
                                        >
                                            {rating === 0 ? 'All' : `${rating}+ ★`}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Reset Filters */}
                            <button className="btn btn-outline-secondary btn-sm w-100 mt-3" onClick={resetFilters}>
                                Reset Filters
                            </button>
                        </div>
                    </aside>

                    {/* Products Section */}
                    <main className="products-section">
                        {/* Search and Controls */}
                        <div className="controls-section">
                            <div className="search-container">
                                <BsSearch className="search-icon" />
                                <input
                                    type="text"
                                    className="form-control search-input"
                                    placeholder="Search products..."
                                    value={productSearch}
                                    onChange={(e) => setProductSearch(e.target.value)}
                                />
                            </div>

                            <div className="controls-right">
                                {/* Sort Controls */}
                                <div className="sort-controls">
                                    <select
                                        className="form-select form-select-sm"
                                        value={`${sortBy}-${sortOrder}`}
                                        onChange={(e) => {
                                            const [newSortBy, newSortOrder] = e.target.value.split('-');
                                            setSortBy(newSortBy);
                                            setSortOrder(newSortOrder);
                                        }}
                                    >
                                        <option value="name-asc">Name (A-Z)</option>
                                        <option value="name-desc">Name (Z-A)</option>
                                        <option value="price-asc">Price (Low-High)</option>
                                        <option value="price-desc">Price (High-Low)</option>
                                        <option value="rating-desc">Rating (High-Low)</option>
                                        <option value="rating-asc">Rating (Low-High)</option>
                                    </select>
                                </div>

                                {/* View Toggle */}
                                <div className="view-toggle">
                                    <button
                                        className={`btn btn-outline-secondary btn-sm ${viewMode === 'grid' ? 'active' : ''}`}
                                        onClick={() => setViewMode('grid')}
                                    >
                                        <BsInfoCircle />
                                    </button>
                                    <button
                                        className={`btn btn-outline-secondary btn-sm ${viewMode === 'list' ? 'active' : ''}`}
                                        onClick={() => setViewMode('list')}
                                    >
                                        <BsList />
                                    </button>
                                </div>

                            </div>
                        </div>

                        {/* Results Info */}
                        <div className="results-info">
                            <span>{filteredAndSortedItems.length} products found</span>
                        </div>

                        {/* Products Grid/List */}
                        {loading ? (
                            <div className="loading-container">
                                <div className="spinner-border text-warning" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : (
                            <div className={`products-grid ${viewMode === 'list' ? 'products-list' : ''}`}>
                                {filteredAndSortedItems.length > 0 ? (
                                    <div className="row g-3">
                                        {filteredAndSortedItems.map((product) => (
                                            <ProductCard
                                                key={product._id}
                                                product={product}
                                                isListView={viewMode === 'list'}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="no-products">
                                        <div className="no-products-content">
                                            <BsSearch size={48} className="text-muted mb-3" />
                                            <h4>No products found</h4>
                                            <p className="text-muted">Try adjusting your search or filters</p>
                                            <button className="btn btn-warning" onClick={resetFilters}>
                                                Clear All Filters
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </main>
                </div>

                {/* Mobile Overlay */}
                {showFilters && (
                    <div className="mobile-overlay d-lg-none" onClick={() => setShowFilters(false)} />
                )}
            </div>

            {/* Advanced CSS Styles */}
            <style>{`
        /* Container and Layout */
        .devices-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        }

        .mobile-filter-toggle {
          padding: 1rem;
          background: white;
          border-bottom: 1px solid #dee2e6;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .main-content {
          display: flex;
          min-height: calc(100vh - 80px);
        }

        /* Sidebar Styles */
        .sidebar {
          width: 280px;
          background: white;
          border-right: 1px solid #dee2e6;
          padding: 0;
          overflow-y: auto;
          position: sticky;
          top: 0;
          height: 100vh;
          transition: all 0.3s ease;
          box-shadow: 2px 0 10px rgba(0,0,0,0.1);
        }

        .sidebar-header {
          padding: 1.5rem;
          border-bottom: 1px solid #dee2e6;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(135deg, #ffc107 0%, #ffb300 100%);
          color: white;
        }

        .sidebar-header h5 {
          margin: 0;
          font-weight: 600;
        }

        .btn-close-sidebar {
          background: none;
          border: none;
          color: white;
          padding: 0;
          cursor: pointer;
        }

        .sidebar-content {
          padding: 1.5rem;
        }

        .filter-section {
          margin-bottom: 2rem;
        }

        .filter-label {
          font-weight: 600;
          color: #495057;
          margin-bottom: 0.75rem;
          display: block;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* Search Input */
        .search-input-container {
          position: relative;
        }

        .search-input {
          padding-left: 2.5rem;
          border-radius: 0.5rem;
          border: 2px solid #e9ecef;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          border-color: #ffc107;
          box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.25);
        }

        .search-icon {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: #6c757d;
          z-index: 2;
        }

        /* Category List */
        .category-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .category-btn {
          width: 100%;
          text-align: left;
          background: none;
          border: none;
          padding: 0.75rem 1rem;
          margin-bottom: 0.25rem;
          border-radius: 0.5rem;
          transition: all 0.3s ease;
          color: #495057;
          font-size: 0.9rem;
        }

        .category-btn:hover {
          background: #f8f9fa;
          color: #ffc107;
          transform: translateX(5px);
        }

        .category-btn.active {
          background: linear-gradient(135deg, #ffc107 0%, #ffb300 100%);
          color: white;
          font-weight: 600;
        }

        /* Price Inputs */
        .price-inputs {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .price-inputs input {
          flex: 1;
          min-width: 0;
        }

        /* Rating Filter */
        .rating-filter {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .rating-btn {
          background: #f8f9fa;
          border: 1px solid #dee2e6;
          border-radius: 0.375rem;
          padding: 0.375rem 0.75rem;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .rating-btn:hover {
          background: #e9ecef;
        }

        .rating-btn.active {
          background: #ffc107;
          border-color: #ffc107;
          color: white;
        }

        /* Products Section */
        .products-section {
          flex: 1;
          padding: 2rem;
          background: #f8f9fa;
        }

        .controls-section {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
          align-items: center;
          flex-wrap: wrap;
        }

        .search-container {
          flex: 1;
          min-width: 250px;
          position: relative;
        }

        .controls-right {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .sort-controls select {
          min-width: 160px;
        }

        .view-toggle {
          display: flex;
          gap: 0.25rem;
        }

        .view-toggle .btn.active {
          background-color: #ffc107;
          border-color: #ffc107;
          color: white;
        }

        .results-info {
          margin-bottom: 1rem;
          color: #6c757d;
          font-size: 0.9rem;
        }

        /* Product Cards */
        .products-grid .row {
          margin: 0;
        }

        .product-card {
          border: none;
          border-radius: 1rem;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
          background: white;
          position: relative;
        }

        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }

        .card-img-container {
          position: relative;
          overflow: hidden;
        }

        .card-img-top {
          height: 220px;
          width: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .product-card:hover .card-img-top {
          transform: scale(1.05);
        }

        .card-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .product-card:hover .card-overlay {
          opacity: 1;
        }

        .info-icon-overlay {
          color: white;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .info-icon-overlay:hover {
          transform: scale(1.2);
        }

        .card-body {
          padding: 1.5rem;
        }

        .card-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #212529;
          margin-bottom: 0.75rem;
          line-height: 1.4;
        }

        .rating-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .rating-stars {
          color: #ffc107;
          font-size: 1rem;
        }

        .rating-number {
          font-size: 0.8rem;
          color: #6c757d;
        }

        .card-price {
          font-size: 1.25rem;
          font-weight: 700;
          color: #28a745;
          margin: 1rem 0;
        }

        .btn-add-to-cart {
          background: linear-gradient(135deg, #ffc107 0%, #ffb300 100%);
          border: none;
          border-radius: 0.5rem;
          padding: 0.75rem 1.5rem;
          font-weight: 600;
          transition: all 0.3s ease;
          color: white;
        }

        .btn-add-to-cart:hover {
          background: linear-gradient(135deg, #ffb300 0%, #ff8f00 100%);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(255, 193, 7, 0.4);
          color: white;
        }

        /* List View */
        .product-card-list {
          margin-bottom: 1rem;
        }

        .product-card-list .card-body {
          padding: 1.5rem;
        }

        .info-icon {
          cursor: pointer;
          transition: all 0.3s ease;
          color: #007bff;
        }

        .info-icon:hover {
          color: #0056b3;
          transform: scale(1.1);
        }

        /* Loading */
        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 300px;
        }

        /* No Products */
        .no-products {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 300px;
          text-align: center;
        }

        .no-products-content h4 {
          color: #495057;
          margin-bottom: 0.5rem;
        }

        /* Mobile Styles */
        @media (max-width: 991.98px) {
          .sidebar {
            position: fixed;
            left: -280px;
            z-index: 1050;
            height: 100vh;
          }

          .sidebar.show {
            left: 0;
          }

          .mobile-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            z-index: 1040;
          }

          .products-section {
            padding: 1rem;
          }

          .controls-section {
            flex-direction: column;
            align-items: stretch;
          }

          .controls-right {
            justify-content: space-between;
          }

          .search-container {
            min-width: unset;
          }
        }

        @media (max-width: 767.98px) {
          .card-img-top {
            height: 180px !important;
          }

          .card-title {
            font-size: 1rem;
          }

          .card-price {
            font-size: 1.1rem;
          }

          .btn-add-to-cart {
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
          }

          .controls-right {
            flex-direction: column;
            align-items: stretch;
            gap: 0.5rem;
          }

          .sort-controls select {
            min-width: unset;
          }
        }

        @media (max-width: 575.98px) {
          .rating-container {
            flex-direction: column;
            gap: 0.25rem;
          }

          .product-card-list .row {
            flex-direction: column;
          }

          .product-card-list .col-md-3,
          .product-card-list .col-md-9 {
            max-width: 100%;
          }

          .product-card-list img {
            height: 200px;
            width: 100%;
          }
        }

        /* Animation Classes */
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

        .product-card {
          animation: fadeInUp 0.6s ease forwards;
        }

        /* Scrollbar Styling */
        .sidebar::-webkit-scrollbar {
          width: 6px;
        }

        .sidebar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        .sidebar::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 3px;
        }

        .sidebar::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
      `}</style>
        </>
    );
};

export default Devices;
