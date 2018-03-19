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
          finished ? <Settings onNext={(settings) => this._getSettings(settings)} /> : <Testing settings={settings} end={() => this._end()} />
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
                <div key={index}>
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
    core: 0,
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
    this._handleChange(event.target.value);
  }

  _onDeleteInput() {
    const { value } = this.state;

    const newValue = value.slice(0, -1);
    this.setState({ value: newValue });
  }

  _handleChange(value) {
    const {
      core,
      number
    } = this.state;

    if (value === number.toString()) {
      this._generateQuetion();

      this.setState({ core: core + 1 });
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
      core,
      number,
      starTimer
    } = this.state;

    const countable = [];

    for (let i = 1; i < 10; i++) {
      countable.push(<button onClick={() => this._onClickInput(i)}>{i}</button>);
    }

    countable.push(<button onClick={() => this._onClickInput(0)}>{0}</button>);
    countable.push(<button onClick={() => this._onDeleteInput()}>Delete</button>);

    const mainContent = (
      <div className="Testing-main">
        { starTimer && <Timer onTimeup={() => this._timeup()} /> }
        <div className="Testing-content">
          <div className="Testing-text">
            <input type="text" placeholder="Your answer..." value={value} onChange={(e) => this._onChangeInput(e)} />
          </div>
        </div>
        <div className="Testing-core">{core}</div>
        <div className="Testing-countable">
          {countable}
        </div>
      </div>
    );

    const resultContent = (
      <div className="Testing-result">
        <div className="Testing-result-number">{number}</div>
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
    onTimeup: PropTypes.func.isRequired
  }

  state = {
    count: 7
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
