import React, { Component } from 'react';
import NewGameForm from '../../components/NewGameForm/NewGameForm';
import CollectionContext from '../../contexts/CollectionContext';
import { Button } from '../../components/Utils/Utils';

export default class BoardGamePage extends Component {
  static contextType = CollectionContext;

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.history.push(`/${this.context.userData.collectionPath}`);
  }

  render() {
    return (
      <>
        <NewGameForm
          toggleAddNewGameForm={this.toggleAddNewGameForm}
          toggleGames={this.toggleGames}
        />
        <Button onClick={this.goBack} className="go-back">
          Back to Collection
        </Button>
      </>
    );
  }
}
