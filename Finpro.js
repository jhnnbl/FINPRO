$(document).ready(function () {
    $('#registrationForm').on('submit', function (e) {
        e.preventDefault();
        var name = $('#name').val();
        var email = $('#email').val();
        var phone = $('#phone').val();
        var eventSelect = $('#eventSelect').val();
        var isValid = true;

        // Bootstrap validation classes
        $('#registrationForm').addClass('was-validated');

        // Basic validation
        if (name.length < 3) {
            isValid = false;
        }

        if (!email.includes('@')) {
            isValid = false;
        }

        var phonePattern = /^08\d{8,12}$/;
        if (!phonePattern.test(phone)) {
            isValid = false;
        }

        if (isValid) {
            $.ajax({
                url: 'https://jsonplaceholder.typicode.com/posts',
                type: 'POST',
                data: JSON.stringify({
                    name: name,
                    email: email,
                    phone: phone,
                    event: eventSelect
                }),
                contentType: 'application/json; charset=UTF-8',
                success: function (response) {
                    alert('Registration successful!');
                    $('#registrationForm')[0].reset();
                    $('#registrationForm').removeClass('was-validated');
                    $('#formAlert').hide();
                },
                error: function (error) {
                    $('#formAlert').text('There was an error with your registration. Please try again.').show();
                }
            });
        } else {
            $('#formAlert').text('Please correct the errors in the form and try again.').show();
        }
    });
});
