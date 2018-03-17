import React, { Component, PropTypes } from 'react';
import { speech } from '../../utils/voice';
import { getRandomInt } from '../../utils/NumberUtil';

const TYPE_VALUE = {
  X: {
    text: 'X',
    value: 10
  },
  XY: {
    text: 'XY',
    value: 100
  },
  XYZ: {
    text: 'XYZ',
    value: 1000
  },
  XXYZ: {
    text: 'XXYZ',
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
  count: 7,
  value: ''
};

class Testing extends Component {
  static propTypes = {
    settings: PropTypes.object.isRequired,
    end: PropTypes.func.isRequired
  }

  state = {
    core: -1,
    ...defaultTestingState
  }

  componentDidMount() {
    this._generateQuetion();
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
      clearInterval(this.intervalId);
    }
  }

  _generateQuetion() {
    const { core } = this.state;
    const randomedNumber = this._randomNumber();

    speech(randomedNumber);

    this.setState({
      number: randomedNumber,
      core: core + 1,
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

  _onChangeInput(event) {
    if (event.target.value === this.state.number.toString()) {
      this._generateQuetion();
    } else {
      this.setState({
        value: event.target.value
      });
    }
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
      count,
      core,
      number
    } = this.state;

    const mainContent = (
      <div className="Testing-main">
        <div className="Testing-time">{count}</div>
        <div className="Testing-content">
          <div className="Testing-text">
            <input type="text" placeholder="Your answer..." value={value} onChange={(e) => this._onChangeInput(e)} />
          </div>
        </div>
        <div className="Testing-core">{core}</div>
      </div>
    );

    const resultContent = (
      <div className="Testing-result">
        <div className="Testing-result-number">{number}</div>
        <div className="Testing-result-repeat">
          <i className="fa fa-volume-up" onClick={() => this._repeat()} />
        </div>
        <div className="Testing-result-next">
          <button type="button" className="btn-info" onClick={() => this._end()}>Next</button>
        </div>
      </div>
    );

    return (
      <div className="Testing">
        { count === 0 ? resultContent : mainContent }
      </div>
    );
  }
}

export default Numbers;
