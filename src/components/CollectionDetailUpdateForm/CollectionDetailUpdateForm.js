import React, { Component } from 'react';
import { Button } from '../Utils/Utils';
import CollectionApiService from '../../services/collection-service';

export default class CollectionDetailForm extends Component {
  state = { error: null };

  handleSubmit = (ev) => {
    ev.preventDefault();
    const { owner_status, play_count, rating } = ev.target;

    this.setState({ error: null });
    CollectionApiService.updateCollectionItem(
      owner_status.value,
      play_count.value,
      rating.value
    ).catch((res) => {
      this.setState({ error: res.error });
    });
  };

  render() {
    const { error } = this.state;
    const { expandedCollectionItem } = this.props;
    console.log(this.props);
    return (
      <form className="CollectionDetailUpdateForm" onSubmit={this.handleSubmit}>
        <div role="alert">{error && <p className="red">{error}</p>}</div>
        <div className="owner_status">
          <label htmlFor="CollectionDetail_owner_status">Owner Status</label>
          <select defaultValue={expandedCollectionItem.owner_status}>
            <option>-</option>
            <option value="Own">Own</option>
            <option value="Want">Want</option>
            <option value="Sell">For sale</option>
          </select>
        </div>
        <div className="play_count">
          <label htmlFor="CollectionDetail_play_count">Play Count</label>
          <Button className="plus">+</Button>
          <Button className="minus">-</Button>
        </div>
        <div className="rating">
          <label htmlFor="CollectionDetail_rating">Rating</label>
          <select defaultValue={expandedCollectionItem.rating}>
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
    );
  }
}
