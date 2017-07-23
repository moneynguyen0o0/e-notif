import React, { Component } from 'react';
import { getRandomVocabularies } from '../../utils/API';
import Audio from '../media/Audio';
import Spinner from '../icons/Spinner';

const defaultState = {
  vocabularies: [],
  answers: [],
  currentQuestIndex: 0,
  inputValue: '',
  finish: false
};

class ListenAndType extends Component {
  state = {
    ...defaultState
  }

  componentDidMount() {
    this._getVocabularies();
  }

  _getVocabularies() {
    getRandomVocabularies().then((vocabularies) => {
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
      inputValue: nextAnswer
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
      inputValue: prevAnswer
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

  _onChangeInput(e) {
    this.setState({ inputValue: e.target.value });
  }

  render() {
    const {
      vocabularies,
      answers,
      currentQuestIndex,
      inputValue,
      finish
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

        const check = answer.toLowerCase() === word.toLowerCase();

        if (check) {
          mark += 1;
        }

        trContent.push(
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{word}</td>
            <td>{answer}</td>
            <td>{ check ? <i className="fa fa-check" /> : <i className="fa fa-times" /> }</td>
          </tr>
        );
      });

      resultContent = (
        <div className="ListenAndType-result">
          <div>{mark} / {vocabularies.length}</div>
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
          <div className="ListenAndType-control">
            <button type="button" className="btn-info" onClick={() => this._rePlay()}>Play again</button>
          </div>
        </div>
      );
    }

    return (
      <div className="ListenAndType">
        {
          finish ? resultContent : <div className="ListenAndType-question">
            <div className="ListenAndType-main">
              <div>Question {currentQuestIndex + 1}</div>
              <div className="ListenAndType-audio"><Audio key={currentQuestIndex} src={audio} /></div>
              <div className="ListenAndType-input">
                <input type="text" placeholder="Your answer..." value={inputValue} onChange={(e) => this._onChangeInput(e)} />
              </div>
            </div>
            <div className="ListenAndType-control">
              { currentQuestIndex ? <button type="button" className="btn-info" onClick={() => this._onBack()}>Back</button> : null }
              {
                currentQuestIndex === vocabularies.length - 1 ? <button type="button" className="btn-info" onClick={() => this._onFinish()}>Finish</button> : <button type="button" className="btn-info" onClick={() => this._onNext()}>Next</button>
              }
            </div>
          </div>
        }
      </div>
    );
  }
}

export default ListenAndType;
