import React, { Component } from 'react';
import { getRandomVocabularies } from '../../utils/API';
import Audio from '../media/Audio';
import Spinner from '../icons/Spinner';

const SIZE = 25;

const RATE = {
  poor: {
    min: 0,
    max: 39
  },
  average: {
    min: 40,
    max: 69
  },
  good: {
    min: 70,
    max: 84
  },
  excellent: {
    min: 85,
    max: 100
  }
};

const defaultState = {
  vocabularies: [],
  answers: [],
  currentQuestIndex: 0,
  inputValue: '',
  finish: false,
  hint: null
};

class ListenAndWrite extends Component {
  state = {
    ...defaultState
  }

  componentDidMount() {
    this._getVocabularies();
  }

  _getVocabularies() {
    getRandomVocabularies({ size: SIZE }).then((vocabularies) => {
      this.setState({ vocabularies });
    });
  }

  _onFinish() {
    this.setState({
      answers: this._addAnswer(),
      finish: true
    });
  }

  _rePlay() {
    this._getVocabularies();

    this.setState(defaultState);
  }

  _onNext() {
    const {
      answers,
      currentQuestIndex
    } = this.state;

    const nextAnswer = answers[currentQuestIndex + 1] || '';

    this.setState({
      answers: this._addAnswer(),
      currentQuestIndex: currentQuestIndex + 1,
      inputValue: nextAnswer,
      hint: null
    });
  }

  _onBack() {
    const {
      answers,
      currentQuestIndex,
      inputValue = ''
    } = this.state;

    const prevAnswer = answers[currentQuestIndex - 1];

    const nextState = {
      currentQuestIndex: currentQuestIndex - 1,
      inputValue: prevAnswer,
      hint: null
    };

    if (inputValue) {
      nextState.answers = this._addAnswer();
    }

    this.setState(nextState);
  }

  _addAnswer() {
    const {
      answers,
      currentQuestIndex,
      inputValue
    } = this.state;

    const answer = answers[currentQuestIndex] || '';

    answers[currentQuestIndex] = inputValue || answer;

    return answers;
  }

  _showHint() {
    this.setState({
      hint: this._randomHint()
    });
  }

  _randomHint() {
    const { vocabularies, currentQuestIndex } = this.state;
    const { definitions } = vocabularies[currentQuestIndex];

    return definitions[Math.floor(Math.random() * definitions.length)];
  }

  _onChangeInput(e) {
    this.setState({ inputValue: e.target.value });
  }

  render() {
    const {
      vocabularies,
      answers,
      currentQuestIndex,
      inputValue,
      finish,
      hint
    } = this.state;

    if (!vocabularies.length) {
      return <Spinner />;
    }

    const { audio } = vocabularies[currentQuestIndex];

    let resultContent;

    if (finish) {
      let mark = 0;
      const trContent = [];

      vocabularies.forEach((vocabulary, index) => {
        const { word } = vocabulary;
        const answer = answers[index];

        let check = false;

        if (word.includes('/')) {
          check = word.split('/').some(item => item.trim().toLowerCase() === answer.toLowerCase());
        } else {
          check = answer.toLowerCase() === word.toLowerCase();
        }

        if (check) {
          mark += 1;
        }

        trContent.push(
          <tr key={index} className={check ? 'success' : 'danger'}>
            <td>{index + 1}</td>
            <td>{word}</td>
            <td>{answer}</td>
            <td>{ check ? <i className="fa fa-check" /> : <i className={`${check ? 'text-success' : 'text-danger'} fa fa-times`} /> }</td>
          </tr>
        );
      });

      const rs = (mark / vocabularies.length) * 100;
      const rate = Object.keys(RATE).find(item => {
        const { min, max } = RATE[item];

        return rs >= min && rs <= max;
      });

      resultContent = (
        <div className="ListenAndWrite-result">
          <div className="ListenAndWrite-result-mark">{mark} / {vocabularies.length}</div>
          <div className={`ListenAndWrite-result-rate ListenAndWrite-result-rate--${rate}`}>{rate}!!!</div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>No</th>
                <th>Question</th>
                <th>Answer</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {trContent}
            </tbody>
          </table>
          <div className="ListenAndWrite-controls">
            <button type="button" className="btn-primary" onClick={() => this._rePlay()}>Play again</button>
          </div>
        </div>
      );
    }

    const questionContent = (
      <div className="ListenAndWrite-question">
        <div className="ListenAndWrite-main">
          <div className="ListenAndWrite-title">Quest {currentQuestIndex + 1}</div>
          <div className="ListenAndWrite-hint">
            { hint ? <div><i className="fa fa-info-circle" /> {hint}</div> : null }
          </div>
          <div className="ListenAndWrite-content">
            <div className="ListenAndWrite-audio"><Audio key={currentQuestIndex} src={audio} /></div>
            <div className="ListenAndWrite-text">
              <input type="text" placeholder="Your answer..." value={inputValue} onChange={(e) => this._onChangeInput(e)} />
            </div>
          </div>
        </div>
        <div className="ListenAndWrite-controls">
          <button className="ListenAndWrite-hintIcon" onClick={() => this._showHint()}><i className="fa fa-lightbulb-o" /></button>
          { currentQuestIndex ? <button type="button" className="btn-default" onClick={() => this._onBack()}>Back</button> : null }
          { currentQuestIndex === vocabularies.length - 1 ? <button type="button" className="btn-success" onClick={() => this._onFinish()}>Finish</button> : <button type="button" className="btn-info" onClick={() => this._onNext()}>Next</button> }
        </div>
      </div>
    );

    return (
      <div className="ListenAndWrite">
        {
          finish ? resultContent : questionContent
        }
      </div>
    );
  }
}

export default ListenAndWrite;
