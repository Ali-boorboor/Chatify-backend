import type { responseType } from "#t/types";

const response = ({
  res,
  statusCode = 200,
  message = "Request was successful",
  data,
}: responseType) => {
  return res.code(statusCode).send({ statusCode, message, data });
};

export default response;
