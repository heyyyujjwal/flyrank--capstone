// Settings Form Validation and State Management
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('settings-form');
  const statusMessage = document.getElementById('status-message');

  // Input elements
  const usernameInput = document.getElementById('username');
  const emailInput = document.getElementById('email');
  const bioInput = document.getElementById('bio');
  const bioCount = document.getElementById('bio-count');
  const themeSelect = document.getElementById('theme');
  const languageSelect = document.getElementById('language');
  const emailNotificationsCheckbox = document.getElementById('email-notifications');
  const marketingEmailsCheckbox = document.getElementById('marketing-emails');
  const publicProfileCheckbox = document.getElementById('public-profile');

  // Error elements
  const usernameError = document.getElementById('username-error');
  const emailError = document.getElementById('email-error');
  const bioError = document.getElementById('bio-error');

  const STORAGE_KEY = 'flyrank_user_settings';

  // Load saved settings if available
  loadSavedSettings();

  // Character counter for bio
  bioInput.addEventListener('input', () => {
    bioCount.textContent = `${bioInput.value.length} / 200`;
  });

  // Real-time / blur validation listeners
  usernameInput.addEventListener('input', () => validateUsername());
  usernameInput.addEventListener('blur', () => validateUsername());

  emailInput.addEventListener('input', () => validateEmail());
  emailInput.addEventListener('blur', () => validateEmail());

  bioInput.addEventListener('input', () => validateBio());
  bioInput.addEventListener('blur', () => validateBio());

  // Form submit handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isUsernameValid = validateUsername();
    const isEmailValid = validateEmail();
    const isBioValid = validateBio();

    if (isUsernameValid && isEmailValid && isBioValid) {
      saveSettings();
      showStatus('Settings saved successfully!', 'success');
    } else {
      hideStatus();
      // Focus the first invalid field
      const firstInvalid = form.querySelector('.invalid');
      if (firstInvalid) {
        firstInvalid.focus();
      }
    }
  });

  // Form reset handler
  form.addEventListener('reset', () => {
    clearErrors();
    hideStatus();
    setTimeout(() => {
      bioCount.textContent = `${bioInput.value.length} / 200`;
    }, 0);
  });

  // Validation functions
  function validateUsername() {
    const value = usernameInput.value.trim();
    if (!value) {
      setError(usernameInput, usernameError, 'Username is required.');
      return false;
    }
    if (value.length < 3 || value.length > 20) {
      setError(usernameInput, usernameError, 'Username must be between 3 and 20 characters.');
      return false;
    }
    const usernameRegex = /^[a-zA-Z0-9_.-]+$/;
    if (!usernameRegex.test(value)) {
      setError(usernameInput, usernameError, 'Username can only contain letters, numbers, hyphens, and underscores.');
      return false;
    }

    clearError(usernameInput, usernameError);
    return true;
  }

  function validateEmail() {
    const value = emailInput.value.trim();
    if (!value) {
      setError(emailInput, emailError, 'Email address is required.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setError(emailInput, emailError, 'Please enter a valid email address.');
      return false;
    }

    clearError(emailInput, emailError);
    return true;
  }

  function validateBio() {
    if (bioInput.value.length > 200) {
      setError(bioInput, bioError, 'Bio cannot exceed 200 characters.');
      return false;
    }

    clearError(bioInput, bioError);
    return true;
  }

  function setError(inputElement, errorElement, message) {
    inputElement.classList.add('invalid');
    inputElement.setAttribute('aria-invalid', 'true');
    errorElement.textContent = message;
  }

  function clearError(inputElement, errorElement) {
    inputElement.classList.remove('invalid');
    inputElement.removeAttribute('aria-invalid');
    errorElement.textContent = '';
  }

  function clearErrors() {
    clearError(usernameInput, usernameError);
    clearError(emailInput, emailError);
    clearError(bioInput, bioError);
  }

  function showStatus(message, type) {
    statusMessage.textContent = message;
    statusMessage.className = `status-message visible ${type}`;
    statusMessage.removeAttribute('hidden');

    // Auto-hide status banner after 4 seconds
    setTimeout(() => {
      hideStatus();
    }, 4000);
  }

  function hideStatus() {
    statusMessage.className = 'status-message';
    statusMessage.setAttribute('hidden', '');
    statusMessage.textContent = '';
  }

  // Local storage management
  function saveSettings() {
    const settings = {
      username: usernameInput.value.trim(),
      email: emailInput.value.trim(),
      bio: bioInput.value,
      theme: themeSelect.value,
      language: languageSelect.value,
      emailNotifications: emailNotificationsCheckbox.checked,
      marketingEmails: marketingEmailsCheckbox.checked,
      publicProfile: publicProfileCheckbox.checked,
      updatedAt: new Date().toISOString()
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.warn('Unable to save settings to localStorage:', e);
    }
  }

  function loadSavedSettings() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return;

      const data = JSON.parse(saved);
      if (data.username !== undefined) usernameInput.value = data.username;
      if (data.email !== undefined) emailInput.value = data.email;
      if (data.bio !== undefined) {
        bioInput.value = data.bio;
        bioCount.textContent = `${data.bio.length} / 200`;
      }
      if (data.theme !== undefined) themeSelect.value = data.theme;
      if (data.language !== undefined) languageSelect.value = data.language;
      if (data.emailNotifications !== undefined) emailNotificationsCheckbox.checked = data.emailNotifications;
      if (data.marketingEmails !== undefined) marketingEmailsCheckbox.checked = data.marketingEmails;
      if (data.publicProfile !== undefined) publicProfileCheckbox.checked = data.publicProfile;
    } catch (e) {
      console.warn('Unable to load settings from localStorage:', e);
    }
  }
});
