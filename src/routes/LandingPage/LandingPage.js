import React, { Component } from 'react';
import { Section } from '../../components/Utils/Utils';
import assets from '../../assets/assets';

import './LandingPage.css';

export default class LandingPage extends Component {
  render() {
    return (
      <>
        <div className="hero"></div>
        <Section className="what">
          <div>
            <div>
              <h2>The perfect place to manage your board game collection.</h2>
              <hr />
              <p>
                Meeple is an online board game collection manager that allows
                users to manage their board game collection and share the
                collection with other users with a custom unique url. In
                managing your collection, you can input rate, mark as owned, and
                count the number of times you've played.
              </p>
            </div>
            <img
              className="lp-img"
              src={assets.board_game_wall}
              alt="wall of very colorful boardgames"
            />
          </div>
        </Section>
        <Section className="banner">
          <h3>Sign up free today and get your collection started</h3>
        </Section>
        <Section className="footer">
          <h4>Meeple</h4>
          <hr />
          <div>
            &copy;
            <a href="mailto:jason.stankevich@gmail.com">jason stankevich</a>
          </div>
        </Section>
      </>
    );
  }
}
