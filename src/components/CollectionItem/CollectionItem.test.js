import React from 'react';
import ReactDOM from 'react-dom';
import CollectionItem from './CollectionItem';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CollectionItem />, div);
  ReactDOM.unmountComponentAtNode(div);
});
