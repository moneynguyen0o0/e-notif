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
}

class Quiz extends Component {
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
      <ul>
        {
          Object.keys(GAMES).map((key, index) => {
            return (
              <li className={GAMES[key].className} onClick={() => this._choose(GAMES[key])}>
                {GAMES[key].displayName}
              </li>
            );
          })
        }
      </ul>
    );

    return (
      <div className="Quiz">
        <Helmet title="Quizzz | ENotif" />
        <div className="container">
          { game ? game.component : gameListContent }
        </div>
      </div>
    );
  }
}

export default Quiz;
