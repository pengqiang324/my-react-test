import * as React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import createStore from './store/index'
import { Provider } from 'react-redux'
import App from './App.jsx'
const store = createStore()

ReactDOM.hydrate(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>,
    document.getElementById("app")
);
