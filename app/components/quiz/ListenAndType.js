import React, { Component } from 'react';
import { getRandomVocabularies } from '../../utils/API';
import Audio from '../media/Audio';
import Spinner from '../icons/Spinner';

class ListenAndType extends Component {
  state = {
    vocabularies: [],
    answers: [],
    currentQuestIndex: 0,
    inputValue: ''
  }

  componentDidMount() {
    getRandomVocabularies().then((vocabularies) => {
      this.setState({ vocabularies });
    });
  }

  _onFinish() {
    this.setState({

    });
  }

  _onNext() {
    const { inputValue } = this.state;
    
    this.setState({

    });
  }

  _onBack() {
    this.setState({

    });
  }

  _onChangeInput(e) {
    this.setState({ inputValue: e.target.value });
  }

  render() {
    const {
      vocabularies,
      currentQuestIndex,
      inputValue
    } = this.state;

    if (!vocabularies.length) {
      return <Spinner />;
    }

    const {
      word,
      audio
    } = vocabularies[currentQuestIndex];

    const { answer = '' } = answers[currentQuestIndex];

    const controlContent = [];

    if (currentQuestIndex === vocabularies.length - 1) {
      controlContent.push(<button key={controlContent.length} type="button" className="btn-info" onClick={() => this._onFinish()}>Finish</button>);
    } else {
      if (currentQuestIndex) {
        controlContent.push(<button type="button" className="btn-info" onClick={() => this._onBack()}>Back</button>);
      }

      controlContent.push(<button type="button" className="btn-info" onClick={() => this._onNext()}>Next</button>);
    }

    return (
      <div className="ListenAndType">
        <div className="ListenAndType-main">
          <div className="ListenAndType-audio"><Audio src={audio} /></div>
          <div className="ListenAndType-input">
            <input type="text" placeholder="Your answer..." value={inputValue || answer} onChange={(e) => this._onChangeInput(e)} />
          </div>
        </div>
        <div className="ListenAndType-control">{controlContent}</div>
      </div>
    );
  }
}

export default ListenAndType;
