/**
 * Settings Form - Core Validation and DOM Integration
 */

/**
 * Validates the display name.
 * - Required after trimming whitespace
 * - Must be between 3 and 30 characters in length
 *
 * @param {string} value
 * @returns {{ isValid: boolean, error?: string, value: string }}
 */
function validateDisplayName(value) {
  const trimmed = typeof value === 'string' ? value.trim() : '';

  if (trimmed.length === 0) {
    return {
      isValid: false,
      error: 'Display name is required.',
      value: trimmed
    };
  }

  if (trimmed.length < 3 || trimmed.length > 30) {
    return {
      isValid: false,
      error: 'Display name must be between 3 and 30 characters.',
      value: trimmed
    };
  }

  return {
    isValid: true,
    value: trimmed
  };
}

/**
 * Validates the email address.
 * - Required after trimming whitespace
 * - Must match basic standard email format
 *
 * @param {string} value
 * @returns {{ isValid: boolean, error?: string, value: string }}
 */
function validateEmail(value) {
  const trimmed = typeof value === 'string' ? value.trim() : '';

  if (trimmed.length === 0) {
    return {
      isValid: false,
      error: 'Email address is required.',
      value: trimmed
    };
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return {
      isValid: false,
      error: 'Please enter a valid email address.',
      value: trimmed
    };
  }

  return {
    isValid: true,
    value: trimmed
  };
}

/**
 * Validates entire settings form data payload.
 *
 * @param {{ displayName?: string, email?: string, notifications?: boolean }} formData
 * @returns {{ isValid: boolean, errors: Record<string, string>, data: { displayName: string, email: string, notifications: boolean } | null }}
 */
function validateSettingsForm(formData = {}) {
  const nameResult = validateDisplayName(formData.displayName);
  const emailResult = validateEmail(formData.email);
  const notifications = Boolean(formData.notifications);

  const errors = {};
  if (!nameResult.isValid) {
    errors.displayName = nameResult.error;
  }
  if (!emailResult.isValid) {
    errors.email = emailResult.error;
  }

  const isValid = Object.keys(errors).length === 0;

  return {
    isValid,
    errors,
    data: isValid
      ? {
          displayName: nameResult.value,
          email: emailResult.value,
          notifications
        }
      : null
  };
}

// Browser DOM Interaction
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('settings-form');
    const displayNameInput = document.getElementById('display-name');
    const emailInput = document.getElementById('email');
    const notificationsCheckbox = document.getElementById('notifications');
    const statusMessage = document.getElementById('status-message');

    const displayNameError = document.getElementById('display-name-error');
    const emailError = document.getElementById('email-error');

    function updateFieldValidation(inputEl, errorEl, result) {
      if (result.isValid) {
        inputEl.classList.remove('invalid');
        inputEl.setAttribute('aria-invalid', 'false');
        errorEl.textContent = '';
      } else {
        inputEl.classList.add('invalid');
        inputEl.setAttribute('aria-invalid', 'true');
        errorEl.textContent = result.error;
      }
    }

    // Input & Blur listeners for immediate accessible feedback
    displayNameInput.addEventListener('input', () => {
      if (displayNameInput.classList.contains('invalid')) {
        updateFieldValidation(displayNameInput, displayNameError, validateDisplayName(displayNameInput.value));
      }
    });

    displayNameInput.addEventListener('blur', () => {
      updateFieldValidation(displayNameInput, displayNameError, validateDisplayName(displayNameInput.value));
    });

    emailInput.addEventListener('input', () => {
      if (emailInput.classList.contains('invalid')) {
        updateFieldValidation(emailInput, emailError, validateEmail(emailInput.value));
      }
    });

    emailInput.addEventListener('blur', () => {
      updateFieldValidation(emailInput, emailError, validateEmail(emailInput.value));
    });

    // Form submission
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameResult = validateDisplayName(displayNameInput.value);
      const emailResult = validateEmail(emailInput.value);

      updateFieldValidation(displayNameInput, displayNameError, nameResult);
      updateFieldValidation(emailInput, emailError, emailResult);

      const formResult = validateSettingsForm({
        displayName: displayNameInput.value,
        email: emailInput.value,
        notifications: notificationsCheckbox.checked
      });

      if (formResult.isValid) {
        statusMessage.textContent = 'Settings saved successfully!';
        statusMessage.className = 'status-message success';
        statusMessage.removeAttribute('hidden');
      } else {
        statusMessage.setAttribute('hidden', '');
        statusMessage.textContent = '';

        // Focus first invalid input control
        if (!nameResult.isValid) {
          displayNameInput.focus();
        } else if (!emailResult.isValid) {
          emailInput.focus();
        }
      }
    });
  });
}

// Node.js module export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    validateDisplayName,
    validateEmail,
    validateSettingsForm
  };
}
