import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.scss'
import {BrowserRouter} from "react-router-dom"

if('serviceWorker' in navigator){
  navigator.serviceWorker.register("/service-worker.js")
  .then((registration)=>{
    console.log("Service worker registered with scope:", registration.scope)
  })
  .catch((error)=>{
    console.error("Service Worker registration failed:", error);
  })
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
