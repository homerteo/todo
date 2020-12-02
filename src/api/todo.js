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
    const { data } = response;
    return data;
  })
}

export function postTask(data) {
  const config = {
      headers: {
          'Content-Type': 'application/json'
      }
  }
  return apiClient.APP.post(`${urlApi}/tasks`, data, config).then((response) => {
    return response;
  })
}

export function deleteTask(id) {
  return apiClient.APP.delete(`${urlApi}/tasks/${id}`).then((response) => {
    return response;
  })
}