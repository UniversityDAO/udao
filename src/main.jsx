import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

import { createStore } from 'redux';
import { Provider } from 'react-redux'
import allReducers from "../reduxReducers"

const store = createStore(allReducers)

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
)
