const uuid1 = require('uuid/v1');
const bcrypt = require('bcryptjs');

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

    async save(isSaved)
    {
        if(this.isValid)
        {
            this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(10));

            const {isValid,...save_obj} = this;
            getRepository().save_user(save_obj, (result) => {
                isSaved(result);
            })
        }
        else throw "Cannot save: Invalid user registration";
    }

    static fetch(users)
    {
        getRepository().get_all_users(result => users(result));
    }

    static signIn(email, pass)
    {
        getRepository().get_all_users(result => {
            
        })
    }
}