const form = document.getElementById('signup-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const termsCheckbox = document.getElementById('terms');

const checkLength = document.getElementById('check-length');
const checkNumber = document.getElementById('check-number');
const checkSpecial = document.getElementById('check-special');

const successBanner = document.getElementById('success-banner');

function validateRequired(value) {
    return value.trim() !== '';
}

function validateEmailFormat(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function checkPasswordStrength(password) {
    const hasMinLength = password.length >= 8;
    const hasDigit = /\d/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    
    if (hasMinLength) {
        checkLength.classList.add('met');
    } else {
        checkLength.classList.remove('met');
    }
    
    if (hasDigit) {
        checkNumber.classList.add('met');
    } else {
        checkNumber.classList.remove('met');
    }
    
    if (hasSpecial) {
        checkSpecial.classList.add('met');
    } else {
        checkSpecial.classList.remove('met');
    }
    
    return hasMinLength && hasDigit && hasSpecial;
}

passwordInput.addEventListener('input', () => {
    checkPasswordStrength(passwordInput.value);
});

function setError(inputElement, groupElement, errorMessage) {
    const errorSpan = groupElement.querySelector('.error-message');
    if (errorSpan) {
        errorSpan.textContent = errorMessage;
    }
    groupElement.classList.add('invalid');
}

function clearError(groupElement) {
    groupElement.classList.remove('invalid');
    const errorSpan = groupElement.querySelector('.error-message');
    if (errorSpan) {
        errorSpan.textContent = '';
    }
}

function runFieldValidation(input, group, validator, emptyMessage, formatMessage) {
    const val = input.value;
    if (!validateRequired(val)) {
        setError(input, group, emptyMessage);
        return false;
    }
    if (validator && !validator(val)) {
        setError(input, group, formatMessage);
        return false;
    }
    clearError(group);
    return true;
}

nameInput.addEventListener('blur', () => {
    runFieldValidation(nameInput, document.getElementById('group-name'), null, 'Enter your name');
});

emailInput.addEventListener('blur', () => {
    runFieldValidation(emailInput, document.getElementById('group-email'), validateEmailFormat, 'Enter your email address', 'Enter a valid email address');
});

passwordInput.addEventListener('blur', () => {
    const group = document.getElementById('group-password');
    if (!validateRequired(passwordInput.value)) {
        setError(passwordInput, group, 'Enter a password');
    } else if (!checkPasswordStrength(passwordInput.value)) {
        setError(passwordInput, group, 'Password is not strong enough');
    } else {
        clearError(group);
    }
});

termsCheckbox.addEventListener('change', () => {
    const group = document.getElementById('group-terms');
    if (!termsCheckbox.checked) {
        setError(termsCheckbox, group, 'You must accept the terms');
    } else {
        clearError(group);
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    successBanner.style.display = 'none';
    
    const isNameValid = runFieldValidation(nameInput, document.getElementById('group-name'), null, 'Enter your name');
    const isEmailValid = runFieldValidation(emailInput, document.getElementById('group-email'), validateEmailFormat, 'Enter your email address', 'Enter a valid email address');
    
    const passGroup = document.getElementById('group-password');
    const isPassRequired = validateRequired(passwordInput.value);
    const isPassStrong = checkPasswordStrength(passwordInput.value);
    let isPasswordValid = false;
    
    if (!isPassRequired) {
        setError(passwordInput, passGroup, 'Enter a password');
    } else if (!isPassStrong) {
        setError(passwordInput, passGroup, 'Password is not strong enough');
    } else {
        clearError(passGroup);
        isPasswordValid = true;
    }
    
    const termsGroup = document.getElementById('group-terms');
    const isTermsValid = termsCheckbox.checked;
    if (!isTermsValid) {
        setError(termsCheckbox, termsGroup, 'You must accept the terms');
    } else {
        clearError(termsGroup);
    }
    
    if (isNameValid && isEmailValid && isPasswordValid && isTermsValid) {
        successBanner.style.display = 'block';
        form.reset();
        checkLength.classList.remove('met');
        checkNumber.classList.remove('met');
        checkSpecial.classList.remove('met');
    }
});
