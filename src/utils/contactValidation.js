import * as Yup from "yup";

const contactValidation = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(15, "Name must be less than 15 characters"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
  address: Yup.string(),
  number: Yup.string()
    .required("Number is required")
    .min(9, "Enter a valid number")
    .max(16, "Enter a valid number"),
});

export { contactValidation };
