const express = require('express');
const router = express.Router();

const {
        AddNewProduct,
        SaveNewProduct,
        AddNewCategory,
        SaveNewCategory
     } = require('../controllers/admin-controller');

// Add product form
router.get('/add-product', AddNewProduct);

// Post a new product
router.post('/save-product', SaveNewProduct);

// Add category form
router.get('/add-category', AddNewCategory);

// Post a new category
router.post('/save-category', SaveNewCategory);


exports.router = router;