const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const root_path  = require('../../util/path').root_path;

const db_path = path.join(root_path,process.env.FILE_DB_PATH);


/*
    Save a new product
    -product = new product object
    -result(callback) = returns the status of the save operation {saved:true/false}
*/
const save_product = (product, result) => {

    if(_.isNull(product) || _.isUndefined(product)) 
        return result({saved:false});

    let products = [];

    fs.readFile(db_path, (err, data) => {
        
        if(!err && data.byteLength > 0)
            products = JSON.parse(data);

        products.push(product);

        fs.writeFile(db_path, JSON.stringify(products), (err) => {
            if(err)
                result({saved:false})
            else
                result({saved:true});
        })
    })
}

/*
    Get all product in db
    -result(callback) returns all items as a json array, ruturns [] otherwise.
*/
const get_all_products = (result) =>{
    let products =[];

    fs.readFile(db_path, (err,data) => {
        if(err)
            return result([]);
        if(data.byteLength > 0)
        {
            products = JSON.parse(data);
            result(products);            
        }
        else result([]);
    })
}

module.exports = {
    save_product,
    get_all_products
}

