import * as Yup from "yup";

const changeCoverValidators = Yup.object().shape({
  password: Yup.string().trim().required(),
});

const changeUsernameValidators = Yup.object().shape({
  newUsername: Yup.string().trim().min(3).max(20).required(),
  password: Yup.string().trim().required(),
});

const changePasswordValidators = Yup.object().shape({
  currentPassword: Yup.string().trim().required(),
  newPassword: Yup.string().trim().required(),
});

const changeBackgroundValidators = Yup.object().shape({
  password: Yup.string().trim().required(),
});

export {
  changeCoverValidators,
  changeUsernameValidators,
  changePasswordValidators,
  changeBackgroundValidators,
};
