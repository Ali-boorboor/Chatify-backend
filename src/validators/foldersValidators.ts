import * as Yup from "yup";

const createFolderValidators = Yup.object().shape({
  title: Yup.string().trim().min(3).max(30).required(),
  chats: Yup.array(),
});

export default createFolderValidators;
