/* JavaScript file for handling the front end of the log in page */
$(function() {
    $('.status-account-btn').on('click', function(e) {
        $('#status-div').removeClass('d-none');
        $('#status-div').addClass('d-inline');  
        //$('body').addClass('blur');
       // $('#status-div').addClass('blur');
    });

	$('.close-status-btn').on('click', function(e) {
        $('#status-div').addClass('d-none');
        $('#status-div').removeClass('d-inline');
      //  $('body').removeClass('blur');
       // $('#status-div').removeClass('remove-blur');
    });
});
