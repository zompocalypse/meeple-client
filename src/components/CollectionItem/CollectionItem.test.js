import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import CollectionItem from './CollectionItem';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <CollectionItem />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
