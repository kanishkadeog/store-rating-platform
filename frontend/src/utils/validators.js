//store-rating-platform/frontend/src/utils/validators.js

// frontend/src/utils/validators.js

// Name Validation
export const nameValidation = {
  required: "Name is required",
  minLength: {
    value: 20,
    message: "Name must be at least 20 characters",
  },
  maxLength: {
    value: 60,
    message: "Name cannot exceed 60 characters",
  },
};

// Email Validation
export const emailValidation = {
  required: "Email is required",
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Invalid email address",
  },
};

// Address Validation
export const addressValidation = {
  required: "Address is required",
  maxLength: {
    value: 400,
    message: "Address cannot exceed 400 characters",
  },
};

// Password Validation
export const passwordValidation = {
  required: "Password is required",
  pattern: {
    value: /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/,
    message:
      "Password must be 8-16 characters and contain one uppercase letter and one special character",
  },
};