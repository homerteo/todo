import apiClient from "../config/apiClient";
import urlApi from "../config/app";

export function postLogin(email, password) {
  return apiClient.APP.post(`${urlApi}/auth/login`, {
      email,
      password
  }).then((response) => {
      return response.data;
  })
}