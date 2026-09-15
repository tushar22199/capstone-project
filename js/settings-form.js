(function () {
  const form = document.getElementById("settings-form");
  const resetBtn = document.getElementById("reset-btn");
  const formStatus = document.getElementById("form-status");
  const bioField = document.getElementById("bio");
  const bioCount = document.getElementById("bio-count");

  const FIELD_MAP = {
    fullName: "full-name",
    email: "email",
    username: "username",
    phone: "phone",
    bio: "bio",
    password: "password",
    confirmPassword: "confirm-password",
    theme: "theme",
    language: "language",
    terms: "terms",
  };

  const DEFAULT_VALUES = {
    fullName: "",
    email: "",
    username: "",
    phone: "",
    bio: "",
    password: "",
    confirmPassword: "",
    theme: "system",
    language: "en",
    emailNotifications: true,
    productUpdates: false,
    terms: false,
  };

  function getFormData() {
    return {
      fullName: form.fullName.value,
      email: form.email.value,
      username: form.username.value,
      phone: form.phone.value,
      bio: form.bio.value,
      password: form.password.value,
      confirmPassword: form.confirmPassword.value,
      theme: form.theme.value,
      language: form.language.value,
      emailNotifications: form.emailNotifications.checked,
      productUpdates: form.productUpdates.checked,
      terms: form.terms.checked,
    };
  }

  function setFormData(data) {
    form.fullName.value = data.fullName;
    form.email.value = data.email;
    form.username.value = data.username;
    form.phone.value = data.phone;
    form.bio.value = data.bio;
    form.password.value = data.password;
    form.confirmPassword.value = data.confirmPassword;
    form.theme.value = data.theme;
    form.language.value = data.language;
    form.emailNotifications.checked = data.emailNotifications;
    form.productUpdates.checked = data.productUpdates;
    form.terms.checked = data.terms;
    updateBioCount();
  }

  function getErrorElement(fieldName) {
    const inputId = FIELD_MAP[fieldName];
    return document.getElementById(`${inputId}-error`);
  }

  function getInputElement(fieldName) {
    const inputId = FIELD_MAP[fieldName];
    return document.getElementById(inputId);
  }

  function showFieldError(fieldName, message) {
    const input = getInputElement(fieldName);
    const errorEl = getErrorElement(fieldName);

    if (!input || !errorEl) {
      return;
    }

    input.classList.add("invalid");
    input.setAttribute("aria-invalid", "true");
    errorEl.textContent = message;
    errorEl.hidden = false;
  }

  function clearFieldError(fieldName) {
    const input = getInputElement(fieldName);
    const errorEl = getErrorElement(fieldName);

    if (!input || !errorEl) {
      return;
    }

    input.classList.remove("invalid");
    input.removeAttribute("aria-invalid");
    errorEl.textContent = "";
    errorEl.hidden = true;
  }

  function clearAllErrors() {
    Object.keys(FIELD_MAP).forEach(clearFieldError);
  }

  function showFormStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
    formStatus.hidden = false;
  }

  function hideFormStatus() {
    formStatus.hidden = true;
    formStatus.textContent = "";
    formStatus.className = "form-status";
  }

  function updateBioCount() {
    bioCount.textContent = String(bioField.value.length);
  }

  function validateSingleField(fieldName) {
    const formData = getFormData();
    const message = Validation.validateField(fieldName, formData);

    if (message) {
      showFieldError(fieldName, message);
      return false;
    }

    clearFieldError(fieldName);
    return true;
  }

  function handleBlur(event) {
    const fieldName = event.target.name;
    if (!FIELD_MAP[fieldName]) {
      return;
    }

    validateSingleField(fieldName);

    if (fieldName === "password" && form.confirmPassword.value) {
      validateSingleField("confirmPassword");
    }
  }

  function handleInput(event) {
    const fieldName = event.target.name;
    const input = getInputElement(fieldName);

    if (input && input.classList.contains("invalid")) {
      validateSingleField(fieldName);
    }

    if (fieldName === "bio") {
      updateBioCount();
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    hideFormStatus();
    clearAllErrors();

    const formData = getFormData();
    const errors = Validation.validateForm(formData);
    const errorFields = Object.keys(errors);

    if (errorFields.length > 0) {
      errorFields.forEach((fieldName) => {
        showFieldError(fieldName, errors[fieldName]);
      });

      const firstInvalid = getInputElement(errorFields[0]);
      if (firstInvalid) {
        firstInvalid.focus();
      }

      showFormStatus("Please fix the errors below before saving.", "error");
      return;
    }

    console.log("Settings saved:", formData);
    showFormStatus("Settings saved successfully.", "success");

    form.password.value = "";
    form.confirmPassword.value = "";
  }

  function handleReset() {
    setFormData({ ...DEFAULT_VALUES });
    clearAllErrors();
    hideFormStatus();
    form.fullName.focus();
  }

  form.addEventListener("submit", handleSubmit);
  form.addEventListener("blur", handleBlur, true);
  form.addEventListener("input", handleInput);
  resetBtn.addEventListener("click", handleReset);

  updateBioCount();
})();
