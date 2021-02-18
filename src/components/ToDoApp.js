import { useEffect, useContext } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import Login from './Login';
import ToDoList from './ToDoList'
import HeaderBar from './common/HeaderBar'
import { toDoContext } from "../context/ToDoContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return(
    <Route
      {...rest}
      render={(props) => {
      return rest.isLoged ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: props.location }} />
      );
    }}
    />
  );
};

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return(
    <Route
      {...rest}
      render={(props) => {
      return rest.isLoged && restricted ? (
        <Redirect to={{ pathname: "/tasks", state: props.location }} />
      ) : (
        <Component {...props} />
      );
    }}
    />
  );
};

const ToDoApp = () => {
  const context = useContext(toDoContext);
  const { accessToken, initialAuthVerification } = context;

  useEffect(() => {
    initialAuthVerification();
  }, []);

  return (
    <div>
      <header>
        <HeaderBar />
      </header>
      <Switch>
        <PublicRoute
            isLoged={accessToken !== null}
            path="/"
            restricted={true}
            component={Login}
            exact
          />
        <PrivateRoute
          isLoged={accessToken !== null}
          path="/tasks"
          component={ToDoList}
          exact
        />
      </Switch>
    </div>
  );
}

export default ToDoApp;