import React, { Component } from 'react';
import { Section, Button } from '../Utils/Utils';

import './CollectionItemDetailView.css';

export default class CollectionItemDetailView extends Component {
  54;

  render() {
    const { expandedCollectionItem, handleRemoveFromCollection } = this.props;
    return (
      this.props.expandedCollectionItem.title !== undefined && (
        <Section className="ExpandedCollectionItem">
          <div className="ExpandedCollectionItem_Heading">
            <h2>{expandedCollectionItem.title}</h2>
            <h2>9.5</h2>
          </div>
          <h3>{expandedCollectionItem.tagline}</h3>
          <p>{expandedCollectionItem.description}</p>
          <hr />
          <p>
            Number of players: {expandedCollectionItem.minimum_players} -{' '}
            {expandedCollectionItem.maximum_players}
          </p>
          <p>Type: {expandedCollectionItem.type}</p>
          <p>Status: {expandedCollectionItem.owner_status}</p>
          <p>Play Count: {expandedCollectionItem.play_count}</p>
          <p>My rating: {expandedCollectionItem.rating}</p>
          <div>
            <Button
              className="delete"
              onClick={() =>
                handleRemoveFromCollection(
                  expandedCollectionItem.id,
                  expandedCollectionItem.boardgame_id,
                  expandedCollectionItem.title
                )
              }
            >
              Remove
            </Button>
          </div>
        </Section>
      )
    );
  }
}
