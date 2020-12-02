import React from "react";
import PropTypes from "prop-types";
import apiClient from '../config/apiClient';
import { postLogin } from "../api/todo";

const defaultState = {
  accessToken: null
}

export const toDoContext = React.createContext(defaultState);

class ToDoContextProvider extends React.Component {
  constructor() {
    super();
    this.state = {
        ...defaultState
    };
  }

  initialAuthVerification = () => {
    const myLocalStorage = window.localStorage;
    const accessToken = myLocalStorage.getItem("accessToken");
    if (accessToken !== null) {
      apiClient.setToken(accessToken);
      return this.setState({
        accessToken
      });
    }
  }

  submitLogin = async (email, password) => {
    try {
        const { accessToken } = await postLogin(email, password);
        const myLocalStorage = window.localStorage;
        myLocalStorage.clear();
        myLocalStorage.setItem("accessToken", accessToken);
        apiClient.setToken(accessToken);
        this.setState({
          accessToken
        });
    } catch (error) {
      console.error(error);
    }
  };

  logout = () => {
    const myLocalStorage = window.localStorage;
    myLocalStorage.clear();
    this.setState({
      accessToken: null
    });
  };

  render() {
    const { children } = this.props;
    return(
      <toDoContext.Provider
        value={{
          ...this.state,
          initialAuthVerification: this.initialAuthVerification,
          submitLogin: this.submitLogin,
          logout: this.logout
          }}
      >
        {children}
      </toDoContext.Provider>
    );
  }
};

ToDoContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
}

export const ToDoContextConsumer = ToDoContextProvider.Consumer;

export default ToDoContextProvider;