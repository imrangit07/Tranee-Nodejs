const validator = require("validator");

function validateEmail(email)
{
    return validator.isEmail(email);
}

function validatePhoneNumber(mobile) {
    var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    return re.test(mobile);
}

module.exports ={
    validateEmail,
    validatePhoneNumber
}