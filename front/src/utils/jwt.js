import { jwtDecode } from "jwt-decode";

const decodeToken = (token) => jwtDecode(token);

const verifyTokenExpiration = (token) => {
  const decodedToken = decodeToken(token);
  const tokenExpirationDate = decodedToken.exp;
  const currentTime = Math.floor(Date.now() / 1000);

  return tokenExpirationDate < currentTime;
};

export { decodeToken, verifyTokenExpiration };
