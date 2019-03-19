
const User = require('../models/User');

const ShowUserRegistration = (req, res, next) => {
    res
        .status(200)
        .render('user/user-registration', {title: "Register"});
}

const RegisterUser = (req, res, next) => {

    try
    {
        const new_user = new User(
            req.body.user_email,
            req.body.user_password
        )
        
        new_user.save((isSaved) => {
            if(isSaved.saved)
            {
                res
                    .status(200)
                    .redirect('/');
            }
            else if(!isSaved.saved)
            {
                res
                    .status(400)
                    .render('error/400', {title:"Bad request"});
            }
        })
    }
    catch
    {
        res.status(400).render('error/400', {title:"Bad request"});
    } 

}

const ShowUserLogin = (req, res, next) => {
    res
        .status(200)
        .render('user/user-login', {title:"Sign in"});
}

const SignIn = (req, res, next) => {
    res
        .status(200)
        .redirect('/');
}

module.exports = {
    ShowUserRegistration,
    ShowUserLogin,
    RegisterUser,
    SignIn
}