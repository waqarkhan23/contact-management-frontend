export default function Validation(value) {
  let errors = {};

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!value.name) {
    errors.name = "Name is required";
  } else if (value.name.length < 3) {
    errors.name = "Name must be at least 3 characters";
  } else if (value.name.length > 15) {
    errors.name = "Name must be less than 15 characters";
  }

  if (!value.email) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(value.email)) {
    errors.email = "Email is not valid";
  }

  if (!value.password) {
    errors.password = "Password is required";
  } else if (!passwordRegex.test(value.password)) {
    errors.password =
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase";
  }
  return errors;
}
