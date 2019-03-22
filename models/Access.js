const uuidv1 = require('uuid/v1');
const jwt = require('jsonwebtoken');

const { getRepository } = require('../util/repository-config');

const SECRET_KEY = process.env.AUTH_SALT;

module.exports = class Access {
    constructor(
        user_id,
        access_type
    ) {
        this.tokens = {
            token_list: [],
            addToken(token){
                this.token_list.push(token);
            },
            getTokens(){
                return this.token_list;
            }
        };
        this.user_id = user_id;
        this.access_type = access_type;

        this.isTokenRequired((result) => {

            if (result === -2) {

                let token = jwt.sign({
                    user_id: this.user_id,
                    access_type: this.access_type
                },
                    SECRET_KEY,
                    { expiresIn: 60 * 60, algorithm: 'HS256' }
                );

                this.tokens.addToken(token);

                const {...save_obj} = this;

                getRepository().save_token(save_obj, isSaved => {
                    console.log(isSaved);
                })

            }
        })
    }

    getAllTokens() {
        getRepository().get_all_tokens(this.user_id, (tokens) => {
            this.tokens = tokens;
        })
    }

    isTokenRequired(result){
        let decoded;
        let expired_index = -1;
        this.getAllTokens();

        if (this.tokens.getTokens().length <= 0)
            return result(-2);

        this.tokens.getTokens().forEach((token, index) => {
            try {
                decoded = jwt.verify(token, SECRET_KEY);
            }
            catch (e) {
                expired_index = index;
            }
        });

        result(expired_index);
    }
}