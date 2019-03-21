const uuidv1 = require('uuid/v1');
const jwt = require('jsonwebtoken');

const { getRepository } = require('../util/repository-config');

const SECRET_KEY = process.env.AUTH_SALT;

module.exports = class Access{
    constructor(
        user_id,
        access_type
    )
    {
        const getAllTokens = () => {
            getRepository().get_all_tokens((tokens) => {
                this.tokens = tokens;
            })
        }

        this.tokens = [];
        this.user_id = user_id;
        this.access_type = access_type;
        
        let token = jwt.sign({
            user_id: this.user_id,
            access_type: this.access_type
        },
         SECRET_KEY,
         { expiresIn: 60 * 60, algorithm: 'HS256' }
        );
    }
}