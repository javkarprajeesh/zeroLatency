$('#RegisterButton').on('click', function () {
    if (validation.validateForm('#RegisterForm')) {
        if ($('#Password').val() === $('#RepeatPassword').val()) {
            $('#PasswordsDoNotMatch').hide();
            $('#RegisterForm').submit();
        }
        else {
            $('#PasswordsDoNotMatch').show();
        }
    }
});