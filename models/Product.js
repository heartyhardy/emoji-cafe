const uuid1 = require('uuid/v1');

const { getRepository } = require('../util/repository-config');
const { isValidProduct } = require('../util/validation');

module. exports = class User{
    
    constructor(
            title,
            description,
            category,
            price,
            img
        )
        {
            this._id = uuid1();
            this.title = title;
            this.description = description;
            this.category = category;
            this.price = price;
            this.img = img;
            this.isValid= false;

            isValidProduct(this, (result) => {
                if(!result)
                {
                    this.isValid = false;
                    throw "Invalid product";
                }
                else if(result)
                    this.isValid = true;
            })
        }

    save(isSaved)
    {
        if(this.isValid)
        {
            // Omit the validation property through object rest operator
            const {isValid,...save_obj} = this;
            getRepository().save_product(save_obj, (result) => {
                isSaved(result);
            });
        }
        else throw "Cannot save: Invalid product";
    }

    static fetch(products)
    {
        getRepository().get_all_products(result => {
            products(result);
        })
    } 
}