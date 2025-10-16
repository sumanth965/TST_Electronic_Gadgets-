import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const AddItem = () => {
    const location = useLocation();
    const editingItem = location.state?.item || null;

    const [formData, setFormData] = useState({
        itemName: '',
        itemDescription: '',
        itemImage: null,
        itemPrice: '',
        itemQuality: '',
        itemCategory: '',
    });

    const { itemName, itemDescription, itemImage, itemPrice, itemQuality, itemCategory } = formData;
    const [isEditing, setIsEditing] = useState(false);
    const [editingItemId, setEditingItemId] = useState(null);

    useEffect(() => {
        if (editingItem) {
            setFormData({
                itemName: editingItem.itemName,
                itemDescription: editingItem.itemDescription,
                itemImage: editingItem.itemImage,
                itemPrice: editingItem.itemPrice,
                itemQuality: editingItem.itemQuality,
                itemCategory: editingItem.itemCategory,
            });
            setIsEditing(true);
            setEditingItemId(editingItem._id);
        }
    }, [editingItem]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'itemImage') {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleAddItem = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('itemName', itemName);
        data.append('itemDescription', itemDescription);
        data.append('itemPrice', itemPrice);
        data.append('itemQuality', itemQuality);
        data.append('itemCategory', itemCategory);

        if (itemImage) {
            data.append('itemImage', itemImage);
        }

        try {
            const response = isEditing
                ? await axios.put(`https://tst-electronic-gadgets-su-manth09-backend.onrender.com/api/v1/add/${editingItemId}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                })
                : await axios.post('https://tst-electronic-gadgets-su-manth09-backend.onrender.com/api/v1/add', data, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

            alert(isEditing ? 'Item updated successfully!' : 'Item added successfully!');
            resetForm();
        } catch (error) {
            console.error('Error adding/updating item:', error);
            alert(isEditing ? 'Error updating item' : 'Error adding item');
        }
    };

    const resetForm = () => {
        setFormData({
            itemName: '',
            itemDescription: '',
            itemImage: null,
            itemPrice: '',
            itemQuality: '',
            itemCategory: '',
        });
        setIsEditing(false);
        setEditingItemId(null);
    };

    return (
        <div className="card mt-4 shadow-lg border-0 rounded">
            <div className="card-body">
                <h4 className="text-center">{isEditing ? 'Edit Item' : 'Add New Item'}</h4>
                <form onSubmit={handleAddItem} noValidate>                    <div className="form-group">
                    <label htmlFor="itemName">Item Name</label>
                    <input
                        type="text"
                        id="itemName"
                        name="itemName"
                        className="form-control"
                        value={itemName}
                        onChange={handleChange}
                        required
                    />
                </div>
                    <div className="form-group">
                        <label htmlFor="itemDescription">Description</label>
                        <input
                            type="text"
                            id="itemDescription"
                            name="itemDescription"
                            className="form-control"
                            value={itemDescription}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group mt-3">
                        <label htmlFor="itemImage">Image</label>
                        <input
                            type="file"
                            id="itemImage"
                            name="itemImage"
                            className="form-control"
                            onChange={handleChange}
                            required={!isEditing}
                        />
                    </div>

                    <div className="form-group mt-3">
                        <label htmlFor="itemPrice">Price</label>
                        <input
                            type="number"
                            id="itemPrice"
                            name="itemPrice"
                            className="form-control"
                            value={itemPrice}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group mt-3">
                        <label htmlFor="itemQuality">Quality (1 to 5 stars)</label>
                        <select
                            id="itemQuality"
                            name="itemQuality"
                            className="form-control"
                            value={itemQuality}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Quality</option>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <option key={star} value={star}>
                                    {star} Star{star > 1 ? 's' : ''}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group mt-3">
                        <label htmlFor="itemCategory">Category</label>
                        <select
                            id="itemCategory"
                            name="itemCategory"
                            className="form-control"
                            value={itemCategory}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="Smartphones & Accessories">Smartphones & Accessories</option>
                            <option value="Laptops & Computers">Laptops & Computers</option>
                            <option value="Tablets & eReaders">Tablets & eReaders</option>
                            <option value="Wearable Technology">Wearable Technology</option>
                            <option value="Audio & Home Entertainment">Audio & Home Entertainment</option>
                            <option value="Gaming Consoles & Accessories">Gaming Consoles & Accessories</option>
                            <option value="Cameras & Photography">Cameras & Photography</option>
                            <option value="Smart Home Devices">Smart Home Devices</option>
                            <option value="Computer Components & Accessories">Computer Components & Accessories</option>
                            <option value="Drones & RC Gadgets">Drones & RC Gadgets</option>
                            <option value="Health & Wellness Gadgets">Health & Wellness Gadgets</option>
                            <option value="Power & Charging">Power & Charging</option>
                            <option value="Smart Kitchen Gadgets">Smart Kitchen Gadgets</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-success mt-4 w-100">
                        {isEditing ? 'Update Item' : 'Add Item'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddItem;
