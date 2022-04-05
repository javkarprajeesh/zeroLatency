$('.scroll-next').on('click', function () {
    $('html, body').animate({ scrollTop: $('.intro-section').height() }, 400);
});

var enquiry = EnquiryForm('EnquiryForm');

function submitEnquiry(token) {
    enquiry.submitForm(token);
};