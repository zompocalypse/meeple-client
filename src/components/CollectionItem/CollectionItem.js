import React, { Component } from 'react'

import './CollectionItem.css'

export default class CollectionItem extends Component {

  render() {
    const { collection, expandCollectionDetails } = this.props
    return (
      <div id={collection.id}>
        <li onClick={() => expandCollectionDetails(collection.id)} className="CollectionList_item">{collection.title}</li>
      </div>
    )
  }
}