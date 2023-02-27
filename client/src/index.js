import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';
import router from './router/routes';
// import 'dotenv';
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Provider store={store}>
      {/* <React.StrictMode> */}
        <App>{ router() }</App>
      {/* </React.StrictMode> */}
    </Provider>
  </Router>
);

reportWebVitals();
