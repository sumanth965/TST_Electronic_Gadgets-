import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ListItems = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const fetchItems = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:3000/api/v1/items');
            setItems(response.data);
        } catch (error) {
            console.error("Error fetching items:", error);
            setError("Error fetching items");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteItem = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await axios.delete(`http://localhost:3000/api/v1/add/${id}`);
                alert('Item deleted successfully!');
                setItems(items.filter(item => item._id !== id));
            } catch (error) {
                console.error('Error deleting item:', error);
                alert('Error deleting item');
            }
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const filteredItems = items.filter((item) =>
        item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="card mt-4 shadow-lg border-0 rounded">
            <div className="card-body">
                <h4 className="text-center">List of Items</h4>
                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Search Items"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-danger">{error}</p>
                ) : (
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Quality</th>
                                <th>Category</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredItems.length > 0 ? (
                                filteredItems.map((item) => (
                                    <tr key={item._id}>
                                        <td>
                                            <img
                                                src={`/images/${item.itemImage}`}
                                                alt={item.itemName}
                                                style={{ width: '80px', height: 'auto' }}
                                            />
                                        </td>
                                        <td>{item.itemName}</td>
                                        <td>₹{item.itemPrice}</td>
                                        <td>{item.itemQuality} Star{item.itemQuality > 1 ? 's' : ''}</td>
                                        <td>{item.itemCategory}</td>
                                        <td>
                                            <button
                                                className="btn btn-warning me-2"
                                                onClick={() => navigate('/admin/add', { state: { item } })}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleDeleteItem(item._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">No items found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default ListItems;
