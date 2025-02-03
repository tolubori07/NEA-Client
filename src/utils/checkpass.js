function checkPasswordRequirements(password) {
  const requirements = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    digit: /\d/.test(password),
    special: /[!@#$%^&*]/.test(password),
  };
  const messages = {
    length: "Password must be at least 8 characters long.",
    lowercase: "Password must contain at least one lowercase letter.",
    uppercase: "Password must contain at least one uppercase letter.",
    digit: "Password must contain at least one digit.",
    special: "Password must contain at least one special character (!@#$%^&*).",
  };
  const missingRequirements = Object.keys(requirements).filter(
    (key) => !requirements[key],
  );
  const errorMessages = missingRequirements.map((key) => messages[key]);
  return errorMessages;
}

export default checkPasswordRequirements;
