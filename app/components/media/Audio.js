import React, { Component, PropTypes } from 'react';

export default class Audio extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    type: PropTypes.string
  }

  static defaultProps = {
    type: 'audio/mpeg'
  }

  _play() {
    this.audio.play();
  }

  render() {
    const { src, type } = this.props;

    return (
      <div className="Audio">
        <i className="fa fa-volume-up" onClick={() => this._play()} />
        <audio ref={(audio) => { this.audio = audio; }}>
          <source src={src} type={type} />
        </audio>
      </div>
    );
  }
}
