const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = ({text}) => {
    let errors = {};
    // it wont be empty if the user didn't send it
    text = !isEmpty(text) ? text : "";


    // text validation
    if (validator.isEmpty(text)) {
        errors.text = "text field cannot be blank";
    } else if (!validator.isLength(text, {min: 10, max: 300})) {
        errors.text = "Post must be between 10 and 300 characters";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
