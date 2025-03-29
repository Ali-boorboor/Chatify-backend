import * as Yup from "yup";

const loginValidators = Yup.object().shape({
  identifier: Yup.string()
    .trim()
    .matches(
      /^(([^@\s]+)@([\w-]+\.)+[\w-]{2,5})|^[a-zA-Z0-9_.]{1,20}$/,
      "Please Enter Your Email or Username Correctly"
    )
    .required(),
  password: Yup.string().trim().required(),
});

export default loginValidators;
