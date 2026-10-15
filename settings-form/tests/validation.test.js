const { test, describe } = require('node:test');
const assert = require('node:assert');
const {
  validateDisplayName,
  validateEmail,
  validateSettingsForm
} = require('../script.js');

describe('Settings Form Validation Suite', () => {

  // 1. Valid submission tests
  describe('Valid Submissions', () => {
    test('passes validation with valid display name, email, and notifications enabled', () => {
      const formData = {
        displayName: 'Alex',
        email: 'alex@example.com',
        notifications: true
      };
      const result = validateSettingsForm(formData);

      assert.strictEqual(result.isValid, true);
      assert.deepStrictEqual(result.errors, {});
      assert.deepStrictEqual(result.data, {
        displayName: 'Alex',
        email: 'alex@example.com',
        notifications: true
      });
    });

    test('passes validation with valid display name, email, and notifications disabled', () => {
      const formData = {
        displayName: 'Alex Morgan',
        email: 'alex.morgan@test.co.uk',
        notifications: false
      };
      const result = validateSettingsForm(formData);

      assert.strictEqual(result.isValid, true);
      assert.deepStrictEqual(result.errors, {});
      assert.strictEqual(result.data.notifications, false);
    });

    test('trims outer whitespace from valid display name and email', () => {
      const formData = {
        displayName: '  Taylor Swift  ',
        email: '  taylor@example.org  ',
        notifications: true
      };
      const result = validateSettingsForm(formData);

      assert.strictEqual(result.isValid, true);
      assert.strictEqual(result.data.displayName, 'Taylor Swift');
      assert.strictEqual(result.data.email, 'taylor@example.org');
    });

    test('accepts display name at exact lower boundary (3 characters)', () => {
      const result = validateDisplayName('Dan');
      assert.strictEqual(result.isValid, true);
      assert.strictEqual(result.value, 'Dan');
    });

    test('accepts display name at exact upper boundary (30 characters)', () => {
      const name30 = 'A'.repeat(30);
      const result = validateDisplayName(name30);
      assert.strictEqual(result.isValid, true);
      assert.strictEqual(result.value, name30);
    });
  });

  // 2. Missing display name tests
  describe('Missing Display Name', () => {
    test('fails when display name is an empty string', () => {
      const result = validateDisplayName('');
      assert.strictEqual(result.isValid, false);
      assert.strictEqual(result.error, 'Display name is required.');
    });

    test('fails when display name contains only whitespace', () => {
      const result = validateDisplayName('     ');
      assert.strictEqual(result.isValid, false);
      assert.strictEqual(result.error, 'Display name is required.');
    });

    test('fails form submission when display name is missing', () => {
      const result = validateSettingsForm({
        displayName: '   ',
        email: 'user@example.com',
        notifications: false
      });
      assert.strictEqual(result.isValid, false);
      assert.strictEqual(result.errors.displayName, 'Display name is required.');
      assert.strictEqual(result.data, null);
    });
  });

  // 3. Display name shorter than 3 characters
  describe('Display Name Shorter than 3 Characters', () => {
    test('fails when display name is 2 characters long ("Al")', () => {
      const result = validateDisplayName('Al');
      assert.strictEqual(result.isValid, false);
      assert.strictEqual(result.error, 'Display name must be between 3 and 30 characters.');
    });

    test('fails when display name is 1 character long after trimming (" A ")', () => {
      const result = validateDisplayName(' A ');
      assert.strictEqual(result.isValid, false);
      assert.strictEqual(result.error, 'Display name must be between 3 and 30 characters.');
    });

    test('fails form submission when display name is too short', () => {
      const result = validateSettingsForm({
        displayName: 'Al',
        email: 'alex@example.com',
        notifications: true
      });
      assert.strictEqual(result.isValid, false);
      assert.strictEqual(result.errors.displayName, 'Display name must be between 3 and 30 characters.');
      assert.strictEqual(result.data, null);
    });
  });

  // 4. Display name longer than 30 characters
  describe('Display Name Longer than 30 Characters', () => {
    test('fails when display name exceeds 30 characters (31 characters)', () => {
      const name31 = 'A'.repeat(31);
      const result = validateDisplayName(name31);
      assert.strictEqual(result.isValid, false);
      assert.strictEqual(result.error, 'Display name must be between 3 and 30 characters.');
    });

    test('fails when display name exceeds 30 characters after trimming', () => {
      const name32WithSpaces = `  ${'B'.repeat(32)}  `;
      const result = validateDisplayName(name32WithSpaces);
      assert.strictEqual(result.isValid, false);
      assert.strictEqual(result.error, 'Display name must be between 3 and 30 characters.');
    });

    test('fails form submission when display name is too long', () => {
      const result = validateSettingsForm({
        displayName: 'X'.repeat(35),
        email: 'valid@example.com',
        notifications: false
      });
      assert.strictEqual(result.isValid, false);
      assert.strictEqual(result.errors.displayName, 'Display name must be between 3 and 30 characters.');
      assert.strictEqual(result.data, null);
    });
  });

  // 5. Missing email tests
  describe('Missing Email', () => {
    test('fails when email is an empty string', () => {
      const result = validateEmail('');
      assert.strictEqual(result.isValid, false);
      assert.strictEqual(result.error, 'Email address is required.');
    });

    test('fails when email contains only whitespace', () => {
      const result = validateEmail('   ');
      assert.strictEqual(result.isValid, false);
      assert.strictEqual(result.error, 'Email address is required.');
    });

    test('fails form submission when email is missing', () => {
      const result = validateSettingsForm({
        displayName: 'Alex',
        email: '',
        notifications: true
      });
      assert.strictEqual(result.isValid, false);
      assert.strictEqual(result.errors.email, 'Email address is required.');
      assert.strictEqual(result.data, null);
    });
  });

  // 6. Malformed email tests
  describe('Malformed Email', () => {
    test('fails when email has trailing @ without domain ("alex@")', () => {
      const result = validateEmail('alex@');
      assert.strictEqual(result.isValid, false);
      assert.strictEqual(result.error, 'Please enter a valid email address.');
    });

    test('fails when email lacks @ and domain ("alex")', () => {
      const result = validateEmail('alex');
      assert.strictEqual(result.isValid, false);
      assert.strictEqual(result.error, 'Please enter a valid email address.');
    });

    test('fails when email has no top-level domain ("alex@example")', () => {
      const result = validateEmail('alex@example');
      assert.strictEqual(result.isValid, false);
      assert.strictEqual(result.error, 'Please enter a valid email address.');
    });

    test('fails when email has spaces in local part ("alex user@example.com")', () => {
      const result = validateEmail('alex user@example.com');
      assert.strictEqual(result.isValid, false);
      assert.strictEqual(result.error, 'Please enter a valid email address.');
    });

    test('fails form submission with malformed email', () => {
      const result = validateSettingsForm({
        displayName: 'Alex',
        email: 'alex@',
        notifications: true
      });
      assert.strictEqual(result.isValid, false);
      assert.strictEqual(result.errors.email, 'Please enter a valid email address.');
      assert.strictEqual(result.data, null);
    });
  });

  // 7. Combined multiple validation failures
  describe('Multiple Validation Failures', () => {
    test('captures both missing display name and missing email simultaneously', () => {
      const result = validateSettingsForm({
        displayName: '',
        email: '',
        notifications: false
      });
      assert.strictEqual(result.isValid, false);
      assert.strictEqual(result.errors.displayName, 'Display name is required.');
      assert.strictEqual(result.errors.email, 'Email address is required.');
      assert.strictEqual(result.data, null);
    });

    test('captures both invalid display name length and malformed email', () => {
      const result = validateSettingsForm({
        displayName: 'Al',
        email: 'invalid-email',
        notifications: true
      });
      assert.strictEqual(result.isValid, false);
      assert.strictEqual(result.errors.displayName, 'Display name must be between 3 and 30 characters.');
      assert.strictEqual(result.errors.email, 'Please enter a valid email address.');
      assert.strictEqual(result.data, null);
    });
  });

});
