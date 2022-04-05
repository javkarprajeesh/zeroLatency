$('#ResetPassword').on('click', function () {
    if (validation.validateForm('#ResetPasswordForm')) {
        $('#ResetPasswordForm').submit();
    }
});