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

export function getTodoList() {
  return apiClient.APP.get(`${urlApi}/tasks`).then((response) => {
    const { data } =  response;
    return data;
  })
}