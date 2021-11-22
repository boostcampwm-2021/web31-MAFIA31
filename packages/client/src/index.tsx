import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserInfoProvider from './contexts/userInfo';

import './styles/reset.css';

ReactDOM.render(
  <React.StrictMode>
    <UserInfoProvider>
      <App />
    </UserInfoProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
