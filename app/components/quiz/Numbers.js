import React, { Component } from 'react';
import { getRandomInt } from '../../utils/NumberUtil';

const TYPE = {
  X: 1,
  XY: 2,
  XYZ: 3,
  XXYZ: 4,
  RANDOM: getRandomInt(1, 10)
};

class Numbers extends Component {
  state = {
    
  }

  render() {
    const {
    } = this.state;

    return (
      <div className="Numbers">
        <div className="Numbers-question">
          <div className="Numbers-main">
            <div className="Numbers-title">Core {core}</div>
            <div className="Numbers-hint">
              
            </div>
            <div className="Numbers-content">
              <div className="Numbers-audio">
              <i className="fa fa-volume-up" onClick={() => this._play()} />
              </div>
              <div className="Numbers-text">
                <input type="text" placeholder="Your answer..." value={inputValue} onChange={(e) => this._onChangeInput(e)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Numbers;
