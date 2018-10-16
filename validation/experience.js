const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = ({
                      title,
                      company,
                      location,
                      from,
                  }) => {
    let errors = {};
    // it wont be empty if the user didn't send it
    title = !isEmpty(title) ? title : "";
    company = !isEmpty(company) ? company : "";
    from = !isEmpty(from) ? from : "";

    // title validation
    if (validator.isEmpty(title)) {
        errors.title = "title cannot be blank";
    }

    // company validation
    if (validator.isEmpty(company)) {
        errors.company = "company field is required";
    }
    // title validation
    if (validator.isEmpty(from)) {
        errors.from = "from date field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
