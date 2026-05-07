import { StrictMode } from "react";
import ReactDOM from "react-dom";
// @ts-ignore: side-effect CSS import may not have type declarations
import "./index.css";
import App from "./App";

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
