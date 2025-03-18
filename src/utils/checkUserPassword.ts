import type { checkUserPasswordType } from "#t/types";

const checkUserPassword = async ({
  password,
  hashedPassword,
  req,
  res,
}: checkUserPasswordType) => {
  const isPassCorrect = await req.bcryptCompare(password, hashedPassword);

  if (!isPassCorrect) {
    throw res.unauthorized("Datas are wrong");
  }
};

export default checkUserPassword;
