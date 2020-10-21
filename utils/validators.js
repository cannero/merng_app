const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const validateUsernamePwd = (username, password) => {
    const errors = {};
    if(username.trim() === ''){
        errors.username = 'username must not be empty';
    }
    if(password === ''){
        errors.password = 'no password';
    }
    return errors;
};

module.exports.validateRegisterInput = (
    username,
    email,
    password,
    confirmPassword
) => {
    const errors = validateUsernamePwd(username, password);
    if(email.trim() === ''){
        errors.email = 'email must not be empty';
    } else if (!email.match(emailRegex)) {
        errors.email = 'not a valid email';
    }

    if(password !== confirmPassword){
        errors.password = 'no password or not matching';
    }

    return {
        errors,
        valid: Object.keys(errors).length === 0
    }
};

module.exports.validateLogin = (
    username,
    password
) => {
    const errors = validateUsernamePwd(username, password);
    return {
        errors,
        valid: Object.keys(errors).length === 0
    }
}

