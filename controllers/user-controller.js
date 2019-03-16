
const ShowUserRegistration = (req, res, next) => {
    res
        .status(200)
        .render('user/user-registration', {title: "Register"});
}

const RegisterUser = (req, res, next) => {
    res
        .status(200)
        .redirect('/');
}
module.exports = {
    ShowUserRegistration,
    RegisterUser
}