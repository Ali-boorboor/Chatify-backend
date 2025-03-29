import * as Yup from "yup";

const verifyCodeValidators = Yup.object().shape({
  code: Yup.string().trim().required(),
});

export default verifyCodeValidators;
