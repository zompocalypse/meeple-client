import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import './index.css';

import { CollectionProvider } from './contexts/CollectionContext';

ReactDOM.render(
  <CollectionProvider>
    <App />
  </CollectionProvider>,
  document.getElementById('root')
);
