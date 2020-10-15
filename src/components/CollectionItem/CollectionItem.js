import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CollectionContext from '../../contexts/CollectionContext';

import './CollectionItem.css';

export default class CollectionItem extends Component {
  static defaultProps = {
    collection: {},
  };

  static contextType = CollectionContext;

  render() {
    const { collection } = this.props;
    return (
      <Link to={`/${this.context.userData.collectionPath}/${collection.id}`}>
        <div id={collection.id} className="flex-grid">
          <p className="CollectionList_item col">{collection.title}</p>
        </div>
      </Link>
    );
  }
}
