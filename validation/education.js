const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = ({
                      school,
                      degree,
                      fieldOfStudy,
                      from,
                  }) => {
    let errors = {};
    // it wont be empty if the user didn't send it
    school = !isEmpty(school) ? school : "";
    degree = !isEmpty(degree) ? degree : "";
    fieldOfStudy = !isEmpty(fieldOfStudy) ? fieldOfStudy : "";
    from = !isEmpty(from) ? from : "";

    // school validation
    if (validator.isEmpty(school)) {
        errors.school = "school name cannot be blank";
    }

    // degree validation
    if (validator.isEmpty(degree)) {
        errors.degree = "degree field is required";
    }
    // fieldOfStudy validation
    if (validator.isEmpty(fieldOfStudy)) {
        errors.fieldOfStudy = "field of study field is required";
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
