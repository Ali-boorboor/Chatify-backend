import type { checkUserExistanceType } from "#t/types";

const checkUserExistance = ({
  checkableData,
  res,
  errorMsg,
}: checkUserExistanceType) => {
  if (!checkableData) {
    throw res.notFound(errorMsg || "User not found");
  }
};

export default checkUserExistance;
