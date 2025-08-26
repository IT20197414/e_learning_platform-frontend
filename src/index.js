import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // <-- 1. IMPORT PROVIDER
import store from './store'; // <-- 2. IMPORT OUR STORE
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> {/* <-- 3. WRAP THE APP */}
      <App />
    </Provider>
  </React.StrictMode>
);