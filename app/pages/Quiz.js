import React, { Component } from 'react';
import Helmet from 'react-helmet';
import ListenAndWrite from '../components/quiz/ListenAndWrite';
import Numbers from '../components/quiz/Numbers';

const GAMES = {
  LISTEN_AND_WRITE: {
    displayName: 'Listen and write',
    className: 'ListenAndWrite',
    component: <ListenAndWrite />
  },
  NUMBERS: {
    displayName: 'Numbers',
    className: 'Numbers',
    component: <Numbers />
  }
};

class Quiz extends Component {
  render() {
    return (
      <div className="Quiz">
        <Helmet title="Quizzz | ENotif" />
        <div className="container">
          <Game />
        </div>
      </div>
    );
  }
}

class Game extends Component {
  state = {
    game: null
  }

  _choose(game) {
    this.setState({ game });
  }

  render() {
    const {
      game
    } = this.state;

    const gameListContent = (
      <ul className="clearfix">
        {
          Object.keys(GAMES).map((key, index) => {
            return (
              <li key={index} onClick={() => this._choose(GAMES[key])}>
                <i className={GAMES[key].className} />
                <span>{GAMES[key].displayName}</span>
              </li>
            );
          })
        }
      </ul>
    );

    return (
      <div className="Game">
        { game ? game.component : gameListContent }
      </div>
    );
  }
}

export default Quiz;
