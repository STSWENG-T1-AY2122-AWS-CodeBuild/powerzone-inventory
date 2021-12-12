const displayErrorMessage = function(field) {
    field.addClass('d-block');
}

const hideErrorMessage = function(field) {
    field.removeClass('d-block');
}

const enableButton = function(button) {
    button.prop('disabled', false);
}

const disableButton = function(button) {
    button.prop('disabled', true);
}

const isBlankField = function(field, trimmed) {
    if (trimmed) {
        return field.val().trim().length == 0;
    }

    return field.val().length == 0
}

export {
    displayErrorMessage,
    hideErrorMessage,
    enableButton,
    disableButton,
    isBlankField
};