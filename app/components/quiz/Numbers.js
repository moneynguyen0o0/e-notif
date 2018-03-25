import React, { Component, PropTypes } from 'react';
import { speech } from '../../utils/voice';
import { getRandomInt } from '../../utils/NumberUtil';

const TYPE_VALUE = {
  X: {
    text: '1 - 10',
    value: 10
  },
  XY: {
    text: '10 - 100',
    value: 100
  },
  XYZ: {
    text: '100 - 1000',
    value: 1000
  },
  XXYZ: {
    text: '1000 - 10000',
    value: 10000
  },
  RANDOM: {
    text: 'RAMDOM',
    value: getRandomInt(1, 100000)
  }
};

const NUMBER_REGEX = /^[0-9\b]+$/;

class Numbers extends Component {
  state = {
    settings: {
      type: TYPE_VALUE.RANDOM
    },
    finished: true
  }

  _getSettings(settings) {
    this.setState({
      settings,
      finished: false
    });
  }

  _end() {
    this.setState({
      finished: true
    });
  }

  render() {
    const {
      settings,
      finished
    } = this.state;

    return (
      <div className="Numbers">
        {
          finished ? (
            <Settings onNext={(settings) => this._getSettings(settings)} />
          ) : (
            <Testing settings={settings} end={() => this._end()} />
          )
        }
      </div>
    );
  }
}

class Settings extends Component {
  static propTypes = {
    onNext: PropTypes.func.isRequired
  }

  state = {
    type: 'RANDOM'
  }

  _setType(event) {
    this.setState({ type: event.target.value });
  }

  _onNext() {
    this.props.onNext({
      type: TYPE_VALUE[this.state.type]
    });
  }

  render() {
    return (
      <div className="Settings">
        <div className="Settings-type" onChange={(e) => this._setType(e)}>
          {
            Object.keys(TYPE_VALUE).map((key, index) => {
              const attr = {
                defaultChecked: TYPE_VALUE[key].text === TYPE_VALUE.RANDOM.text
              };

              return (
                <div className="Settings-type-item" key={index}>
                  <input type="radio" value={key} name="type" {...attr} /> {TYPE_VALUE[key].text}
                </div>
              );
            })
          }
        </div>
        <div className="Settings-action">
          <button type="button" className="btn-info" onClick={() => this._onNext()}>Next</button>
        </div>
      </div>
    );
  }
}

const defaultTestingState = {
  timeup: false,
  starTimer: false,
  value: ''
};

class Testing extends Component {
  static propTypes = {
    settings: PropTypes.object.isRequired,
    end: PropTypes.func.isRequired
  }

  state = {
    score: 0,
    ...defaultTestingState
  }

  componentDidMount() {
    this._generateQuetion();
  }

  _generateQuetion() {
    const randomedNumber = this._randomNumber();

    speech(
      randomedNumber,
      {
        onend: () => {
          this.setState({ starTimer: true });
        }
      }
    );

    this.setState({
      number: randomedNumber,
      ...defaultTestingState
    });
  }

  _randomNumber() {
    const {
      settings: {
        type
      }
    } = this.props;

    return Math.round(Math.random() * type.value);
  }

  _onClickInput(value) {
    const newValue = this.state.value + value;
    this._handleChange(newValue);
  }

  _onChangeInput(event) {
    const value = event.target.value;

    if (value === '' || NUMBER_REGEX.test(value)) {
      this._handleChange(value);
    }
  }

  _onDeleteInput() {
    const { value } = this.state;

    const newValue = value.slice(0, -1);
    this.setState({ value: newValue });
  }

  _handleChange(value) {
    const {
      score,
      number
    } = this.state;

    if (value === number.toString()) {
      this._generateQuetion();

      this.setState({ score: score + 1 });
    } else {
      this.setState({ value });
    }
  }

  _timeup() {
    this.setState({ timeup: true });
  }

  _repeat() {
    speech(this.state.number);
  }

  _end() {
    this.props.end();
  }

  render() {
    const {
      value,
      timeup,
      score,
      starTimer
    } = this.state;

    const countable = [];

    for (let i = 1; i < 10; i++) {
      countable.push(<button key={countable.length} className="btn-default" onClick={() => this._onClickInput(i)}>{i}</button>);
    }

    countable.push(<button key={countable.length} className="Testing-countable-zero btn-default" onClick={() => this._onClickInput(0)}>{0}</button>);
    countable.push(<button key={countable.length} className="Testing-countable-delete btn-default" onClick={() => this._onDeleteInput()}><i className="fa fa-arrow-left" /></button>);

    const mainContent = (
      <div className="Testing-main">
        <div className="Testing-controls">
          <div className="Testing-controlsWrapper">
            <div className="Testing-scoreWrapper">
              { score > 0 && <div className="Testing-score">{score}</div> }
            </div>
            <div className="Testing-timeWrapper">
              { starTimer && <Timer onTimeup={() => this._timeup()} /> }
            </div>
          </div>
        </div>
        <div className="Testing-text">
          <input type="text" value={value} onChange={(e) => this._onChangeInput(e)} />
        </div>
        <div className="Testing-countable">
          <div className="Testing-countableWrapper">
            {countable}
          </div>
        </div>
      </div>
    );

    const resultContent = (
      <div className="Testing-result">
        <div className="Testing-result-score">
          <span className="Testing-result-score--text">Score:</span>
          <span className="Testing-result-score--number">{score}</span>
        </div>
        <div className="Testing-result-repeat">
          <i className="fa fa-volume-up" onClick={() => this._repeat()} />
        </div>
        <div className="Testing-result-replay">
          <button type="button" className="btn-info" onClick={() => this._end()}>Replay</button>
        </div>
      </div>
    );

    return (
      <div className="Testing">
        { timeup ? resultContent : mainContent }
      </div>
    );
  }
}

class Timer extends Component {
  static propTypes = {
    countdown: PropTypes.number,
    onTimeup: PropTypes.func.isRequired
  }

  state = {
    count: this.props.countdown || 7
  }

  componentDidMount() {
    this.intervalId = setInterval(() => this._timer(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  _timer() {
    const { count } = this.state;

    this.setState({
      count: count - 1
    });

    if (count - 1 === 0) {
      this.props.onTimeup();
      clearInterval(this.intervalId);
    }
  }

  render() {
    const {
      count
    } = this.state;

    return (
      <div className="Timer">
        {count}
      </div>
    );
  }
}

export default Numbers;
