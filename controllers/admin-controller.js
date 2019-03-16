const Product = require('../models/Product');

const AddNewProduct = (req, res, next) => {
    res
        .status(200)
        .render('admin/new-product', {title: "Add new product"});
}

const SaveNewProduct = (req, res, next) => {

    const new_product = new Product(
        req.body.product_title,
        req.body.product_desc,
        req.body.product_category,
        req.body.product_price,
        req.body.product_img
    )

    new_product.save(result=>console.log);

    res
        .status(200)
        .redirect('/');
}

const AddNewCategory = (req, res, next) => {
    res
        .status(200)
        .render('admin/new-category', {title: "Add new category"});
}

const SaveNewCategory = (req, res, next) => {
    res
        .status(200)
        .redirect('/');
}

module.exports = {
    AddNewProduct,
    SaveNewProduct,
    AddNewCategory,
    SaveNewCategory
}