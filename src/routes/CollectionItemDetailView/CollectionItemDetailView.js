import React, { Component } from 'react';
import { Section, Button, Input } from '../../components/Utils/Utils';
import CollectionContext from '../../contexts/CollectionContext';
import CollectionApiService from '../../services/collection-service';
import TokenService from '../../services/token-service';

import './CollectionItemDetailView.css';

export default class CollectionItemDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collectionItem: {
        owner_status: '-',
        play_count: '',
        rating: '-',
      },
      boardGameRating: [],
      userData: {},
      error: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  static contextType = CollectionContext;

  componentDidMount() {
    CollectionApiService.getByCollectionId(
      this.props.match.params.collection_path,
      this.props.match.params.collection_id
    )
      .then(this.setCollectionItemDetail)
      .then(
        this.setState({
          collectionItem: {
            owner_status: '-',
            play_count: '',
            rating: '-',
          },
        })
      )
      .catch(this.context.setError);

    CollectionApiService.getBoardGameRatings()
      .then(this.setBoardGameRatings)
      .catch(this.context.setError);
  }

  handleChange(event) {
    this.setState({
      collectionItem: {
        ...this.state.collectionItem,
        [event.target.name]: event.target.value,
      },
    });
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    this.setState({ error: null });

    const { owner_status, play_count, rating, id } = this.state.collectionItem;
    const newData = { owner_status, play_count, rating };
    CollectionApiService.updateCollectionItem(
      this.state.userData.collection_path,
      id,
      newData
    ).catch((res) => {
      this.setState({ error: res.error });
    });
  };

  setBoardGameRatings = (boardGameRating) => {
    this.setState({ boardGameRating });
  };

  setCollectionItemDetail = (collectionItem) => {
    this.setState({
      collectionItem,
      userData: TokenService.getCollectionPath(),
    });
  };

  goBack() {
    this.props.history.goBack();
  }

  handleRemoveFromCollection = (idToRemove) => {
    const collectionPath = this.state.userData.collection_path;
    CollectionApiService.removeCollectionItem(collectionPath, idToRemove)
      .then(() => this.goBack())
      .catch(this.context.setError);
  };

  render() {
    const { collectionItem, boardGameRating } = this.state;
    const { error } = this.state;
    return (
      <Section className="CollectionItem">
        <div className="flex end">
          <Button
            type="button"
            onClick={this.goBack}
            className="hollow go-back"
          >
            Back to Collection
          </Button>
        </div>
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
        {this.state.userData.user_id === this.state.collectionItem.user_id ? (
          <>
            <form
              className="CollectionDetailUpdateForm"
              onSubmit={this.handleSubmit}
            >
              <div role="alert">{error && <p className="red">{error}</p>}</div>
              <div className="owner_status">
                <label htmlFor="CollectionDetail_owner_status">
                  Owner Status:{' '}
                </label>
                <select
                  value={this.state.collectionItem.owner_status}
                  onChange={this.handleChange}
                  name="owner_status"
                  className="collection_detail_inputs"
                >
                  <option>-</option>
                  <option value="Own">Own</option>
                  <option value="Want">Want</option>
                  <option value="Sell">For sale</option>
                </select>
              </div>
              <div className="play_count">
                <label htmlFor="play_count">Play Count: </label>
                <Input
                  name="play_count"
                  type="number"
                  required
                  id="play_count"
                  className="collection_detail_inputs"
                  onChange={this.handleChange}
                  defaultValue={this.state.collectionItem.play_count}
                ></Input>
              </div>
              <div className="rating">
                <label htmlFor="rating">Rating: </label>
                <select
                  value={this.state.collectionItem.rating}
                  onChange={this.handleChange}
                  name="rating"
                  required
                  className="collection_detail_inputs"
                >
                  <option value="0">0</option>
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
              <div className="flex space-between">
                <Button className="standard need-space-above" type="submit">
                  Save Changes
                </Button>
                <Button
                  className="delete need-space-above"
                  type="button"
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
              </div>
            </form>
          </>
        ) : (
          <Section>
            <p>Status: {this.state.collectionItem.owner_status}</p>
            <p>Play Count: {this.state.collectionItem.play_count}</p>
            <p>Rating: {this.state.collectionItem.rating}</p>
          </Section>
        )}
      </Section>
    );
  }
}
