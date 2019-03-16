const uuid1 = require('uuid/v1');

const { getRepository } = require('../util/repository-config');
const { isValidUser } = require('../util/validation');

module.exports = class User{
    
    constructor(
        email,
        password
    )
    {
        this._id = uuid1();
        this.email = email;
        this.password = password;
        this.isValid = false;

        isValidUser(this, (result) => {
            if(!result)
            {
                this.isValid = false;
                throw "Invalid user registration";
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
            
        }
        else throw "Cannot save: Invalid user registration";
    }
}