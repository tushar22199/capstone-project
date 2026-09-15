const Validation = (() => {
  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const USERNAME_PATTERN = /^[a-zA-Z0-9_]{3,20}$/;
  const PHONE_PATTERN = /^\+?[\d\s\-().]{7,20}$/;
  const FULL_NAME_PATTERN = /^[\p{L}\s'-]{2,50}$/u;
  const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  const ALLOWED_THEMES = ["system", "light", "dark"];
  const ALLOWED_LANGUAGES = ["en", "es", "fr", "de"];

  function isEmpty(value) {
    return value === null || value === undefined || String(value).trim() === "";
  }

  function validateFullName(value) {
    const trimmed = String(value).trim();

    if (isEmpty(trimmed)) {
      return "Full name is required.";
    }

    if (!FULL_NAME_PATTERN.test(trimmed)) {
      return "Use 2–50 letters, spaces, hyphens, or apostrophes.";
    }

    return "";
  }

  function validateEmail(value) {
    const trimmed = String(value).trim();

    if (isEmpty(trimmed)) {
      return "Email is required.";
    }

    if (!EMAIL_PATTERN.test(trimmed)) {
      return "Enter a valid email address.";
    }

    return "";
  }

  function validateUsername(value) {
    const trimmed = String(value).trim();

    if (isEmpty(trimmed)) {
      return "Username is required.";
    }

    if (!USERNAME_PATTERN.test(trimmed)) {
      return "Username must be 3–20 characters (letters, numbers, underscores).";
    }

    return "";
  }

  function validatePhone(value) {
    const trimmed = String(value).trim();

    if (isEmpty(trimmed)) {
      return "";
    }

    if (!PHONE_PATTERN.test(trimmed)) {
      return "Enter a valid phone number.";
    }

    return "";
  }

  function validateBio(value) {
    const trimmed = String(value);

    if (trimmed.length > 500) {
      return "Bio must be 500 characters or fewer.";
    }

    return "";
  }

  function validatePassword(value) {
    const trimmed = String(value);

    if (isEmpty(trimmed)) {
      return "";
    }

    if (!PASSWORD_PATTERN.test(trimmed)) {
      return "Password must be at least 8 characters with uppercase, lowercase, and a number.";
    }

    return "";
  }

  function validateConfirmPassword(password, confirmPassword) {
    if (isEmpty(password)) {
      return "";
    }

    if (isEmpty(confirmPassword)) {
      return "Please confirm your new password.";
    }

    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }

    return "";
  }

  function validateTheme(value) {
    if (!ALLOWED_THEMES.includes(value)) {
      return "Select a valid theme.";
    }

    return "";
  }

  function validateLanguage(value) {
    if (!ALLOWED_LANGUAGES.includes(value)) {
      return "Select a valid language.";
    }

    return "";
  }

  function validateTerms(checked) {
    if (!checked) {
      return "You must agree to the terms to continue.";
    }

    return "";
  }

  function validateField(fieldName, formData) {
    switch (fieldName) {
      case "fullName":
        return validateFullName(formData.fullName);
      case "email":
        return validateEmail(formData.email);
      case "username":
        return validateUsername(formData.username);
      case "phone":
        return validatePhone(formData.phone);
      case "bio":
        return validateBio(formData.bio);
      case "password":
        return validatePassword(formData.password);
      case "confirmPassword":
        return validateConfirmPassword(formData.password, formData.confirmPassword);
      case "theme":
        return validateTheme(formData.theme);
      case "language":
        return validateLanguage(formData.language);
      case "terms":
        return validateTerms(formData.terms);
      default:
        return "";
    }
  }

  function validateForm(formData) {
    const fields = [
      "fullName",
      "email",
      "username",
      "phone",
      "bio",
      "password",
      "confirmPassword",
      "theme",
      "language",
      "terms",
    ];

    const errors = {};

    for (const field of fields) {
      const message = validateField(field, formData);
      if (message) {
        errors[field] = message;
      }
    }

    return errors;
  }

  return {
    validateField,
    validateForm,
  };
})();
