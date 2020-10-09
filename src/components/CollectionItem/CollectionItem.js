import React, { Component } from 'react'

export default class CollectionItem extends Component {
  render() {
    const { collection } = this.props
    return (
      <div>
        <h2>{collection.title}</h2>
      </div>
    )
  }
}