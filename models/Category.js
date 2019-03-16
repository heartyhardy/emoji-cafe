const uuid1 = require('uuid/v1');

const { isValidCategory } = require('../util/validation');

module.exports = class Category{

    constructor(
        name
    )
    {
        this._id = uuid1(),
        this.name = name
        this.isValid = false;

        isValidCategory(this, (result) => {
            if(!result)
            {
                this.isValid = false;
                throw "Invalid category";
            }
            else if(result)
            {
                this.isValid = true;
            }
        })
    }

    save(isSaved)
    {
        if(this.isValid)
        {
            const {isValid,...save_obj} = this;

        }
        else throw "Cannot save: Invalid category";
    }

    static fetch(categories)
    {
        
    }
}