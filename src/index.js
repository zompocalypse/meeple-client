import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './components/App/App'
import './index.css'

import { CollectionProvider } from './contexts/CollectionContext'

ReactDOM.render(
  <BrowserRouter>
    <CollectionProvider>
        <App />
    </CollectionProvider>
  </BrowserRouter>,
   document.getElementById('root'));