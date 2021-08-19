import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { applyPolyfills, defineCustomElements } from '@esri/calcite-components/dist/loader';

// Apply polyfills and then define the custom elements
// polyfills are not needed if you don't support IE11 or Edge
applyPolyfills().then(() => {
  defineCustomElements(window);
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);