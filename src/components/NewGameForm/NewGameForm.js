import React, { Component } from 'react';
import {
  Button,
  Input,
  Required,
  Textarea,
} from '../../components/Utils/Utils';
import CollectionApiService from '../../services/collection-service';
import './NewGameForm.css';

export default class NewGameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      title: '',
      tagline: '',
      description: '',
      type: '',
      minimum_players: '',
      maximum_players: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.history.push(`/${this.props.match.params.collection_path}`);
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    this.setState({ error: null });
    CollectionApiService.addNewGame(
      this.state.title,
      this.state.tagline,
      this.state.description,
      this.state.type,
      this.state.minimum_players,
      this.state.maximum_players
    )
      .then((res) =>
        CollectionApiService.addToCollection(res.id).then((data) => data.json())
      )
      .then(() => {
        this.setState({
          title: '',
          tagline: '',
          description: '',
          type: '',
          minimum_players: '',
          maximum_players: '',
        });
      })
      .then(this.goBack)
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { error } = this.state;
    return (
      <form className="NewGameForm" onSubmit={this.handleSubmit}>
        <div role="alert">{error && <p className="red">{error}</p>}</div>
        <div className="title">
          <label htmlFor="NewGame_title">
            Title <Required />
          </label>
          <Input
            name="title"
            type="text"
            required
            id="NewGame_title"
            className="new_game_inputs"
            onChange={this.handleChange}
            value={this.state.title}
          ></Input>
        </div>
        <div className="tagline">
          <label htmlFor="NewGame_tagline">
            Tagline <Required />
          </label>
          <Input
            name="tagline"
            type="text"
            required
            id="NewGame_tagline"
            className="new_game_inputs"
            onChange={this.handleChange}
            value={this.state.tagline}
          ></Input>
        </div>
        <div className="description">
          <label htmlFor="NewGame_description">
            Description <Required />
          </label>
          <Textarea
            name="description"
            type="text"
            required
            id="NewGame_description"
            className="new_game_inputs text-area"
            onChange={this.handleChange}
            value={this.state.description}
          ></Textarea>
        </div>
        <div className="type">
          <label htmlFor="NewGame_type">
            Type <Required />
          </label>
          <select
            value={this.state.type}
            onChange={this.handleChange}
            name="type"
            id="NewGame_type"
            className="new_game_inputs"
            required
          >
            <option value="-">-</option>
            <option value="Abstract">Abstract</option>
            <option value="Childrens">Childrens</option>
            <option value="Customizable">Customizable</option>
            <option value="Family">Family</option>
            <option value="Party">Party</option>
            <option value="Strategy">Strategy</option>
            <option value="Thematic">Thematic</option>
            <option value="Wargames">Wargames</option>
          </select>
        </div>
        <div className="flex flex-start">
          <div className="minimum_players">
            <label htmlFor="NewGame_minimum_players">
              Min Players <Required />
            </label>
            <Input
              name="minimum_players"
              type="text"
              required
              id="NewGame_minimum_players"
              className="min-max-inputs"
              onChange={this.handleChange}
              value={this.state.minimum_players}
            ></Input>
          </div>
          <span className="need_space"> - </span>
          <div className="maximum_players">
            <label htmlFor="NewGame_maximum_players">
              Max Players <Required />
            </label>
            <Input
              name="maximum_players"
              type="text"
              required
              id="NewGame_maximum_players"
              className="min-max-inputs"
              onChange={this.handleChange}
              value={this.state.maximum_players}
            ></Input>
          </div>
        </div>
        <Button className="standard new_game_buttons" type="submit">
          Add New Game
        </Button>
      </form>
    );
  }
}
