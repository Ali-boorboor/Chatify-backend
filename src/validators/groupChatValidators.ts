import * as Yup from "yup";

const groupChatValidators = Yup.object().shape({
  title: Yup.string().trim().min(3).max(30).required(),
  description: Yup.string().trim().max(100),
});

export default groupChatValidators;
