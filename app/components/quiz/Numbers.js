import React, { Component } from 'react';
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
    text: 'XXYZ',
    value: getRandomInt(1, 100000)
  }
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
    type: 'RANDOM'
  }


  _setType(event) {
    console.log(event.target.value);
    this.setState({ type: event.target.value });
  }

  _onNext() {
    this.props.onNext({
      type: TYPE_MAPPING[this.state.type]
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
                defaultChecked: TYPE_MAPPING[key].text === TYPE_MAPPING.RANDOM.text
              }

              return (
                <div key={index}>
                  <input value={key} name="type" {...attr} /> {TYPE_MAPPING[key].text}
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

    return Math.round(Math.random() * type.value);
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
