
//Cross Site Request Forgery protection
function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", Cookies.get('csrftoken'));
        }
    }
});



function request(validate_url, is_email, str, icon) {
    $.ajax({
        url: validate_url,
        type: 'POST',
        data:{
            isEmail: is_email,
            value: str
        },
        dataType: 'json',
        success: function (data) {
            if(data['available']){
                icon.css('visibility', 'visible');
            } else {
                icon.css('visibility', 'hidden');
            }

        }
    });
}

function validate_username() {
    let username_input = $('#id_username')
    let url = username_input.attr('data-validate-url')
    request(url, false, username_input.val(), $('#i_username'));
    username_input.change(function () {
        request(url, false, $(this).val(), $('#i_username'));
    });
}

function validate_email() {
    let email_input = $('#id_email')
    let url = email_input.attr('data-validate-url')
    request(url, true, email_input.val(), $('#i_email'));
    email_input.change(function () {
        request(url, true, $(this).val(), $('#i_email'));
    });
}