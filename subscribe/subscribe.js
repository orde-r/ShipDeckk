document.addEventListener('DOMContentLoaded', function() {
    // form
    const subscriptionForm = document.getElementById('subscriptionForm');
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const ageInput = document.getElementById('age');
    const interestsCheckboxes = document.querySelectorAll('input[name="interests"]');
    const termsCheckbox = document.getElementById('termsAgree');
    
    // error
    const fullNameError = document.getElementById('fullNameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const ageError = document.getElementById('ageError');
    const interestsError = document.getElementById('interestsError');
    const termsError = document.getElementById('termsError');
    
    // pw
    const strengthMeter = document.getElementById('strengthMeter');
    const strengthText = document.getElementById('strengthText');
    
    // modal
    const successModal = document.getElementById('successModal');
    const closeModal = document.querySelector('.close-modal');
    const modalCloseBtn = document.querySelector('.modal-btn');
    
    // pw visibility
    const togglePasswordBtn = document.getElementById('togglePassword');
    togglePasswordBtn.addEventListener('click', function() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            togglePasswordBtn.textContent = 'Hide';
        } else {
            passwordInput.type = 'password';
            togglePasswordBtn.textContent = 'Show';
        }
    });
    
    // pw strength
    passwordInput.addEventListener('input', checkPasswordStrength);
    
    function checkPasswordStrength() {
        const password = passwordInput.value;
        let strength = 0;
        let feedback = '';
        
        if (password.length >= 8) {
            strength += 60;
        }
        if (password.length >= 16) {
            strength += 60;
        }
        
        let hasLowercase = false;
        for (let i = 0; i < password.length; i++) {
            const char = password.charAt(i);
            if (char >= 'a' && char <= 'z') {
                hasLowercase = true;
                break;
            }
        }
        if (hasLowercase) {
            strength += 25;
        }
        
        let hasUppercase = false;
        for (let i = 0; i < password.length; i++) {
            const char = password.charAt(i);
            if (char >= 'A' && char <= 'Z') {
                hasUppercase = true;
                break;
            }
        }
        if (hasUppercase) {
            strength += 25;
        }
        
        const specialChars = "0123456789!@#$%^&*()_+-=[]{};\':\"\\|,.<>/?";
        let hasSpecial = false;
        for (let i = 0; i < password.length; i++) {
            if (specialChars.indexOf(password.charAt(i)) !== -1) {
                hasSpecial = true;
                break;
            }
        }


        if (hasSpecial) {
            strength += 25;
        }
        if (strength >= 100) {
            strength = 100;
        }
        strengthMeter.style.width = strength + '%';
        
        if (strength === 0) {
            strengthMeter.style.backgroundColor = '#eee';
            feedback = 'Password strength';
        } else if (strength <= 25) {
            strengthMeter.style.backgroundColor = '#f44336'; // Red
            feedback = 'Weak';
        } else if (strength <= 50) {
            strengthMeter.style.backgroundColor = '#ff9800'; // Orange
            feedback = 'Fair';
        } else if (strength <= 75) {
            strengthMeter.style.backgroundColor = '#ffc107'; // Yellow
            feedback = 'Good';
        } else {
            strengthMeter.style.backgroundColor = '#4caf50'; // Green
            feedback = 'Strong';
        }
        
        strengthText.textContent = feedback;
    }
    
    // validate
    subscriptionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // reset error msg
        resetErrors();
        
        // name
        if (!fullNameInput.value.trim()) {
            showError(fullNameError, 'Please enter your full name');
            isValid = false;
        } else if (fullNameInput.value.trim().length < 2) {
            showError(fullNameError, 'Name must be at least 2 characters');
            isValid = false;
        }
        
        // email
        if (!emailInput.value.trim()) {
            showError(emailError, 'Please enter your email address');
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            showError(emailError, 'Please enter a valid email address');
            isValid = false;
        }
        
        // pw
        if (!passwordInput.value) {
            showError(passwordError, 'Please create a password');
            isValid = false;
        } else if (passwordInput.value.length < 8) {
            showError(passwordError, 'Password must be at least 8 characters long');
            isValid = false;
        } else {

            let hasLowercase = false;
            for (let i = 0; i < passwordInput.value.length; i++) {
                const char = passwordInput.value.charAt(i);
                if (char >= 'a' && char <= 'z') {
                    hasLowercase = true;
                    break;
                }
            }
            
            let hasUppercase = false;
            for (let i = 0; i < passwordInput.value.length; i++) {
                const char = passwordInput.value.charAt(i);
                if (char >= 'A' && char <= 'Z') {
                    hasUppercase = true;
                    break;
                }
            }
            
            const specialChars = "0123456789!@#$%^&*()_+-=[]{};\':\"\\|,.<>/?";
            let hasSpecial = false;
            for (let i = 0; i < passwordInput.value.length; i++) {
                if (specialChars.indexOf(passwordInput.value.charAt(i)) !== -1) {
                    hasSpecial = true;
                    break;
                }
            }
            
            if (!hasLowercase || !hasUppercase || !hasSpecial) {
                showError(passwordError, 'Password must contain lowercase, uppercase, and a number or special character');
                isValid = false;
            }
        }
        
        // age
        if (!ageInput.value) {
            showError(ageError, 'Please enter your age');
            isValid = false;
        } else if (isNaN(ageInput.value) || parseInt(ageInput.value) < 18) {
            showError(ageError, 'You must be at least 18 years old');
            isValid = false;
        }
        
        // interest
        let interestSelected = false;
        interestsCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                interestSelected = true;
            }
        });
        
        if (!interestSelected) {
            showError(interestsError, 'Please select at least one interest');
            isValid = false;
        }
        
        //  terms 
        if (!termsCheckbox.checked) {
            showError(termsError, 'You must agree to the Terms & Conditions');
            isValid = false;
        }
        
        // is valid, submit
        if (isValid) {

            console.log('Form submitted successfully');
            
            // success 
            successModal.style.display = 'block';
            
            // reset 
            subscriptionForm.reset();
            strengthMeter.style.width = '0%';
            strengthText.textContent = 'Password strength';
        }
    });
    
    // help
    function showError(element, message) {
        element.textContent = message;
    }
    
    function resetErrors() {
        fullNameError.textContent = '';
        emailError.textContent = '';
        passwordError.textContent = '';
        ageError.textContent = '';
        interestsError.textContent = '';
        termsError.textContent = '';
    }
    
    // email
    function isValidEmail(email) {

        if (!email) return false;
        
        // got @
        const atIndex = email.indexOf('@');
        if (atIndex <= 0) return false;
        
        // got dot
        const domainPart = email.substring(atIndex + 1);
        const dotIndex = domainPart.indexOf('.');
        
        // before after dot
        return dotIndex > 0 && dotIndex < domainPart.length - 1;
    }
    
    // modal
    closeModal.addEventListener('click', function() {
        successModal.style.display = 'none';
    });
    
    modalCloseBtn.addEventListener('click', function() {
        successModal.style.display = 'none';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === successModal) {
            successModal.style.display = 'none';
        }
    });
    
    // input
    const formInputs = document.querySelectorAll('.form-group input');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
});
