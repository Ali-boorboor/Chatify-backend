import response from "#u/response";
import type { checkNoContentDataType } from "#t/types";

const checkNoContentData = ({ checkableData, res }: checkNoContentDataType) => {
  if (
    !checkableData ||
    (Array.isArray(checkableData) && checkableData?.length < 1)
  ) {
    return response({ res, statusCode: 204 });
  }
};

export default checkNoContentData;
