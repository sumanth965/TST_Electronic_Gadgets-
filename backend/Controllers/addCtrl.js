// addCtrl.jsx
const Add = require('../Model/add');

const submitMessage = async (req, res) => {
    const { itemName,itemDescription, itemPrice, itemQuality, itemCategory } = req.body;
    const itemImage = req.file ? req.file.filename : null;

    if (!itemImage) {
        return res.status(400).json({ message: 'Item image is required' });
    }

    try {
        const newAdd = new Add({
            itemName,
            itemDescription,
            itemImage,
            itemPrice,
            itemQuality,
            itemCategory,
        });
        await newAdd.save();
        console.log('New item added with image:', itemImage);  // Added logging
        res.status(201).json({ message: 'Item added successfully', data: newAdd });
    } catch (error) {
        console.error('Error saving item:', error);
        res.status(500).json({ message: 'Error adding item', error: error.message });
    }
};


const getItems = async (req, res) => {
    try {
        const items = await Add.find(); // Fetch all items from the "Clothes" collection
        res.status(200).json(items); // Respond with the list of items
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ message: 'Error fetching items', error: error.message });
    }
};

const deleteItem = async (req, res) => {
    const { id } = req.params; // Get the ID from the request parameters
    try {
        const item = await Add.findByIdAndDelete(id); // Use Add model for deletion
        if (!item) {
            return res.status(404).json({ message: 'Item not found' }); // Item not found
        }
        res.status(200).json({ message: 'Item deleted successfully' }); // Success response
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json({ message: 'Server error' }); // Error response
    }
};

const updateItem = async (req, res) => {
    const { id } = req.params;
    const { itemName,itemDescription, itemPrice, itemQuality, itemCategory } = req.body;
    const itemImage = req.file ? req.file.filename : null;

    try {
        // Find the item first
        const existingItem = await Add.findById(id);
        if (!existingItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Only update the image if a new file is uploaded, otherwise keep the old one
        const updatedItemData = {
            itemName,
            itemDescription,
            itemPrice,
            itemQuality,
            itemCategory,
            itemImage: itemImage || existingItem.itemImage // Keep the old image if no new one is uploaded
        };

        const updatedItem = await Add.findByIdAndUpdate(id, updatedItemData, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ message: 'Item updated successfully', data: updatedItem });
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).json({ message: 'Error updating item', error: error.message });
    }
};

module.exports = { submitMessage, getItems, deleteItem, updateItem }; // Make sure to include updateItem
