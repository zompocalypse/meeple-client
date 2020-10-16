import React, { Component } from 'react';
import CollectionContext from '../../contexts/CollectionContext';
import CollectionApiService from '../../services/collection-service';
import CollectionItem from '../../components/CollectionItem/CollectionItem.js';
import { Section } from '../../components/Utils/Utils';
import { Link } from 'react-router-dom';

import './CollectionPage.css';
import TokenService from '../../services/token-service';

export default class CollectionPage extends Component {
  static contextType = CollectionContext;

  state = {
    collectionList: [],
    boardGameRating: [],
    userData: {},
  };

  async componentDidMount() {
    CollectionApiService.getByCollectionPath(
      this.props.match.params.collection_path
    )
      .then(this.setCollectionList)
      .catch(this.context.setError);

    CollectionApiService.getBoardGameRatings()
      .then(this.setBoardGameRatings)
      .catch(this.context.setError);
  }

  setCollectionList = (collectionListData) => {
    this.setState({
      collectionList: collectionListData,
      userData: TokenService.getCollectionPath(),
    });
  };

  setBoardGameRatings = (boardGameRating) => {
    this.setState({ boardGameRating: boardGameRating });
  };

  renderCollection = () => {
    const { collectionList = [], userData } = this.state;
    return (
      <div className="collection_list_view">
        {collectionList.map((item) => (
          <CollectionItem key={item.id} collection={item} userData={userData} />
        ))}
      </div>
    );
  };

  render() {
    const { error } = this.context;
    return (
      <>
        <Section>
          <div className="CollectionList">
            <h2>Your Board Game Collection</h2>
            {this.props.match.params.collection_path ===
            this.state.userData.collection_path ? (
              <Link
                to={`/${this.state.userData.collection_path}/add-to-collection`}
              >
                Add games to collection
              </Link>
            ) : (
              ''
            )}
            {error ? <p>An error occurred</p> : this.renderCollection()}
          </div>
        </Section>
      </>
    );
  }
}
