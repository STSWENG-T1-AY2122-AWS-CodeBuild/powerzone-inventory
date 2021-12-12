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

export {
    displayErrorMessage,
    hideErrorMessage,
    enableButton,
    disableButton
};