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
        return new Promise((resolve, reject) => {
            return getRepository().get_all_tokens().then((data) => {
                if (!data) {
                    this.getTokens().push(...data);
                    resolve(this.getTokens());
                }
                else reject([]);
            }).catch(
                err => reject(err)
            )
        })
    }

    fetch_by_id(_id) {
        return new Promise((resolve, reject) => {
            return getRepository().get_tokens_by_id(_id).then((data) => {
                if (data) {
                    this.getTokens().length = 0;
                    this.getTokens().push(...data);
                    resolve(this.getTokens());
                }
                else reject([]);
            })
                .catch(err => reject(err))
        })
    }

    assign(_id) {
        //fetch a token if exists for the current user
        // if not generate
        return new Promise((resolve, reject) => {
            this.fetch_by_id(_id)
                .then(data => {
                    let access_tokens = data;
                    let decoded_token = null;
                    let error_type = null;

                    for (let user of access_tokens) {
                        for (let token of user.tokens) {
                            jwt.verify(token, SECRET_KEY, (err, decoded) => {
                                if (err) {
                                    error_type = err.name;
                                }
                                else decoded_token = decoded;
                            })
                        }
                    }
                    resolve();
                })
                .catch(err => reject(err));
        })
    }
}