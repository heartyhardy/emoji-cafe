const Product = require('../models/Product');
const Category = require('../models/Category');

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

    new_product.save(isSaved=>console.log(isSaved));

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

    const new_category = new Category(
        req.body.category_name
    )

    new_category.save(isSaved => console.log(isSaved));

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