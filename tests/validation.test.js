import assert from "node:assert/strict";
import { describe, it } from "node:test";
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
} from "../js/validation.js";

describe("validateFullName", () => {
  it("accepts valid names", () => {
    assert.equal(validateFullName("Jane Doe").isValid, true);
    assert.equal(validateFullName("Mary-Jane O'Connor").isValid, true);
  });

  it("rejects empty and out-of-range names", () => {
    assert.equal(validateFullName("").isValid, false);
    assert.equal(validateFullName("A").isValid, false);
    assert.equal(validateFullName("A".repeat(51)).isValid, false);
  });

  it("rejects invalid characters", () => {
    assert.equal(validateFullName("Jane123").isValid, false);
  });
});

describe("validateEmail", () => {
  it("accepts valid emails", () => {
    assert.equal(validateEmail("user@example.com").isValid, true);
  });

  it("rejects invalid emails", () => {
    assert.equal(validateEmail("").isValid, false);
    assert.equal(validateEmail("not-an-email").isValid, false);
    assert.equal(validateEmail("missing@domain").isValid, false);
  });
});

describe("validateUsername", () => {
  it("accepts valid usernames", () => {
    assert.equal(validateUsername("user_123").isValid, true);
  });

  it("rejects invalid usernames", () => {
    assert.equal(validateUsername("ab").isValid, false);
    assert.equal(validateUsername("a".repeat(21)).isValid, false);
    assert.equal(validateUsername("bad-user").isValid, false);
  });
});

describe("validatePhone", () => {
  it("allows empty phone numbers", () => {
    assert.equal(validatePhone("").isValid, true);
  });

  it("accepts international formats", () => {
    assert.equal(validatePhone("+1 (555) 123-4567").isValid, true);
    assert.equal(validatePhone("+91 98765 43210").isValid, true);
  });

  it("rejects invalid phone numbers", () => {
    assert.equal(validatePhone("123").isValid, false);
    assert.equal(validatePhone("abc-def-ghij").isValid, false);
  });
});

describe("validateBio", () => {
  it("accepts bios within the limit", () => {
    assert.equal(validateBio("Hello world").isValid, true);
    assert.equal(validateBio("a".repeat(500)).isValid, true);
  });

  it("rejects bios over 500 characters", () => {
    assert.equal(validateBio("a".repeat(501)).isValid, false);
  });
});

describe("validatePassword", () => {
  it("allows empty passwords", () => {
    assert.equal(validatePassword("").isValid, true);
  });

  it("accepts strong passwords", () => {
    assert.equal(validatePassword("SecurePass1").isValid, true);
  });

  it("rejects weak passwords", () => {
    assert.equal(validatePassword("short1A").isValid, false);
    assert.equal(validatePassword("alllowercase1").isValid, false);
    assert.equal(validatePassword("ALLUPPERCASE1").isValid, false);
    assert.equal(validatePassword("NoNumbers").isValid, false);
  });
});

describe("validateConfirmPassword", () => {
  it("is optional when password is empty", () => {
    assert.equal(validateConfirmPassword("", "").isValid, true);
  });

  it("requires confirmation when password is provided", () => {
    assert.equal(validateConfirmPassword("SecurePass1", "").isValid, false);
  });

  it("requires matching passwords", () => {
    assert.equal(validateConfirmPassword("SecurePass1", "SecurePass1").isValid, true);
    assert.equal(validateConfirmPassword("SecurePass1", "Different1").isValid, false);
  });
});

describe("validateTerms", () => {
  it("requires acceptance", () => {
    assert.equal(validateTerms(false).isValid, false);
    assert.equal(validateTerms(true).isValid, true);
  });
});

describe("validateSettingsForm", () => {
  it("returns valid for a complete valid form", () => {
    const result = validateSettingsForm({
      fullName: "Jane Doe",
      email: "jane@example.com",
      username: "jane_doe",
      phone: "",
      bio: "Developer",
      password: "",
      confirmPassword: "",
      terms: true,
    });

    assert.equal(result.isValid, true);
  });

  it("returns invalid when any field fails", () => {
    const result = validateSettingsForm({
      fullName: "",
      email: "bad-email",
      username: "x",
      phone: "123",
      bio: "a".repeat(501),
      password: "weak",
      confirmPassword: "different",
      terms: false,
    });

    assert.equal(result.isValid, false);
    assert.equal(result.results.fullName.isValid, false);
    assert.equal(result.results.email.isValid, false);
    assert.equal(result.results.username.isValid, false);
    assert.equal(result.results.phone.isValid, false);
    assert.equal(result.results.bio.isValid, false);
    assert.equal(result.results.password.isValid, false);
    assert.equal(result.results.confirmPassword.isValid, false);
    assert.equal(result.results.terms.isValid, false);
  });
});
