import {
  validateBio,
  validateConfirmPassword,
  validateEmail,
  validateFullName,
  validatePassword,
  validatePhone,
  validateSettingsForm,
  validateTerms,
  validateUsername,
} from "./validation.js";

const form = document.getElementById("settings-form");
const successMessage = document.getElementById("form-success");
const bioInput = document.getElementById("bio");
const bioCounter = document.getElementById("bio-counter");

const fieldValidators = {
  fullName: (formData) => validateFullName(formData.fullName),
  email: (formData) => validateEmail(formData.email),
  username: (formData) => validateUsername(formData.username),
  phone: (formData) => validatePhone(formData.phone),
  bio: (formData) => validateBio(formData.bio),
  password: (formData) => validatePassword(formData.password),
  confirmPassword: (formData) =>
    validateConfirmPassword(formData.password, formData.confirmPassword),
  terms: (formData) => validateTerms(formData.terms),
};

const invalidFields = new Set();

function getFormData() {
  const formData = new FormData(form);

  return {
    fullName: formData.get("fullName") ?? "",
    email: formData.get("email") ?? "",
    username: formData.get("username") ?? "",
    phone: formData.get("phone") ?? "",
    bio: formData.get("bio") ?? "",
    password: formData.get("password") ?? "",
    confirmPassword: formData.get("confirmPassword") ?? "",
    theme: formData.get("theme") ?? "system",
    language: formData.get("language") ?? "en",
    terms: formData.get("terms") === "on",
  };
}

function getFieldContainer(fieldName) {
  return form.querySelector(`[data-field="${fieldName}"]`);
}

function getErrorElement(fieldName) {
  const fieldContainer = getFieldContainer(fieldName);

  if (!fieldContainer) {
    return null;
  }

  return fieldContainer.querySelector(".field-error");
}

function setFieldState(fieldName, result) {
  const fieldContainer = getFieldContainer(fieldName);
  const errorElement = getErrorElement(fieldName);

  if (!fieldContainer || !errorElement) {
    return;
  }

  if (result.isValid) {
    fieldContainer.classList.remove("is-invalid");
    errorElement.textContent = "";
    invalidFields.delete(fieldName);
    return;
  }

  fieldContainer.classList.add("is-invalid");
  errorElement.textContent = result.message;
  invalidFields.add(fieldName);
}

function validateField(fieldName) {
  const formData = getFormData();
  const validator = fieldValidators[fieldName];

  if (!validator) {
    return true;
  }

  const result = validator(formData);
  setFieldState(fieldName, result);

  if (fieldName === "password" || fieldName === "confirmPassword") {
    const relatedField = fieldName === "password" ? "confirmPassword" : "password";

    if (invalidFields.has(relatedField) || formData.password) {
      validateField(relatedField);
    }
  }

  return result.isValid;
}

function updateBioCounter() {
  const length = bioInput.value.length;
  bioCounter.textContent = `${length} / 500`;
}

function hideSuccessMessage() {
  successMessage.hidden = true;
  successMessage.textContent = "";
}

function showSuccessMessage() {
  successMessage.textContent = "Settings saved successfully.";
  successMessage.hidden = false;
}

function handleFieldBlur(event) {
  const fieldName = event.target.closest("[data-field]")?.dataset.field;

  if (!fieldName || !fieldValidators[fieldName]) {
    return;
  }

  validateField(fieldName);
}

function handleFieldInput(event) {
  const fieldName = event.target.closest("[data-field]")?.dataset.field;

  if (!fieldName || !invalidFields.has(fieldName)) {
    return;
  }

  validateField(fieldName);
}

function handleSubmit(event) {
  event.preventDefault();
  hideSuccessMessage();

  const formData = getFormData();
  const { isValid, results } = validateSettingsForm(formData);

  Object.entries(results).forEach(([fieldName, result]) => {
    setFieldState(fieldName, result);
  });

  if (!isValid) {
    const firstInvalidField = form.querySelector(".form-field.is-invalid input, .form-field.is-invalid textarea, .form-field.is-invalid select");

    firstInvalidField?.focus();
    return;
  }

  console.log("Settings submitted:", {
    fullName: formData.fullName.trim(),
    email: formData.email.trim(),
    username: formData.username.trim(),
    phone: formData.phone.trim(),
    bio: formData.bio,
    theme: formData.theme,
    language: formData.language,
    termsAccepted: formData.terms,
    passwordUpdated: Boolean(formData.password),
  });

  showSuccessMessage();
  form.reset();
  updateBioCounter();
  invalidFields.clear();
  form.querySelectorAll(".form-field.is-invalid").forEach((field) => {
    field.classList.remove("is-invalid");
  });
  form.querySelectorAll(".field-error").forEach((error) => {
    error.textContent = "";
  });
}

form.addEventListener("blur", handleFieldBlur, true);
form.addEventListener("input", handleFieldInput);
form.addEventListener("change", handleFieldInput);
form.addEventListener("submit", handleSubmit);

bioInput.addEventListener("input", updateBioCounter);
updateBioCounter();
