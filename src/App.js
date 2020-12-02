import ToDoApp from './components/ToDoApp';
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';

import ToDoContextProvider from "./context/ToDoContext";

function App() {
  return (
    <div className="App">
      <Router>
        <ToDoApp />
      </Router>
    </div>
  );
}

export default (props) => (
  <ToDoContextProvider>
    <App {...props} />
  </ToDoContextProvider>
);
