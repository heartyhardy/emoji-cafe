
const _ = require('lodash');

/*
    Validates a new product entry in server side
*/
const isValidProduct = (product, result) => {
    if(
       !_.isNull(isAlphaWithSpaces(product.title)) &&
       !_.isNull(isAlphaNumericExt(product.description)) &&
       !_.isNull(isNumeric(product.category)) &&
       !_.isNull(isCurrency(product.price)) &&
       !_.isNull(isSymbol(product.img))
    )
    {
        result(true);
    }
    else
    {
        result(false);
    }
}

/*
    Validates a new category in server side
*/
const isValidCategory = (category, result) => {
    if(
        !_.isNull(isAlphaWithSpaces(category.name))
    )
    {
        result(true);
    }
    else
    {
        result(false);
    }
}

const isValidUser = (user, result) => {
    if(
        !_.isNull(isEmail(user.email)) &&
        !_.isNull(isPassword(user.password))
    )
    {
        result(true);
    }
    else
    {
        result(false);
    }
}

/*
    matches a string that starts with an alpha which can contain following spaces
    max len 1, 25, 1
*/
const isAlphaWithSpaces = (str) => {
    const regex = /^[a-zA-Z]{1}[\w ]{1,25}[\w]{1}$/g;
    return str.match(regex);
}

/*
    matches a string that starts with an alpha, ends with alpha or a period,
    which can contain alphanumeric and commans inbetween.
    max len 1, 48, 1
*/
const isAlphaNumericExt = (str) => {
    const regex = /^[a-zA-Z]{1}[\w ,]{1,256}[\w.]{1}$/g;
    return str.match(regex);
}

/*
    matches a currency without a leading currency symbol. Must start and end with
    a numeric and can contain decimal symbol.
*/
const isCurrency = (str) => {
    const regex = /^[0-9]{0,}[.]{0,1}\d{1,2}$/g;
    return str.match(regex);
}

/*
    matches an int with 0-2 digits.
*/
const isNumeric = (str) => {
    const regex = /^\d{0,2}$/g;
    return str.match(regex);
}

/*
    matches a unicode character. note that this may not work in all cases.
*/
const isSymbol = (str) => {
    const regex = /^\W{0,2}$/g;
    return str.match(regex);
}

/*
    matches a valid email.
*/
const isEmail = (str) => {
    const regex = /^[a-zA-Z]{1}[a-zA-Z0-9]{2,63}[@]{1}[a-zA-Z]{1}[a-zA-Z0-9]{1,180}[.]{1}[a-zA-Z]{3,4}$/g;
    return str.match(regex);
}

/*
    matches a valid password.
    - length min-8 max-50
    - allowed - alphanumeric and underscore.
*/
const isPassword = (str) => {
    const regex = /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,50}$/g;
    return str.match(regex);
}

module.exports = {
    isValidProduct,
    isValidCategory,
    isValidUser
}