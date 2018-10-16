const validator = require('validator');
const isEmpty = require('./isEmpty');

const validateRegisterInput = ({name, email, password, password2}) => {
    let errors = {};
    // it wont be empty if the user didn't send it
    name = !isEmpty(name) ? name : "";
    email = !isEmpty(email) ? email : "";
    password = !isEmpty(password) ? password : "";
    password2 = !isEmpty(password2) ? password2 : "";
    // name validations

    if (validator.isEmpty(name)) {
        errors.name = "name cannot be blank";
    } else if (!validator.isLength(name, {min: 5, max: 30})) {
        errors.name = "Name must be between 5 to 30 characters";
    }
    // email validation
    if (validator.isEmpty(email)) {
        errors.email = "email cannot be blank";
    } else if (!validator.isEmail(email)) {
        errors.email = "Email isn't valid";
    }
    // password
    if (validator.isEmpty(password)) {
        errors.password = "password cannot be blank";
    } else if (!validator.isLength(password, {min: 6, max: 30})) {
        errors.password = "Name must be between 6 to 30 characters";
    }
    // password 2
    if (validator.isEmpty(password2)) {
        errors.password2 = "confirm password is required";
    } else if (!validator.equals(password2, password)) {
        errors.password2 = "confirm password don't match password";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}
module.exports = validateRegisterInput;