import React, { Component } from 'react';
import { Button, Input } from '../Utils/Utils';
import CollectionApiService from '../../services/collection-service';

export default class CollectionDetailForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      
      owner_status: '',
      play_count: '',
      rating: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (ev) => {
    ev.preventDefault();

    this.setState({ error: null });
    CollectionApiService.updateCollectionItem(
      this.state.owner_status,
      this.state.play_count,
      this.state.rating
    ).catch((res) => {
      this.setState({ error: res.error });
    });
  };

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { error } = this.state;
    return (
      <form className="CollectionDetailUpdateForm" onSubmit={this.handleSubmit}>
        <div role="alert">{error && <p className="red">{error}</p>}</div>
        <div className="owner_status">
          <label htmlFor="CollectionDetail_owner_status">Owner Status</label>
          <select
            value={this.state.owner_status}
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
            value={this.state.play_count}
          ></Input>
        </div>
        <div className="rating">
          <label htmlFor="CollectionDetail_rating">Rating</label>
          <select
            value={this.state.rating}
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
    );
  }
}
