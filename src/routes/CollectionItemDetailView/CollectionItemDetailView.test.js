import React from 'react';
import ReactDOM from 'react-dom';
import CollectionItemDetailView from './CollectionItemDetailView';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CollectionItemDetailView />, div);
  ReactDOM.unmountComponentAtNode(div);
});
