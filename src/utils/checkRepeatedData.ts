import path from "path";
import removeFileHandler from "#u/removeFileHandler";
import type { checkRepeatedDataType } from "#t/types";

const checkRepeatedData = ({
  checkableData,
  res,
  errorMsg,
  filename,
}: checkRepeatedDataType) => {
  if (checkableData) {
    if (filename) {
      removeFileHandler(
        path.join(__dirname, "..", "public/usersCovers", filename),
        res
      );
    }

    throw res.conflict(errorMsg);
  }
};

export default checkRepeatedData;
