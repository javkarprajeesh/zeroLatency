$('.scroll-next').on('click', function () {
    $('html, body').animate({ scrollTop: $('.intro-section').height() }, 400);
});

var totalGalleryItems = $('.gallery-items > div').length;

$('#GalleryPrev').on('click', function () {
    var $current = $('.gallery-items .active');
    var index = $current.data('index') - 1;
    if (index < 0) {
        index = totalGalleryItems - 1;
    }
    showGalleryImage(index);
});

$('#GalleryNext').on('click', function () {
    var $current = $('.gallery-items .active');
    var index = $current.data('index') + 1;
    if (index > totalGalleryItems - 1) {
        index = 0;
    }
    showGalleryImage(index);
});

function showGalleryImage(index) {
    $('.gallery-items [data-index]').removeClass('active');
    $('.gallery-items [data-index="' + index + '"]').addClass('active');
}

var enquiry = EnquiryForm('EnquiryForm');

$('#AtachmentButton').on('click', function () {
    $('#AttachmentDocument').click();
});

$('#AttachmentDocument').on('change', function () {
    var $this = $('#AttachmentDocument');

    var filePath = $this.val();
    var bits = filePath.split('\\');
    var filename = bits[bits.length - 1];

    var extensionBits = filename.toLowerCase().split('.');
    var extension = extensionBits[extensionBits.length - 1];

    $('#AtachmentButton').text(filename);
    $('#AtachmentButton').removeClass('error');
    var allowedExtensions = ['pdf', 'doc', 'docx'];

    if (allowedExtensions.indexOf(extension) === -1) {
        $('#AttachmentDocument').val(null);
        $('#AtachmentButton').text('Invalid file type \'' + extension + '\'');
        $('#AtachmentButton').addClass('error');
    }
});

function submitEnquiry(token) {
    $('#CareersForm').submit();
};

$('#SubmitEnquiry').on('click', function () {
    var self = {};
    self.id = "CareersForm";

    self.options = {};
    self.page = 0;
    self.path = [];
    self.$container = $('#' + self.id);
    self.successPage = self.$container.data('success');
    self.errorPage = self.$container.data('error');

    self.submitButton = $('#' + self.id + ' [data-submit]');
    self.formData = {};

    self.init = function () {
        // data-go will direct to specific page
        $('#' + self.id + ' [data-go]').on('click', function () {
            self.showPage($(this).data('go'));
        });

        // data-select-val will search for the first select in the article and use that value
        // to direct to the page with that value
        $('#' + self.id + ' [data-select-val]').on('click', function () {
            self.showPage($(this).closest('article').find('select').first().val());
        });

        // Submit inputs with name attribute to specified url
        $('#' + self.id + ' [data-submit]').on('click', function () {
            //console.log('Submit to: ' + $(this).data('submit'));

            var $article = $(this).closest('article');
            var $inputs = $('#' + self.id + ' [data-page=' + $article.data('page') + '] [name]');

            if (validation.validateForm('#' + self.id)) {
                self.formData = {};
                $inputs.each(function () {
                    var $input = $(this);
                    self.formData[$input.attr('name')] = $input.val();
                });

                //console.log(data);

//                grecaptcha.execute();
                self.submitForm();
            }
        });
    }

    self.showPage = function (page) {
        //console.log('show page: ' + page);
        $('#' + self.id + ' [data-page]').removeClass('current');
        $('#' + self.id + ' [data-page=' + page + ']').addClass('current');
        $('#' + self.id).trigger("reset");
        self.path.push(page);
        //console.log(self.path);
    }

    self.submitForm = function (token) {

//        self.formData['g-recaptcha-response'] = token;
        
//        console.log($(self.submitButton).data('submit'));
//        return false;

        self.formData = new FormData($('#career-form')[0]);
//        console.log(formData);

        self.$container.addClass('loading');
        $.ajax({
            method: 'post',
            crossDomain: "true",
            async: false,
            cache: false,
            contentType: false,
            enctype: 'multipart/form-data',
            processData: false,
            url: $(self.submitButton).data('submit'),
            data: self.formData
        }).done(function (data) {
            //console.log('Complete!');
//            if (self.options.completeUrl) {
//                console.log('Complete Url was provided! Redirecting to... ' + self.options.completeUrl);
//                window.location.replace(self.options.completeUrl, true);
//            }
//            else {
            console.log(data);
            if(data == "success"){
                if (self.successPage) {
                    self.showPage(self.successPage);
                }
                $('#' + self.id + ' input, #' + self.id + ' select, #' + self.id + ' textarea').val('');
            }
            else{
                if (self.errorPage) {
                    self.showPage(self.errorPage);
                }
            }
            
//            }
        }).fail(function () {
//                grecaptcha.reset();
            //console.log('Failed to send enquiry!');
            if (self.errorPage) {
                self.showPage(self.errorPage);
            }
        }).always(function () {
            if (!self.options.completeUrl) {
                self.$container.removeClass('loading');
            }
        });
    }

    self.init();
    return self;
});