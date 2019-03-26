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

    /*
        Used in assigning tokens
    */
    static verify(_token) {
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

    /*
        Used in cleaning expired tokens
    */
    static verify_ex(_token) {
        return new Promise((resolve, reject) => {
            jwt.verify(_token, SECRET_KEY, (err, decoded_token) => {

                if (err) {
                    switch (err.name) {
                        case 'TokenExpiredError':
                            resolve({ expired: true, error: true, decoded: null });
                            break;

                        case 'JsonWebTokenError':
                            resolve({ expired: false, error: true, decoded: null });
                            break;

                        default:
                            resolve({ expired: false, error: true, decoded: null });
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
                                    payload = await Access.verify(token);
                                    resolve({ payload });
                                }
                                catch (e) {
                                    payload = e;

                                    if (payload.expired) {
                                        reject({ error: "expired" });
                                    }
                                    else {
                                        reject({ error: "invalidToken" });
                                    }

                                }
                            })();
                        }
                    }
                })
                .catch(err => reject(err));
        })
    }

    /*
        Clean all expired and invalid tokens
    */
    static clean() {
        const get_tokens = async () => {
            return await getRepository().get_all_tokens();
        }

        const verify_all = async tokens => {
            const token_list = await get_tokens();

            let result = await verify_all_tokens(token_list);
            console.log(result);
            
        }

        const verify_token = async token => {
            return await Promise.all(token.map(async(t,i) => {
                let result = await this.verify_ex(t);
                if(result.err)
                    result.index = i;
                return result;
            }
            ));
        }

        const verify_all_tokens = async tokens => {
            return await Promise.all(tokens.map(async(u, i) => {
                let verified = await verify_token(u.tokens);
                let token_user = u;
                
                for(let err_token=0; err_token< verified.length; err_token++)
                {
                    if(verified[err_token].index != undefined)
                        token_user.tokens.splice(verified[err_token].index);
                }
                return token_user;
            }));
        }

        verify_all();
    }

}