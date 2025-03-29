import * as Yup from "yup";

const signupValidations = Yup.object().shape({
  username: Yup.string().trim().min(3).max(20).required(),
  email: Yup.string()
    .trim()
    .matches(
      /^(([^@\s]+)@([\w-]+\.)+[\w-]{2,5})$/,
      "Please Enter Your Email Correctly"
    )
    .required(),
  password: Yup.string().trim().required(),
  description: Yup.string().trim().max(100),
});

export default signupValidations;
