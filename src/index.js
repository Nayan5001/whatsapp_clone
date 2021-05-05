import App from "./components/App.jsx";
import ReactDOM from "react-dom";
// import * as serviceWorker from "./serviceWorker.jsx";

import reducer, { initialState } from "./components/reducer.jsx";
import { StateProvider } from "./components/StateProvider.jsx";

const rootElement = document.getElementById("root");
ReactDOM.render(
  
  <StateProvider initialState={initialState} reducer={reducer}>
  
    <App />
  </StateProvider>,
  rootElement
);