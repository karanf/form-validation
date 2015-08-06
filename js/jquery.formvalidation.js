function isValidEmail(email) {
    var emailRx = /^[\w\.-]+@[\w\.-]+\.\w+$/;
    return emailRx.test(email);
}
(function($) {
    $.fn.formValidation = function() {
        return this.each(function() {
            var $form = $(this),
                $status = $form.find('.status'),
                $name = $form.find('#name'),
                $message = $form.find('#message'),
                $email = $form.find('#email'),
                $spam = $form.find('#spam'),
                $reset = $form.find('input[type=reset]'),
                $fields = $form.find('input[type=text], textarea');
            var setError = function(errorMessage, $field) {
                    $status.html(errorMessage).slideDown(200);
                    $field.focus().addClass('error');
                }
                //Initialise
            $status.hide();
            $form.submit(function(e) {
                e.preventDefault();
                $fields.removeClass('error');
                if (!$name.val()) {
                    setError("Please enter your name", $name);
                } else if (!$email.val()) {
                    setError("Please enter your email address", $email);
                } else if (!isValidEmail($email.val())) {
                    setError("Please enter a valid email address", $email);
                } else if (!$message.val()) {
                    setError("Please enter your message", $message);
                } else if ($spam.val()) {
                    setError("Die you spamming bastard!", $spam);
                } else {
                    $status.html("Everything looks good!").slideDown(200);
                    //Send the email
                    var formData = $form.serialize();
                    $.post("send-mail.php", formData, function(sent) {
                        if (sent) {
                            $status.html("Thanks for the email " + $name.val() + "! I now have all your data and I am going to steal your identity. Muhahahahaha!!").slideDown(200);
                        } else {
                            $status.html("The email didn't go through. Obviously it was YOUR fault!!").slideDown(200);
                        }
                    }, "json");
                }
            });
            $reset.on('click', function() {
                $status.slideUp(200);
                $fields.removeClass('error');
            })
        });
    }
})(jQuery);