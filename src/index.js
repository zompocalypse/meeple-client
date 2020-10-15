import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import './index.css';

import { CollectionProvider } from './contexts/CollectionContext';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <CollectionProvider>
      <App />
    </CollectionProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
