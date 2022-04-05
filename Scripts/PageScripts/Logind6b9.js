$('#Login').on('click', function () {
    submitLogin();
});

$('#Login').on('keyup', function (e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code === 13) {
        submitLogin();
    }
});

$('.enter-submit').on('keyup', function (e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code === 13) {
        submitLogin();
    }
});

function submitLogin() {
    if (validation.validateForm('#LoginForm')) {
        $('#LoginForm').submit();
    }
}