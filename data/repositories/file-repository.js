const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const root_path  = require('../../util/path').root_path;

const db_path = path.join(root_path,process.env.FILE_DB_PATH);
const products_filename = db_path + ".prod.txt";
const categories_filename = db_path + ".cat.txt";
const users_filename = db_path + ".usr.txt";
const access_filename = db_path + ".tok.txt";

/*
    Save a new product
    -product = new product object
    -result(callback) = returns the status of the save operation {saved:true/false}
*/
const save_product = (product, result) => {

    if(_.isNull(product) || _.isUndefined(product)) 
        return result({saved:false});

    let products = [];

    fs.readFile(products_filename, (err, data) => {
        
        if(!err && data.byteLength > 0)
            products = JSON.parse(data);

        products.push(product);

        fs.writeFile(products_filename, JSON.stringify(products), (err) => {
            if(err)
                result({saved:false})
            else
                result({saved:true});
        })
    })
}

/*
    Get all products in db
    -result(callback) returns all items as a json array, ruturns [] otherwise.
*/
const get_all_products = (result) =>{
    let products =[];

    fs.readFile(products_filename, (err,data) => {
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

/*
    Save a new category
    -category = new category object
    -result(callback) = returns the status of the save operation {saved:true/false}
*/
const save_category = (category, result) => {
    if(_.isNull(category) || _.isUndefined(category))
        return result({saved:false});
    
    let categories = [];

    fs.readFile(categories_filename ,(err, data) => {

        if(!err && data.byteLength > 0)
            categories = JSON.parse(data);
        
        categories.push(category);

        fs.writeFile(categories_filename, JSON.stringify(categories), (err) => {
            if(err)
                result({saved:false});
            else
                result({saved:true});
        })
    })
}

/*
    Get all categories in db
    -result(callback) returns all items as a json array, ruturns [] otherwise.
*/
const get_all_categories = (result) => {
    let categories = [];

    fs.readFile(categories_filename, (err, data) => {
        if(err)
            return result([]);
        if(data.byteLength > 0)
        {
            categories = JSON.parse(data);
            result(categories);
        }
        else result([]);
    })
}

/*
    Register a new user
    -user = new user object
    -result(callback) = returns the status of the save operation {saved:true/false}
*/
const save_user = (user, result) => {
    if(_.isNull(user) || _.isUndefined(user))
        return result({saved: false});

    let users = [];

    fs.readFile(users_filename, (err, data) => {
        if(!err && data.byteLength > 0)
            users = JSON.parse(data);
        
        users.push(user);

        fs.writeFile(users_filename, JSON.stringify(users), (err) => {
            if(err)
                result({saved:false});
            else
                result({saved:true});
        })
    })    
}

/*
    Get all users in db
    -result(callback) returns all items as a json array, ruturns [] otherwise.
*/
const get_all_users = (result) => {
    let users = [];

    fs.readFile(users_filename, (err, data) => {
        if(err)
            return result([]);
        if(data.byteLength > 0)
        {
            users = JSON.parse(data);
            result(users);
        }
        else result([]);
    })
}

/*
    Save an access token in the db
*/
const save_token = (access, result) => {
    if(_.isNull(access) || _.isUndefined(access))
    return result({saved: false});

    let access_data = [];

    fs.readFile(access_filename, (err, data) => {
        if(!err && data.byteLength > 0)
            access_data = JSON.parse(data);

        access_data.push(access);

        fs.writeFile(access_filename, JSON.stringify(access_data), err => {
            if(err)
                result({saved:false});
            else
                result({saved:true});
        })

    })
}

/*
    Remove a token by userId
*/
const remove_token = (access, token_index, result) => {
    let access_data = [];

    fs.readFile(access_filename, (err, data) => {
        if(!err && data.byteLength > 0)
            access_data = JSON.parse(data);

        let user_tokens = access_data.find(user_access => user_access.user_id === access.user_id).tokens;
        user_tokens.splice(index,1);

        access_data.splice(
            access_data.findIndex(user_access => user_access.user_id === access.user_id),
            1
            );

        fs.writeFile(access_filename, JSON.stringify(access_data), err => {
            if(err)
                result({deleted:false});
            else
                result({deleted:true});
        })
    })
}

/*
    Get all access tokens in the db
*/
const get_all_tokens = (user_id, result) => {
    let tokens = [];
    let user_tokens = [];

    fs.readFile(access_filename, (err, data) => {
        if(err)
            return result([]);
        if(data.byteLength > 0)
        {
            tokens = JSON.parse(data);
            user_tokens = tokens.find(token => token.user_id === user_id);
            result(user_tokens);
        }
        else result([]);
    })
}


module.exports = {
    save_product,
    save_category,
    save_user,
    save_token,
    get_all_products,
    get_all_categories,
    get_all_users,
    get_all_tokens,
    remove_token,
}

