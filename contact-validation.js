document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const recaptchaError = document.getElementById('recaptcha-error');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        let isValid = true;

        // Clear previous error messages
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

        // Validate name
        if (nameInput.value.trim() === '') {
            isValid = false;
            document.getElementById('name-error').textContent = 'Name is required.';
            nameInput.classList.add('error');
        } else {
            nameInput.classList.remove('error');
        }

        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value.trim())) {
            isValid = false;
            document.getElementById('email-error').textContent = 'Enter a valid email address.';
            emailInput.classList.add('error');
        } else {
            emailInput.classList.remove('error');
        }

        // Validate message
        if (messageInput.value.trim() === '') {
            isValid = false;
            document.getElementById('message-error').textContent = 'Message is required.';
            messageInput.classList.add('error');
        } else {
            messageInput.classList.remove('error');
        }

        // Validate reCAPTCHA
        const recaptchaResponse = grecaptcha.getResponse();
        if (recaptchaResponse.length === 0) {
            isValid = false;
            recaptchaError.textContent = 'Please complete the CAPTCHA.';
        } else {
            recaptchaError.textContent = '';
        }

        if (isValid) {
            // Submit the form
            form.submit();
        }
    });
});
