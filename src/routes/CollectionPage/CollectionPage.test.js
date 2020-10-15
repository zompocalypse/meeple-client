import React from 'react';
import ReactDOM from 'react-dom';
import CollectionPage from './CollectionPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CollectionPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
