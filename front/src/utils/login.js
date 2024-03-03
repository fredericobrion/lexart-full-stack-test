import axios from "axios";
import { decodeToken } from "./jwt";

const saveToLocalStorage = (token) => {
  return new Promise((resolve, reject) => {
    try {
      localStorage.setItem("token", token);

      localStorage.setItem("user", decodeToken(token).userName);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

const login = async (email, password) => {
  const response = await axios.post("http://localhost:3001/login", {
    email,
    password,
  });

  const token = response.data.token;

  await saveToLocalStorage(token);
};

export default login;
