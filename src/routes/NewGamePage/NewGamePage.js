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
    this.props.history.push(`/${this.props.match.params.collection_path}`);
  }

  render() {
    return (
      <>
        <div className="flex end">
          <Button onClick={this.goBack} className="hollow go-back">
            Back to Collection
          </Button>
        </div>
        <h2>Add New Game To Meeple</h2>
        <NewGameForm />
      </>
    );
  }
}
