import axios from "axios";
import { authHeader } from "../helpers/auth";

function login(username, password) {
  return axios
    .post(
      `https://localhost:44389/LoginControler/authenticate`,
      {
        username,
        password,
      },
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
}
export default login;
