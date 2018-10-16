const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = ({email, password}) => {
    let errors = {};
    // it wont be empty if the user didn't send it
    email = !isEmpty(email) ? email : "";
    password = !isEmpty(password) ? password : "";

    // email validation
    if (validator.isEmpty(email)) {
        errors.email = "email cannot be blank";
    } else if (!validator.isEmail(email)) {
        errors.email = "Email isn't valid";
    }
    // password
    if (validator.isEmpty(password)) {
        errors.password = "password cannot be blank";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}
