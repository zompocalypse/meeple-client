import React, { Component } from 'react';
import { Button, Section } from '../components/Utils/Utils'

import './LandingPage.css'

export default class LandingPage extends Component {
  render() { 
    return (
      <>
        <div className="hero"></div>
        <Section className="Hero-text">
          <header>
            <h1>Meeple</h1>
            <h2>The perfect place to manage your board game collection.</h2>
          </header>
        </Section>
        <Section className="what">
          <div>
            <div>
            <h3>What is Meeple?</h3>
            <p>Meeple is an online board game collection manager that allows users to manage their board game collection and share the collection with other users. In managing their collection, users can input games as owned, wish to own, and for sale/trade.</p>
            </div>
            <img src="https://via.placeholder.com/300?text=placeholder" alt="" />
          </div>
        </Section>
        <Section className="how">
          <h4>How do I use Meeple?</h4>
          <div>
            <div>
              <img src="https://via.placeholder.com/300?text=placeholder" alt="" />
              <h5>Sign up</h5>
              <p>I'm baby deep v pinterest hashtag readymade mustache vexillologist. Tbh raw denim lumbersexual plaid ugh blog. Next level pop-up heirloom, cred squid vexillologist master cleanse affogato skateboard helvetica distillery.</p>
            </div>
            <div>
              <img src="https://via.placeholder.com/300?text=placeholder" alt="" />
              <h5>Add boardgames</h5>
              <p>Hell of listicle bicycle rights, synth heirloom 8-bit meditation ugh williamsburg keffiyeh skateboard vaporware aesthetic cold-pressed. Cred pour-over mustache, copper mug fingerstache hashtag retro poke locavore tofu offal distillery kitsch vexillologist.</p>
            </div>
            <div>
              <img src="https://via.placeholder.com/300?text=placeholder" alt="" />
              <h5>Rate and share</h5>
              <p>Portland kombucha photo booth tumeric, tofu williamsburg fanny pack. Distillery poutine drinking vinegar single-origin coffee, craft beer salvia aesthetic mixtape VHS.</p>
            </div>
          </div>
        </Section>
        <Section className="banner">
          <h3>Sign up free today and get your collection started</h3>
          <div>
            <Button className="standard">Sign up</Button>
            <Button className="hollow">Demo</Button>
          </div>
        </Section>
        <Section className="footer">
          <h4>Meeple</h4>
          <hr />
          <div>&copy; <a href="mailto:jason.stankevich@gmail.com">jason stankevich</a></div>
        </Section>
      </>
    );
  }
}