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
                { expiresIn: 1 * 60, algorithm: 'HS256' }
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

    verify(_token) {
        return new Promise((resolve, reject) => {
            jwt.verify(_token, SECRET_KEY, (err, decoded_token) => {

                if (err) {
                    switch (err.name) {
                        case 'TokenExpiredError':
                            reject({ expired: true, error: true, decoded: null });
                            break;

                        case 'JsonWebTokenError':
                            reject({ expired: false, error: true, decoded: null });
                            break;

                        default:
                            reject({ expired: false, error: true, decoded: null });
                    }
                }
                else {
                    resolve({ expired: false, error: false, decoded: decoded_token });
                }
            })
        })
    }

    assign(_id) {
        //fetch a token if exists for the current user
        // if not generate
        return new Promise((resolve, reject) => {
            this.fetch_by_id(_id)
                .then(data => {
                    let access_tokens = data;
                    let payload = null;

                    for (let user of access_tokens) {
                        for (let token of user.tokens) {
                            (async () => {
                                try {
                                    payload = await this.verify(token);
                                    resolve({payload});
                                }
                                catch (e) {
                                    payload = e;

                                    if(payload.expired)
                                    {
                                        reject({error:"expired"});
                                    }
                                    else
                                    {
                                        reject({error:"invalidToken"});
                                    }
                                    
                                }
                            })();
                        }
                    }
                })
                .catch(err => reject(err));
        })
    }

    clean()
    {
        // clean up expired tokens
    }

}