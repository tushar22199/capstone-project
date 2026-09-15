/**
 * Pure validation helpers for the settings form.
 * Each function returns { isValid: boolean, message: string }.
 */

export function validateFullName(value) {
  const trimmed = value.trim();

  if (!trimmed) {
    return { isValid: false, message: "Full name is required." };
  }

  if (trimmed.length < 2 || trimmed.length > 50) {
    return { isValid: false, message: "Full name must be between 2 and 50 characters." };
  }

  if (!/^[a-zA-Z\s\-']+$/.test(trimmed)) {
    return {
      isValid: false,
      message: "Full name may only contain letters, spaces, hyphens, and apostrophes.",
    };
  }

  return { isValid: true, message: "" };
}

export function validateEmail(value) {
  const trimmed = value.trim();

  if (!trimmed) {
    return { isValid: false, message: "Email is required." };
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(trimmed)) {
    return { isValid: false, message: "Enter a valid email address." };
  }

  return { isValid: true, message: "" };
}

export function validateUsername(value) {
  const trimmed = value.trim();

  if (!trimmed) {
    return { isValid: false, message: "Username is required." };
  }

  if (trimmed.length < 3 || trimmed.length > 20) {
    return { isValid: false, message: "Username must be between 3 and 20 characters." };
  }

  if (!/^[a-zA-Z0-9_]+$/.test(trimmed)) {
    return {
      isValid: false,
      message: "Username may only contain letters, numbers, and underscores.",
    };
  }

  return { isValid: true, message: "" };
}

export function validatePhone(value) {
  const trimmed = value.trim();

  if (!trimmed) {
    return { isValid: true, message: "" };
  }

  const phonePattern = /^\+?[0-9\s\-().]{7,20}$/;

  if (!phonePattern.test(trimmed)) {
    return {
      isValid: false,
      message: "Enter a valid phone number (7–20 digits, optional + prefix).",
    };
  }

  const digitCount = trimmed.replace(/\D/g, "").length;

  if (digitCount < 7 || digitCount > 15) {
    return {
      isValid: false,
      message: "Phone number must contain between 7 and 15 digits.",
    };
  }

  return { isValid: true, message: "" };
}

export function validateBio(value) {
  if (value.length > 500) {
    return { isValid: false, message: "Bio must be 500 characters or fewer." };
  }

  return { isValid: true, message: "" };
}

export function validatePassword(value) {
  const trimmed = value;

  if (!trimmed) {
    return { isValid: true, message: "" };
  }

  if (trimmed.length < 8) {
    return { isValid: false, message: "Password must be at least 8 characters." };
  }

  if (!/[A-Z]/.test(trimmed)) {
    return { isValid: false, message: "Password must contain at least one uppercase letter." };
  }

  if (!/[a-z]/.test(trimmed)) {
    return { isValid: false, message: "Password must contain at least one lowercase letter." };
  }

  if (!/[0-9]/.test(trimmed)) {
    return { isValid: false, message: "Password must contain at least one number." };
  }

  return { isValid: true, message: "" };
}

export function validateConfirmPassword(password, confirmPassword) {
  if (!password) {
    return { isValid: true, message: "" };
  }

  if (!confirmPassword) {
    return { isValid: false, message: "Please confirm your new password." };
  }

  if (password !== confirmPassword) {
    return { isValid: false, message: "Passwords do not match." };
  }

  return { isValid: true, message: "" };
}

export function validateTerms(checked) {
  if (!checked) {
    return { isValid: false, message: "You must accept the terms and conditions." };
  }

  return { isValid: true, message: "" };
}

export function validateSettingsForm(data) {
  const results = {
    fullName: validateFullName(data.fullName),
    email: validateEmail(data.email),
    username: validateUsername(data.username),
    phone: validatePhone(data.phone),
    bio: validateBio(data.bio),
    password: validatePassword(data.password),
    confirmPassword: validateConfirmPassword(data.password, data.confirmPassword),
    terms: validateTerms(data.terms),
  };

  const isValid = Object.values(results).every((result) => result.isValid);

  return { isValid, results };
}
