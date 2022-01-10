const isValidPhoneNumber = function(phoneNumber) {
    if (phoneNumber.length < 7 || phoneNumber.length > 15) {
        return false;
    }

    return true;
}

export {isValidPhoneNumber};