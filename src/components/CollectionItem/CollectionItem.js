import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CollectionContext from '../../contexts/CollectionContext';

import './CollectionItem.css';

export default class CollectionItem extends Component {
  static defaultProps = {
    collection: {},
    userData: {},
  };

  static contextType = CollectionContext;

  render() {
    const { collection } = this.props;
    return (
      <Link
        className="collection_a"
        to={`/${this.props.userData.collection_path}/${collection.id}`}
      >
        <div id={collection.id} className="collection_list_each_container">
          <div className="collection_list_inner">
            <p className="collection_list_item col">{collection.title}</p>
          </div>
        </div>
      </Link>
    );
  }
}
