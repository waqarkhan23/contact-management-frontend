import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(3, "Name should have minimum 3 characters")
    .max(15, "Name Should Not be Greater Than 15 character")
    .required("Name is required"),
  email: Yup.string()
    .trim()
    .email("Enter a Valid Email")
    .required("Email is required"),
  password: Yup.string()
    .trim()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
      `<ol style="list-style-type: disc;">
        <li>Password must be at least 8 characters long</li>
        <li>Contain at least one uppercase letter</li>
        <li>One number</li>
        <li>One special character</li>
      </ol>`
    )
    .required("Password is required"),
});

const validationSchemaLogin = Yup.object({
  email: Yup.string()
    .trim()
    .email("Enter a Valid Email")
    .required("Email is required"),
  password: Yup.string().trim().required("Password is required"),
});

export { validationSchema, validationSchemaLogin };
