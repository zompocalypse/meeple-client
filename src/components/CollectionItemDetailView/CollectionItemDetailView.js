import React, { Component } from 'react';
import { Section, Button } from '../Utils/Utils';
import CollectionContext from '../../contexts/CollectionContext';

import './CollectionItemDetailView.css';

export default class CollectionItemDetailView extends Component {
  static contextType = CollectionContext;

  render() {
    const {
      expandedCollectionItem,
      handleRemoveFromCollection,
      path,
      expandedCollectionItemRating,
    } = this.props;
    return (
      this.props.expandedCollectionItem.title !== undefined && (
        <Section className="ExpandedCollectionItem">
          <div className="ExpandedCollectionItem_Heading">
            <h2>{expandedCollectionItem.title}</h2>
            <h2>
              {expandedCollectionItemRating &&
                expandedCollectionItemRating.average_rating}
              {!expandedCollectionItemRating && 'n/a'}
            </h2>
          </div>
          <h3>{expandedCollectionItem.tagline}</h3>
          <p>{expandedCollectionItem.description}</p>
          <hr />
          <p>
            Number of players: {expandedCollectionItem.minimum_players} -{' '}
            {expandedCollectionItem.maximum_players}
          </p>
          <p>Type: {expandedCollectionItem.type}</p>
          <div>
            <p>Status: {expandedCollectionItem.owner_status}</p>
            <p>Play Count: {expandedCollectionItem.play_count}</p>
            <p>Rating: {expandedCollectionItem.rating}</p>
          </div>
          <div>
            {path === this.context.userData.collectionPath ? (
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
            ) : (
              ''
            )}
          </div>
        </Section>
      )
    );
  }
}
