/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/***is character validation***/
function isCharacter(event) {
    var regex = new RegExp("^[a-zA-Z ]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    // console.log(key);
    if (event.charCode != 0) {
        if (!regex.test(key)) {
            event.preventDefault();
            return false;
        }
    }
}
$(document).ready(function() {
    $(document).on('keyup', '.nameSpace', function(e) {
        var spaceRegex = /^[^-\s]+$/;
        var charRegex = /^[a-zA-Z. \s]+$/;
        var value = $(this).val();
        if (value.length <= 1) {
            if (!(value.match(spaceRegex))) {
                $(this).val(value.substring(0, value.length - 1));
            } else {
                if (!(value.match(charRegex))) {
                    $(this).val(value.substring(0, value.length - 1));
                }
            }
        } else {
            if (!(value.match(charRegex))) {
                //var newValue = value.replace(/[^a-z\d\s]+/gi, "");
                var newValue = value.replace(/[^a-z.\s]+/gi, "");
                value.replace(/[-]/g, '');
                $(this).val(newValue);
                // $(this).val( value.substring(0, value.length - 1) );
            }
        }
    });
});

/***is email validation***/
function isEmail(event) {
    var regex = new RegExp("^[a-zA-Z@-_0-9.]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    var charCodeForKey = event.charCode ? event.charCode : event.which;
    if (charCodeForKey == '94' || charCodeForKey == '92') {
        event.preventDefault();
        return false;
    } else if (event.charCode != 0) {
        if (!regex.test(key)) {
            event.preventDefault();
            return false;
        }
    }
}
$(document).on('keyup', '.email', function(e) {
    var spaceRegex = /^[^-\s]+$/;
    var charRegex = /^[a-zA-Z@-_0-9.]+$/;
    var value = $(this).val();
    if (value.length <= 1) {
        if (!(value.match(spaceRegex))) {
            $(this).val(value.substring(0, value.length - 1));
        } else {
            if (!(value.match(charRegex))) {
                $(this).val(value.substring(0, value.length - 1));
            } else {
                value.replace(/[\[\]\^']+/g, '');
                $(this).val(value);
            }
            $(this).val($(this).val().replace(/[\[\]\^']+/g, ''));
        }
    } else {
        if (!(value.match(charRegex))) {
            //var newValue = value.replace(/[^a-z\d\s]+/gi, "");
            var newValue = value.replace(/[^a-zA-Z@-_0-9.\s]+/gi, "");
            newValue.replace(/[-]/g, '');
            newValue.replace(/[^\w\s]/gi, '')
            $(this).val(newValue);
            // $(this).val( value.substring(0, value.length - 1) );
        } else {
            $(this).val($(this).val().replace(/[\[\]\^']+/g, ''));
        }
    }
});

/***is alphanum validation***/
function isAlphaNum(event) {
    var regex = new RegExp("^[a-zA-Z0-9_ ]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (event.charCode != 0) {
        if (!regex.test(key)) {
            event.preventDefault();
            return false;
        }
    }
}
$(document).ready(function() {
    $(document).on('keyup', '.alphanum', function(e) {
        var spaceRegex = /^[^-\s]+$/;
        var charRegex = /^[a-zA-Z0-9_\s]+$/;
        var value = $(this).val();
        // console.log(value);
        if (value.length <= 1) {
            if (!(value.match(spaceRegex))) {
                $(this).val(value.substring(0, value.length - 1));
            } else {
                if (!(value.match(charRegex))) {
                    $(this).val(value.substring(0, value.length - 1));
                }
            }
        } else {
            if (!(value.match(charRegex))) {
                //var newValue = value.replace(/[^a-z\d\s]+/gi, "");
                var newValue = value.replace(/[^a-z.\s]+/gi, "");
                value.replace(/[-]/g, '');
                $(this).val(newValue);
                // $(this).val( value.substring(0, value.length - 1) );
            }
        }
    });
});

/***is number validation***/
function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (event.charCode != 0) {
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
    }
    return true;
}
$(document).on('keyup', '.onlyNum', function(e) {
    var spaceRegex = /^[^-\s]+$/;
    var charRegex = /^[0-9]+$/;
    var value = $(this).val();
    if (value.length <= 1) {
        if (!(value.match(spaceRegex))) {
            $(this).val(value.substring(0, value.length - 1));
        } else {
            if (!(value.match(charRegex))) {
                $(this).val(value.substring(0, value.length - 1));
            }
        }
    } else {
        if (!(value.match(charRegex))) {
            value.substring(0, value.length - 1);
            var newValue = value.replace(/[^0-9]+/g, "");
            $(this).val(newValue);
        }
    }
});

/***is email validation***/
function isEmail(event) {
    var regex = new RegExp("^[a-zA-Z@-_0-9.]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (event.charCode != 0) {
        if (!regex.test(key)) {
            event.preventDefault();
            return false;
        }
    }
}
$(document).on('keyup', '.email', function(e) {
    var spaceRegex = /^[^-\s]+$/;
    var charRegex = /^[a-zA-Z@-_0-9.]+$/;
    var value = $(this).val();
    if (value.length <= 1) {
        if (!(value.match(spaceRegex))) {
            $(this).val(value.substring(0, value.length - 1));
        } else {
            if (!(value.match(charRegex))) {
                $(this).val(value.substring(0, value.length - 1));
            } else {
                value.replace(/[\[\]\^']+/g, '');
                $(this).val(value);
            }
            $(this).val($(this).val().replace(/[\[\]\^']+/g, ''));
        }
    } else {
        if (!(value.match(charRegex))) {
            //var newValue = value.replace(/[^a-z\d\s]+/gi, "");
            var newValue = value.replace(/[^a-zA-Z@-_0-9.]+/gi, "");
            newValue.replace(/[-]/g, '');
            newValue.replace(/[^\w\s]/gi, '')
            newValue.replace(/\s/g, '');
            $(this).val(newValue);
        } else {
            $(this).val($(this).val().replace(/[\[\]\^']+/g, ''));
        }
    }
});

/***is DOB validation***/
function isDob(event) {
    var regex = new RegExp("^[0-9\-]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (event.charCode != 0) {
        if (!regex.test(key)) {
            event.preventDefault();
            return false;
        }
    }
}
$(document).ready(function() {
    $(document).on('keyup', '.dobpattern', function(e) {
        var spaceRegex = /^[^-\s]+$/;
        var charRegex = /^[0-9\-]+$/;
        var value = $(this).val();
        // console.log(value);
        if (value.length <= 1) {
            if (!(value.match(spaceRegex))) {
                $(this).val(value.substring(0, value.length - 1));
            } else {
                if (!(value.match(charRegex))) {
                    $(this).val(value.substring(0, value.length - 1));
                }
            }
        } else {
            if (!(value.match(charRegex))) {
                //var newValue = value.replace(/[^a-z\d\s]+/gi, "");
                var newValue = value.replace(/[^0-9\-]+/gi, "");
                value.replace(/[-]/g, '');
                $(this).val(newValue);
                // $(this).val( value.substring(0, value.length - 1) );
            }
        }
    });
});

/**** SUBSCRIBE FORM ****/
$('.error-message-update, .subscribeSuccess, .subscribeFailure').hide();

$(document).on("click", ".subscribeFailure", function(){
    $('.subscribeSuccess, .subscribeFailure').hide();
    $('.newsletter-div .current').show();
    $(".field-error-update").removeClass('field-error-update ');
    $('.error-message-update').hide();
});

$(".requiredField.email").on("keyup", function(){
    $(".field-error-update").removeClass('field-error-update ');
    $('.error-message-update').hide();
    if($.trim($(this).val()) == ''){
        $(this).addClass('field-error-update');
        $(this).parent().find('.error-message-update.requiredEmail').show();
    }else{
        var emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if(!emailReg.test($.trim($(this).val()))) {
            $(this).addClass('field-error-update');
            $(this).parent().find('.error-message-update.invaliedEmail').show();
        }
    }
});

$('.subscribeClick').on('click', function () {
    $(".field-error-update").removeClass('field-error-update ');
    $('.error-message-update').hide();
    hasError = false;
    $('.newsletter-div .requiredField').each(function() {
            if($.trim($(this).val()) == '') {
                $(this).addClass('field-error-update');
                $(this).parent().find('.error-message-update.requiredEmail').show();
                hasError = true;
            }else if($(this).hasClass('mobilenumber')) {
                var mobileReg = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
                if(!mobileReg.test($.trim($(this).val()))) {
                    $(this).addClass('field-error-update');
                    $(this).parent().find('.error-message-update.invaliedMobile').show();
                    hasError = true;
                }
            }else if($(this).hasClass('email')) {
                var emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                if(!emailReg.test($.trim($(this).val()))) {
                    $(this).addClass('field-error-update');
                    $(this).parent().find('.error-message-update.invaliedEmail').show();
                    hasError = true;
                }
            }
        });
        if(hasError == false){
            $('.msgbox').html('Sending....Please wait!!!');
            var email = $('.newsletter-div #txtEmail').val();
            var data="Email="+email;

//            var formData = new FormData($(this)[0]);

            $.ajax({
                type: "post",
                crossDomain: "true",
                processData: false,
                url : "https://www.postboxcommunications.com/apps/Social/enquiry/zerolatencyvr/subscribe.php",
                data: data,
                beforeSend: function(){ },
                success: function(data){
                    //console.log(data);
                    if(data == 'success') {
                        $('.subscribeEmail').val('');
                        $('.subscribeSuccess').show();
                        $('.newsletter-div .current').hide();
                    }else{
                        $('.subscribeFailure').show();
                        $('.newsletter-div .current').hide();
                    }
                }
            });

        }

        return false;
});



/**** GET IN TOUCH FORM ****/
$('.error-message-update, .getintouchSuccess, .getintouchFailure').hide();

$(document).on("click", ".getintouchFailure", function(){
    $('.getintouchSuccess, .getintouchFailure').hide();
    $('.getInTouch-us .current').show();
    $(".field-error-update").removeClass('field-error-update ');
    $('.error-message-update').hide();
});

$(".requiredField.mobilenumber").on("keyup", function(){
    $(".field-error-update").removeClass('field-error-update ');
    $('.error-message-update').hide();
    if($.trim($(this).val()) == ''){
        $(this).addClass('field-error-update');
        $(this).parent().find('.error-message-update.requiredMob').show();
    }else{
        var mobileReg = /^[6-9]{1}[0-9]{9}$/;
        if(!mobileReg.test($.trim($(this).val()))) {
            $(this).addClass('field-error-update');
            $(this).parent().find('.error-message-update.invaliedMob').show();
        }
    }
});

$('.getintouchClick').on('click', function () {
    $(".field-error-update").removeClass('field-error-update ');
    $('.error-message-update').hide();
    hasError = false;
    $('.getInTouch-us .requiredField').each(function() {
        console.log("req click");
        if($.trim($(this).val()) == '') {
            $(this).addClass('field-error-update');
            $(this).parent().find('.error-message-update.requiredMob').show();
            hasError = true;
        }else if($(this).hasClass('mobilenumber')) {
            var mobileReg = /^[6-9]{1}[0-9]{9}$/;
            if(!mobileReg.test($.trim($(this).val()))) {
                $(this).addClass('field-error-update');
                $(this).parent().find('.error-message-update.invaliedMob').show();
                hasError = true;
            }
        }
    });
    if(hasError == false){
        $('.msgbox').html('Sending....Please wait!!!');
        var mobile = $('.getInTouch-us #txtMobile').val();
        var data="Mobile="+mobile;

    //            var formData = new FormData($(this)[0]);

        $.ajax({
            type: "post",
            crossDomain: "true",
            url : "getintouch.php",
            data: data,
            beforeSend: function(){ },
            success: function(data){
                if(data == 'success') {
                    $('.mobilenumber').val('');
                    $('.getintouchSuccess').show();
                    $('.getInTouch-us .current').hide();
                }else{
                    $('.getintouchFailure').show();
                    $('.getInTouch-us .current').hide();
                }
            }
        });

    }

    return false;
});




/**** TNC FORM ****/
$('.error-msg-tnc, .tncSuccess, .tncFailure').hide();

$(document).on("click", ".tncFailure", function(){
    $('.tncSuccess, .tncFailure').hide();
    $('.termsformB .current').show();
    $(".field-error-update").removeClass('field-error-update');
    $('.error-msg-tnc').hide();
});

$(".tncRequired.email").on("keyup", function(){
    $(".field-error-update").removeClass('field-error-update ');
    $(this).parents('li').find('.error-msg-tnc').hide();
    var label = $(this).attr("placeholder");
    if($.trim($(this).val()) == ''){
        $(this).addClass('field-error-update');
        $(this).parents('li').find('.error-msg-tnc.tnc-required').show().text("Please enter "+label);
    }else{
        var emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if(!emailReg.test($.trim($(this).val()))) {
            $(this).addClass('field-error-update');
            $(this).parents('li').find('.error-msg-tnc.tnc-invalid').show().text("Please enter valid "+label);
        }
    }
});

$(".tncRequired.onlyNum").on("keyup", function(){
    $(".field-error-update").removeClass('field-error-update ');
    $(this).parents('li').find('.error-msg-tnc').hide();
    var label = $(this).attr("placeholder");
    if($.trim($(this).val()) == ''){
        $(this).addClass('field-error-update');
        $(this).parents('li').find('.error-msg-tnc.tnc-required').show().text("Please enter "+label);
    }else{
        var emailReg = /^[6-9]{1}[0-9]{9}$/;
        if(!emailReg.test($.trim($(this).val()))) {
            $(this).addClass('field-error-update');
            $(this).parents('li').find('.error-msg-tnc.tnc-invalid').show().text("Please enter valid "+label);
        }
    }
});

$(".adps").on("keyup", function(){
    $(".field-error-update").removeClass('field-error-update ');
    $(this).parents('li').find('.error-msg-tnc').hide();
    var label = $(this).attr("placeholder");
    if($.trim($(this).val()) == ''){
        $(this).addClass('field-error-update');
        $(this).parents('li').find('.error-msg-tnc.tnc-required').show().text("Please enter "+label);
    }else{
        var dataLength = $.trim($(this).val()).length;
        if(dataLength !== 10 && dataLength !== 12) {
            $(this).addClass('field-error-update');
            $(this).parents('li').find('.error-msg-tnc.tnc-invalid').show().text("Please enter valid "+label);
        }
    }
});

$(".tncRequired.nameSpace").on("keyup", function(){
    $(".field-error-update").removeClass('field-error-update ');
    $(this).parents('li').find('.error-msg-tnc').hide();
    var label = $(this).attr("placeholder");
    if($.trim($(this).val()) == ''){
        $(this).addClass('field-error-update');
        $(this).parents('li').find('.error-msg-tnc.tnc-required').show().text("Please enter "+label);
    }
});

$(".tncRequired.dobpattern").on("keyup", function(){
    $(".field-error-update").removeClass('field-error-update ');
    $(this).parents('li').find('.error-msg-tnc').hide();
    var label = $(this).attr("placeholder");
    if($.trim($(this).val()) == ''){
        $(this).addClass('field-error-update');
        $(this).parents('li').find('.error-msg-tnc.tnc-required').show().text("Please enter "+label);
    }else{
        var dobReg = /^([0-9]{2})-([0-9]{2})-([0-9]{4})$/;
        if(!dobReg.test($.trim($(this).val()))) {
            $(this).addClass('field-error-update');
            $(this).parents('li').find('.error-msg-tnc.tnc-invalid').show().text("Please enter valid "+label);
        }
    }
});

$(".child-two").on("keyup", function(){
  if($.trim($(this).val()) == ''){
    $('.child-two').parents('li').find('.error-msg-tnc').hide();
    $('.child-two').removeClass('tncRequired');
  }else{
    $('.child-two').addClass('tncRequired');
  }
});

$('.tncClick').on('click', function () {
    $(".field-error-update").removeClass('field-error-update ');
    $('.error-msg-tnc').hide();
    hasError = false;
    $('#tncForm .tncRequired').each(function() {
        if($.trim($(this).val()) == '') {
              var label = $(this).attr("placeholder");
              $(this).addClass('field-error-update');
              $(this).parents('li').find('.error-msg-tnc.tnc-required').show().text("Please enter "+label);
              hasError = true;
        }else if($(this).hasClass('onlyNum')) {
            var label = $(this).attr("placeholder");
            var mobileReg = /^[6-9]{1}[0-9]{9}$/;
            if(!mobileReg.test($.trim($(this).val()))) {
                $(this).addClass('field-error-update');
                $(this).parents('li').find('.error-msg-tnc.tnc-invalid').show().text("Please enter valid "+label);
                hasError = true;
            }
        }else if($(this).hasClass('email')) {
            var label = $(this).attr("placeholder");
            var emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            if(!emailReg.test($.trim($(this).val()))) {
                $(this).addClass('field-error-update');
                $(this).parents('li').find('.error-msg-tnc.tnc-invalid').show().text("Please enter valid "+label);
                hasError = true;
            }
        }else if($(this).hasClass('adps')) {
              var label = $(this).attr("placeholder");
              var dataLength = $.trim($(this).val()).length;
              if(dataLength !== 10 && dataLength !== 12) {
                  $(this).addClass('field-error-update');
                  $(this).parents('li').find('.error-msg-tnc.tnc-invalid').show().text("Please enter valid "+label);
                  hasError = true;
              }
        }else if($(this).hasClass('dobpattern')) {
              var label = $(this).attr("placeholder");
              var dobReg = /^([0-9]{2})-([0-9]{2})-([0-9]{4})$/;
              if(!dobReg.test($.trim($(this).val()))) {
                  $(this).addClass('field-error-update');
                  $(this).parents('li').find('.error-msg-tnc.tnc-invalid').show().text("Please enter valid "+label);
                  hasError = true;
              }
        }else if($(this).hasClass('tnc-check')) {
              if(!$(this).is(":checked")) {
                  if($('.error-msg-tnc.tnc-chec-error').css("display") == 'none'){
                        $('.error-msg-tnc.tnc-chec-error').show();
                        hasError = true;
                    }
              };
        }
    });

    if($('.parent-dob').val() !== ""){
      if(getAge('.parent-dob') == false){
          $('.parent-dob').parents('li').find('.error-msg-tnc.tnc-age-limit').show().text("Age should be between 18 to 100 Years");
          hasError = true;
      }
    }

    if($('.child-Dob').val() !== ""){
      if(getAge('.child-Dob') == false){
          $('.child-Dob').parents('li').find('.error-msg-tnc.tnc-age-limit').show().text("Age should be between 13 to 17 Years");
          hasError = true;
      }else if(getAgeVal('.child-Dob') >= getAgeVal('.parent-dob')){
          $('.child-Dob').parents('li').find('.error-msg-tnc.tnc-age-limit').show().text("Child Age cannot be greater than Parent Age");
          hasError = true;
      }
    }

    if($('.child-Dob2').val() !== ""){
      if(getAge('.child-Dob2') == false){
          $('.child-Dob2').parents('li').find('.error-msg-tnc.tnc-age-limit').show().text("Age should be between 13 to 17 Years");
          hasError = true;
      }else if(getAgeVal('.child-Dob2') >= getAgeVal('.parent-dob')){
          $('.child-Dob2').parents('li').find('.error-msg-tnc.tnc-age-limit').show().text("Child Age cannot be greater than Parent Age");
          hasError = true;
      }
    }

    if(hasError == false){
        $('.msgbox').html('Sending....Please wait!!!');

       var formData = ($('#tncForm')).serialize();
       
       console.log("formData req : ", formData);
       
         $.ajax({
             type: "post",
             crossDomain: "true",
             processData: false,
             url : "tnc.php",
             data: formData,
             beforeSend: function(){ },
             success: function(data){
                 console.log("formData res : ",data);
                 if(data == 'success') {
//                     $('#tncForm').reset();
                     $('#tncForm').find("input[type=text], textarea").val("");
                     $('.tncSuccess').show();
                     $('#tncForm .current').hide();
                 }else{
                     $('.tncFailure').show();
                     $('#tncForm .current').hide();
                 }
             }
         });

    }

    return false;
});

function getAge(type){
  var dob = $(type).val();
  var now = new Date();
  var birthdate = dob.split("-");

  var newDate = birthdate[1] + "-" + birthdate[0] + "-" + birthdate[2]
  var born = new Date(newDate);
  age = get_age(born,now);

  console.log(age);

  if(type == '.parent-dob'){
    var minAgeLimit = 18;
    var maxAgeLimit = 100;
  }else {
    var minAgeLimit = 13;
    var maxAgeLimit = 17;
  }

  if (age < minAgeLimit || age > maxAgeLimit){
    return false;
  }
}

function get_age(born, now) {
  var birthday = new Date(now.getFullYear(), born.getMonth(), born.getDate());
  if (now >= birthday)
    return now.getFullYear() - born.getFullYear();
  else
    return now.getFullYear() - born.getFullYear() - 1;
}

function getAgeVal(type){
  var dob = $(type).val();
  var now = new Date();
  var birthdate = dob.split("-");

  var newDate = birthdate[1] + "-" + birthdate[0] + "-" + birthdate[2]
  var born = new Date(newDate);
  age = get_age(born,now);

  return age;
}
