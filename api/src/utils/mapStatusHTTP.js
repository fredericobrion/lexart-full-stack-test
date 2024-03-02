const OK = "OK";
const CREATED = "CREATED";
const UNAUTHORIZED = "UNAUTHORIZED";
const NOT_FOUND = "NOT_FOUND";
const CONFLICT = "CONFLICT";

const mapStatusHTTP = (status) => {
  const statusHTTPMap = {
    OK: 200,
    CREATED: 201,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    CONFLICT: 409,
  };

  return statusHTTPMap[status] ?? 500;
};

module.exports = {
  mapStatusHTTP,
  OK,
  CREATED,
  UNAUTHORIZED,
  NOT_FOUND,
  CONFLICT,
};
