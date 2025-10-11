const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { submitMessage, getItems, updateItem, deleteItem } = require('../Controllers/addCtrl');

const router = express.Router();

// Configure Multer for storing images in frontend/public/images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../../frontend/public/images')); // Destination path
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Unique filename
    }
});

const upload = multer({ storage });

// Function to copy file to admin/public/images after initial upload
const copyFileToAdminUploads = (filename) => {
    const frontendPath = path.resolve(__dirname, '../../frontend/public/images', filename);
    const adminPath = path.resolve(__dirname, '../../admin/public/images', filename);

    fs.copyFile(frontendPath, adminPath, (err) => {
        if (err) {
            console.error('Error copying file to admin images:', err);
        } else {
            console.log('File successfully copied to admin images');
        }
    });
};

// Route to add new item with image upload
router.post('/add', upload.single('itemImage'), (req, res, next) => {
    if (req.file) {
        copyFileToAdminUploads(req.file.filename); // Copy file to admin folder
    }
    next();
}, submitMessage);

// Route to get all items
router.get('/items', getItems);

// Route to update an item with image upload
router.put('/add/:id', upload.single('itemImage'), (req, res, next) => {
    if (req.file) {
        copyFileToAdminUploads(req.file.filename); // Copy file to admin folder if updated
    }
    next();
}, updateItem);

// Route to delete an item
router.delete('/add/:id', deleteItem);

module.exports = router;
