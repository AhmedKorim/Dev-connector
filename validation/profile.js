const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = ({
                      handle,
                      company,
                      website,
                      location,
                      bio,
                      status,
                      githubUsername,
                      skills,
                      youtube,
                      twitter,
                      facebook,
                      instagram,
                  }) => {
    let errors = {};

    // it wont be empty if the user didn't send it
    handle = !isEmpty(handle) ? handle : "";
    company = !isEmpty(company) ? company : "";
    website = !isEmpty(website) ? website : "";
    status = !isEmpty(status) ? status : "";
    githubUsername = !isEmpty(githubUsername) ? githubUsername : "";
    youtube = !isEmpty(youtube) ? youtube : "";
    twitter = !isEmpty(twitter) ? twitter : "";
    facebook = !isEmpty(facebook) ? facebook : "";
    instagram = !isEmpty(instagram) ? instagram : "";
    skills = !isEmpty(skills) ? skills : "";
    //handle validation


    /*   if (validator.isEmpty(handle)) {
           errors.handle = "handle is required"
       } else if (validator.isLength({min: 2, max: 40})) {
           errors.handle = "handle should be batten 2 and 40 characters"
       }*/
    //company validation
    if (validator.isEmpty(handle)) {
        errors.handle = "handle cannot be empty"
    }


    //website validation

    if (!validator.isEmpty(website)) {
        if (!validator.isURL(website)) {
            errors.website = "please enter valid URL"
        }
    }

    //location validation

    //skills validation

    if (validator.isEmpty(skills)) {
        errors.skills = "skills is required"
    }
    //bio validation


    //status validation

    if (validator.isEmpty(status) || status == 0) {
        errors.status = "status is required"
    }

    //githubUsername validation
    if (!validator.isEmpty(githubUsername)) {
        if (!validator.isURL(githubUsername)) {
            errors.githubUsername = "please enter valid URL"
        }
    }
    //youtube validation
    if (!validator.isEmpty(youtube)) {
        if (!validator.isURL(youtube)) {
            errors.youtube = "please enter valid URL"
        }
    }
    //twitter validation
    if (!validator.isEmpty(twitter)) {
        if (!validator.isURL(twitter)) {
            errors.twitter = "please enter valid URL"
        }
    }

    //facebook validation
    if (!validator.isEmpty(facebook)) {
        if (!validator.isURL(facebook)) {
            errors.facebook = "please enter valid URL"
        }
    }

    //instagram validation
    if (!validator.isEmpty(instagram)) {
        if (!validator.isURL(instagram)) {
            errors.instagram = "please enter valid URL"
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
