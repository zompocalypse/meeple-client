import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TokenService from '../../services/token-service';
import './Header.css';
import assets from '../../assets/assets';

class Header extends Component {
  handleLogoutClick = () => {
    TokenService.clearAuthToken();
  };

  renderLogoutLink() {
    return (
      <div className="header-links">
        <Link onClick={this.handleLogoutClick} to="/">
          Logout
        </Link>
      </div>
    );
  }

  renderLoginLink() {
    return (
      <div className="header-links">
        <Link to="/login">Log in</Link>
        <Link to="/register">Register</Link>
      </div>
    );
  }

  render() {
    return (
      <>
        <nav className="Header">
          <h1>
            <img src={assets.pawn_icon} alt="icon of a chess pawn" />
            Meeple
          </h1>
          {TokenService.hasAuthToken()
            ? this.renderLogoutLink()
            : this.renderLoginLink()}
        </nav>
      </>
    );
  }
}

export default withRouter(Header);
