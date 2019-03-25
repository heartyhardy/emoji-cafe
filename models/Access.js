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
    }

    save() {
        return new Promise((resolve, reject) => {
            let token = jwt.sign({
                user_id: this.user_id,
                role: this.role
            },
                SECRET_KEY,
                { expiresIn: 60 * 60, algorithm: 'HS256' }
            );
    
            this.tokens.push(token);
            const { role, ...save_obj } = this;
    
            getRepository().save_token(save_obj)
                .then(result => {
                    resolve(result);
                })
                .catch(err => reject(err));
        })
    }

    fetch() {
        return getRepository().get_all_tokens().then((data) => {
            return new Promise((resolve, reject) => {
                if (data) {
                    this.getTokens().push(...data);
                    resolve(this.getTokens());
                }

                else reject();
            })
        }).catch(console.log);
    }
}