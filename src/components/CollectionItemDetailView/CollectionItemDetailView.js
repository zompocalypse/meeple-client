import React, { Component } from 'react';
import { Section } from '../Utils/Utils'

export default class CollectionItemDetailView extends Component {
  54

  render() {
    const { expandedCollectionItem } = this.props
    return (
      (this.props.expandedCollectionItem.title !== undefined &&
      <Section>
        <h2>{expandedCollectionItem.title}</h2>
        <h3>{expandedCollectionItem.tagline}</h3>
        <p>{expandedCollectionItem.description}</p>
        <hr />
        <p>Number of players: {expandedCollectionItem.minimum_players} - {expandedCollectionItem.maximum_players}</p>
        <p>Type: {expandedCollectionItem.type}</p>
        <p>Status: {expandedCollectionItem.owner_status}</p>
        <p>Play Count: {expandedCollectionItem.play_count}</p>
        <p>My rating: {expandedCollectionItem.rating}</p>
      </Section>
      )
    )
  }
}