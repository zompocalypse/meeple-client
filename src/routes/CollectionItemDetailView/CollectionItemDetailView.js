import React, { Component } from 'react';
import { Section, Button, Input } from '../../components/Utils/Utils';
import CollectionContext from '../../contexts/CollectionContext';
import CollectionApiService from '../../services/collection-service';

import './CollectionItemDetailView.css';

export default class CollectionItemDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collectionItem: [],
      boardGameRating: [],
      error: null,
    };
  }

  static contextType = CollectionContext;

  async componentDidMount() {
    CollectionApiService.getByCollectionId(
      this.context.userData.CollectionPath,
      this.props.match.params.collection_id
    )
      .then(this.setCollectionItemDetail)
      .catch(this.context.setError);

    CollectionApiService.getBoardGameRatings()
      .then(this.setBoardGameRatings)
      .catch(this.context.setError);
  }

  setBoardGameRatings = (boardGameRating) => {
    this.setState({ boardGameRating });
  };

  setCollectionItemDetail = (collectionItem) => {
    this.setState({ collectionItem });
  };

  goBack() {
    this.props.history.push(`/${this.context.userData.collectionPath}`);
  }

  handleRemoveFromCollection = (idToRemove) => {
    const collectionPath = this.context.userData.collectionPath;
    CollectionApiService.removeCollectionItem(
      collectionPath,
      idToRemove
    ).then(() => this.goBack());
  };

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { collectionItem, boardGameRating } = this.state;
    const { error } = this.state;
    return (
      <Section className="CollectionItem">
        <div className="CollectionItem_Heading">
          <h2>{collectionItem.title}</h2>
          <h2>
            {boardGameRating && boardGameRating.average_rating}
            {!boardGameRating && 'n/a'}
          </h2>
        </div>
        <h3>{collectionItem.tagline}</h3>
        <p>{collectionItem.description}</p>
        <hr />
        <p>
          Number of players: {collectionItem.minimum_players} -{' '}
          {collectionItem.maximum_players}
        </p>
        <p>Type: {collectionItem.type}</p>
        <form
          className="CollectionDetailUpdateForm"
          onSubmit={this.handleSubmit}
        >
          <div role="alert">{error && <p className="red">{error}</p>}</div>
          <div className="owner_status">
            <label htmlFor="CollectionDetail_owner_status">Owner Status</label>
            <select
              value={this.state.collectionItem.owner_status}
              onChange={this.handleChange}
              name="owner_status"
            >
              <option>-</option>
              <option value="Own">Own</option>
              <option value="Want">Want</option>
              <option value="Sell">For sale</option>
            </select>
          </div>
          <div className="play_count">
            <label htmlFor="play_count">Play Count</label>
            <Input
              name="play_count"
              type="text"
              required
              id="play_count"
              onChange={this.handleChange}
              defaultValue={this.state.collectionItem.play_count}
            ></Input>
          </div>
          <div className="rating">
            <label htmlFor="CollectionDetail_rating">Rating</label>
            <select
              value={this.state.collectionItem.rating}
              onChange={this.handleChange}
              name="rating"
            >
              <option>-</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          <Button type="submit">Save</Button>
        </form>
        <div>
          {this.context.userData.userId ===
          this.state.collectionItem.user_id ? (
            <Button
              className="delete"
              onClick={() =>
                this.handleRemoveFromCollection(
                  collectionItem.id,
                  collectionItem.boardgame_id,
                  collectionItem.title
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
    );
  }
}
