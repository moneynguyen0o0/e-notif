import React, { Component } from 'react';
import { speech } from '../../utils/voice';
import { getRandomInt } from '../../utils/NumberUtil';

const TYPE_VALUE = {
  X: 10,
  XY: 100,
  XYZ: 1000,
  XXYZ: 10000,
  RANDOM: getRandomInt(1, 10)
};

const TYPE_MAPPING = {
  X: 'X',
  XY: 'XY',
  XYZ: 'XYZ',
  XXYZ: 'XXYZ',
  RANDOM: 'RANDOM'
};

class Numbers extends Component {
  state = {
    settings: {
      type: TYPE_VALUE.RANDOM
    },
    finished: false
  }

  _getSettings(settings) {
    this.setState({
      settings
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
    type: TYPE_MAPPING.RANDOM
  }


  _setType(event) {
    console.log(event.target.value);
    this.setState({ type: event.target.value });
  }

  _onNext() {
    this.props.onNext({
      type: this.state.type
    });
  }

  render() {
    const {
      type
    } = this.state;

    return (
      <div className="Settings">
        <div className="Settings-type" onChange={(e) => this._setType(e)}>
          {
            Object.keys(TYPE_MAPPING).map((key, index) => {
              const attr = {
                defaultChecked: key === TYPE_MAPPING.RANDOM
              }

              return (
                <div key={index}>
                  <input value={key} name="type" {...attr} /> {TYPE_MAPPING[key]}
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

  componentWillUnmount(){
    clearInterval(this.intervalId);
  }

  _timer() {
    this.setState({
      count: this.state.count - 1
    })

    if (this.state.count === 0) {
      this._end();
      clearInterval(this.intervalId);
    }
  }

  _generateQuetion() {
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

    return Math.round(Math.random() * type);
  }

  _onChangeInput(event) {
    if (event.target.value === this.state.number.toString()) {
      this._generateQuetion();
    }
  }

  _end() {
    this.props.end();
  }

  render() {
    const {
      value,
      count,
      core
    } = this.state;

    return (
      <div className="Testing">
        <div className="Testing-time">{count}</div>
        <div className="Testing-content">
          <div className="Testing-text">
            <input type="text" placeholder="Your answer..." value={value} onChange={(e) => this._onChangeInput(e)} />
          </div>
        </div>
        <div className="Testing-core">{core}</div>
      </div>
    );
  }
}

export default Numbers;
