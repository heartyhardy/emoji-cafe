const Product = require('../models/Product');
const Category = require('../models/Category');

const AddNewProduct = (req, res, next) => {

    const categories = Category.fetch((categories) => {
        if(categories.length > 0)
        {
            res
            .status(200)
            .render('admin/new-product', {title: "Add new product", categories});
        }
        else
        {
            res
            .status(400)
            .render('error/400', {title: "Bad request"});
        }
    })
}

const SaveNewProduct = (req, res, next) => {

    try
    {
        const new_product = new Product(
            req.body.product_title,
            req.body.product_desc,
            req.body.product_category,
            req.body.product_price,
            req.body.product_img
        )

        new_product.save(isSaved=>{
            if(isSaved.saved)
            {
                res
                    .status(200)
                    .redirect('/');
            }
            else if(!isSaved.saved)
            {
                res
                    .status(400)
                    .render('error/400', {title:"Bad request"});
            }
        });
    }
    catch
    {
        res.status(400).render('error/400', {title:"Bad request"});
    }
}

const AddNewCategory = (req, res, next) => {
    res
        .status(200)
        .render('admin/new-category', {title: "Add new category"});
}

const SaveNewCategory = (req, res, next) => {

    try
    {
        const new_category = new Category(
            req.body.category_name
        )

         new_category.save(isSaved => {
             if(isSaved.saved)
             {
                 res
                    .status(200)
                    .redirect('/');
             }
             else
             {
                 res
                    .status(400)
                    .render('error/400', {title:"Bad request"});
             }
         });
    }
    catch
    {
        res.status(400).render('error/400', {title:"Bad request"});
    }
}

module.exports = {
    AddNewProduct,
    SaveNewProduct,
    AddNewCategory,
    SaveNewCategory
}