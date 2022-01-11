/* JavaScript file for handling the front-end of the delivery page */

import {getStatusFromIcon} from './transaction-util.js';

import {extractId} from './general-util.js';

$(function() {
/* Update the details in the modal when the edit status button is clicked. */
    $('.edit-delivery-status').on('click', function() {
        const transactionId = extractId($(this).attr('id'));

        $('#edit-delivery-status-form-id').val(transactionId);
        $('#edit-delivery-status-form-status').val(getStatusFromIcon($('#status-img-' + transactionId).attr('src')));
        $('#edit-delivery-status-form-display-id').text($('#id-' + transactionId).text());
        $('#edit-delivery-status-form-customer').text($('#customer-' + transactionId).text());
    });
});