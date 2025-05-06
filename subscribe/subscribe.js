document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const subscriptionForm = document.getElementById('subscriptionForm');
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const ageInput = document.getElementById('age');
    const interestsCheckboxes = document.querySelectorAll('input[name="interests"]');
    const termsCheckbox = document.getElementById('termsAgree');
    
    // Error message elements
    const fullNameError = document.getElementById('fullNameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const ageError = document.getElementById('ageError');
    const interestsError = document.getElementById('interestsError');
    const termsError = document.getElementById('termsError');
    
    // Password strength elements
    const strengthMeter = document.getElementById('strengthMeter');
    const strengthText = document.getElementById('strengthText');
    
    // Modal elements
    const successModal = document.getElementById('successModal');
    const closeModal = document.querySelector('.close-modal');
    const modalCloseBtn = document.querySelector('.modal-btn');
    
    // Toggle password visibility
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
    
    // Password strength meter
    passwordInput.addEventListener('input', checkPasswordStrength);
    
    function checkPasswordStrength() {
        const password = passwordInput.value;
        let strength = 0;
        let feedback = '';
        
        // Length check
        if (password.length >= 8) {
            strength += 25;
        }
        
        // Contains lowercase letters
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
        
        // Contains uppercase letters
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
        
        // Contains numbers or special characters
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
        
        // Update strength meter and text
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
    
    // Form validation
    subscriptionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Reset error messages
        resetErrors();
        
        // Validate full name
        if (!fullNameInput.value.trim()) {
            showError(fullNameError, 'Please enter your full name');
            isValid = false;
        } else if (fullNameInput.value.trim().length < 2) {
            showError(fullNameError, 'Name must be at least 2 characters');
            isValid = false;
        }
        
        // Validate email
        if (!emailInput.value.trim()) {
            showError(emailError, 'Please enter your email address');
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            showError(emailError, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate password
        if (!passwordInput.value) {
            showError(passwordError, 'Please create a password');
            isValid = false;
        } else if (passwordInput.value.length < 8) {
            showError(passwordError, 'Password must be at least 8 characters long');
            isValid = false;
        } else {
            // Check for lowercase
            let hasLowercase = false;
            for (let i = 0; i < passwordInput.value.length; i++) {
                const char = passwordInput.value.charAt(i);
                if (char >= 'a' && char <= 'z') {
                    hasLowercase = true;
                    break;
                }
            }
            
            // Check for uppercase
            let hasUppercase = false;
            for (let i = 0; i < passwordInput.value.length; i++) {
                const char = passwordInput.value.charAt(i);
                if (char >= 'A' && char <= 'Z') {
                    hasUppercase = true;
                    break;
                }
            }
            
            // Check for special characters or numbers
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
        
        // Validate age
        if (!ageInput.value) {
            showError(ageError, 'Please enter your age');
            isValid = false;
        } else if (isNaN(ageInput.value) || parseInt(ageInput.value) < 18) {
            showError(ageError, 'You must be at least 18 years old');
            isValid = false;
        }
        
        // Validate interests
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
        
        // Validate terms agreement
        if (!termsCheckbox.checked) {
            showError(termsError, 'You must agree to the Terms & Conditions');
            isValid = false;
        }
        
        // If form is valid, submit
        if (isValid) {
            // In a real application, you would send form data to server here
            console.log('Form submitted successfully');
            
            // Show success modal
            successModal.style.display = 'block';
            
            // Reset form
            subscriptionForm.reset();
            strengthMeter.style.width = '0%';
            strengthText.textContent = 'Password strength';
        }
    });
    
    // Helper functions
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
    
    function isValidEmail(email) {
        // Simple email validation without regex
        if (!email) return false;
        
        // Check for @ symbol
        const atIndex = email.indexOf('@');
        if (atIndex <= 0) return false;
        
        // Check for domain with at least one dot
        const domainPart = email.substring(atIndex + 1);
        const dotIndex = domainPart.indexOf('.');
        
        // Must have characters before and after the dot in the domain
        return dotIndex > 0 && dotIndex < domainPart.length - 1;
    }
    
    // Modal functionality
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
    
    // Input field focus/blur effects
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






































/*

// subscribe.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("subscriptionForm");
  const fullName = document.getElementById("fullName");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const age = document.getElementById("age");
  const interests = document.querySelectorAll('input[name="interests"]');
  const termsAgree = document.getElementById("termsAgree");

  const fullNameError = document.getElementById("fullNameError");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const ageError = document.getElementById("ageError");
  const interestsError = document.getElementById("interestsError");
  const termsError = document.getElementById("termsError");

  const togglePassword = document.getElementById("togglePassword");
  const strengthMeter = document.getElementById("strengthMeter");
  const strengthText = document.getElementById("strengthText");

  const modal = document.getElementById("successModal");
  const closeModal = modal.querySelector(".close-modal");
  const modalBtn = modal.querySelector(".modal-btn");

  // Show/Hide Password
  togglePassword.addEventListener("click", () => {
    password.type = password.type === "password" ? "text" : "password";
    togglePassword.textContent = password.type === "password" ? "Show" : "Hide";
  });

  // Password Strength Check
  password.addEventListener("input", () => {
    const val = password.value;
    let strength = 0;
    if (val.length >= 8) strength++;
    if (/[A-Z]/.test(val)) strength++;
    if (/[0-9]/.test(val)) strength++;
    if (/[^A-Za-z0-9]/.test(val)) strength++;

    const colors = ["#e74c3c", "#f39c12", "#2ecc71"];
    const widths = ["25%", "50%", "100%"];
    strengthMeter.style.width = widths[strength - 1] || "0";
    strengthMeter.style.backgroundColor = colors[strength - 1] || "#eee";

    const strengthLabels = ["Weak", "Moderate", "Strong"];
    strengthText.textContent = strengthLabels[strength - 1] || "Too Short";
  });

  // Form Validation
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    // Reset errors
    fullNameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    ageError.textContent = "";
    interestsError.textContent = "";
    termsError.textContent = "";

    // Full Name
    if (!fullName.value.trim()) {
      fullNameError.textContent = "Full name is required.";
      isValid = false;
    }

    // Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
      emailError.textContent = "Enter a valid email.";
      isValid = false;
    }

    // Password
    if (password.value.length < 8) {
      passwordError.textContent = "Password must be at least 8 characters.";
      isValid = false;
    }

    // Age
    if (parseInt(age.value) < 18 || !age.value.trim()) {
      ageError.textContent = "You must be at least 18 years old.";
      isValid = false;
    }

    // Interests
    const selectedInterests = [...interests].some(checkbox => checkbox.checked);
    if (!selectedInterests) {
      interestsError.textContent = "Select at least one interest.";
      isValid = false;
    }

    // Terms Agreement
    if (!termsAgree.checked) {
      termsError.textContent = "You must agree to the terms.";
      isValid = false;
    }

    if (isValid) {
      modal.style.display = "block";
      form.reset();
      strengthMeter.style.width = "0";
      strengthText.textContent = "Password strength";
      togglePassword.textContent = "Show";
    }
  });

  // Modal Close
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modalBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });
});


*/
