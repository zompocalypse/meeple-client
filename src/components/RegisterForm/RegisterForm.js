import React, { Component } from 'react';
import AuthApiService from '../../services/auth-api-service';
import { Input, Required, Button } from '../Utils/Utils';

export default class RegisterForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {},
  };

  state = { error: null };

  handleSubmit = (ev) => {
    ev.preventDefault();
    const {
      collection_path,
      email,
      password,
    } = ev.target;

    this.setState({ error: null });
    AuthApiService.postUser({
      email: email.value,
      password: password.value,
      collection_path: collection_path.value,
    })
      .then((user) => {
        collection_path.value = '';
        email.value = '';
        password.value = '';
        this.props.onRegistrationSuccess();
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <form className="RegistrationForm" onSubmit={this.handleSubmit}>
        <div role="alert">{error && <p className="red">{error}</p>}</div>
        <div className="collection_path">
          <label htmlFor="RegistrationForm_collection_path">
            Collection Name
          </label>
          <Input
            name="collection_path"
            type="text"
            required
            id="RegistrationForm_collection_path"
          ></Input>
        </div>
        <div className="email">
          <label htmlFor="RegistrationForm_email">
            Email <Required />
          </label>
          <Input
            name="email"
            type="text"
            required
            id="RegistrationForm_email"
          ></Input>
        </div>
        <div className="password">
          <label htmlFor="RegistrationForm_password">
            Password <Required />
          </label>
          <Input
            name="password"
            type="password"
            required
            id="RegistrationForm_password"
          ></Input>
        </div>
        <Button type="submit">Register</Button>
      </form>
    );
  }
}
