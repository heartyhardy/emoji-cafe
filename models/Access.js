const uuidv1 = require('uuid/v1');
const jwt = require('jsonwebtoken');

const { getRepository } = require('../util/repository-config');

const SECRET_KEY = process.env.AUTH_SALT;

module.exports = class Access {
    constructor(
        user_id,
        role,
        tokens = []
    ) {
        this.user_id = user_id;
        this.role = role;
        this.tokens = tokens;
        this.getTokens = function () {
            return this.tokens;
        }
        this.saveToken = function () {
            this.fetch().then(data => {
                console.log(this.tokens);
            })
        }
    }

    fetch() {
        return getRepository().get_all_tokens().then((data) => {
            return new Promise((resolve, reject) => {
                if (data)
                {
                    this.getTokens().push(...data);
                    resolve(this.getTokens());
                }
                    
                else reject();
            })
        }).catch(console.log);
    }

    
}