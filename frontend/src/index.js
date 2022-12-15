import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import {ModalProvider, Modal} from './context/Modal';
import App from './App';

import configureStore from './store';
import { restoreCSRF, csrfFetch } from './store/csrf';
import * as sessionActions from './store/session';


const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions; // object with all session thunk actions
}


/* ---------- test thunk actions ----------

• signup thunk
  - window.sessionActions.signup()
window.store.dispatch(
  window.sessionActions.signup({
      username: "Achok Khenrap Yeshi",
      email: "akyeshi@gmail.com", 
      firstName: "Achok", 
      lastName: "Yeshi", 
      password: "Scientist@2143",
  })
)


• login thunk
  - window.sessionActions.login
  - (dispatch 'login thunk action' with demo user login credential test in browser dev tools console)
window.store.dispatch(
  window.sessionActions.login({
    credential: "Demo-lition",
    password: "password1",
  })
);


• logout thunk
  - window.sessionActions.logout()
window.store.dispatch(
  window.sessionActions.logout()
); 


• restoreUser thunk
  - window.sessionActions.restoreUser()
  - (to restore session user info on a refresh: by adding user info to the Redux store again)
window.store.dispatch(
  window.sessionActions.restoreUser()
); 


------------------------------------------ */

function Root() {
  return (
    <ReduxProvider store={store}>
      <ModalProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ModalProvider>
    </ReduxProvider>
  );
}


ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root'),
);