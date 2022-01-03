const isPasswordLengthValid = function(password) {
    return password.length >= 12;
}

const isPasswordFormatValid = function(password) {
    const format = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^()|{}\[\]:;\"<>'`#,./~\\+=-])[A-Za-z\d@$!%*?&^()|{}\[\]:;\"<>'`#,./~\\+=-]/;
    return format.test(password);
}

const isUsernameLengthValid = function(username) {
    return username.trim().length >= 1;
}

const arePasswordsMatching = function(password, confirmPassword) {
    return password === confirmPassword;
}

export {
    isPasswordLengthValid,
    isPasswordFormatValid,
    isUsernameLengthValid,
    arePasswordsMatching
};