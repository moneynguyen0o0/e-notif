import _ from 'lodash';
import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { Checkbox, CheckboxGroup } from 'react-checkbox-group';
import { reduxForm, propTypes as reduxFormPropTypes, Field, FieldArray, SubmissionError } from 'redux-form';

class VocabularyForm extends Component {
  static propTypes = {
    POS: PropTypes.array,
    saveVocabulary: PropTypes.func.isRequired,
    ...reduxFormPropTypes
  }

  state = {
    pos: this.props.initialValues.pos
  }

  _validate = (vocabulary) => {
    const {
      word,
      pronunciation,
      definitions,
      examples
    } = vocabulary;

    const errors = {};

    if (!word) {
      errors.word = 'Required';
    }

    if (!pronunciation) {
      errors.pronunciation = 'Required';
    }

    const definitionErrors = [];

    definitions.forEach((definition, index) => {
      if (!definition) {
        definitionErrors[index] = 'Required';
      }
    });

    if (definitionErrors.length) {
      errors.definitions = definitionErrors;
    }

    const exampleErrors = [];

    examples.forEach((example, index) => {
      if (!example) {
        exampleErrors[index] = 'Required';
      }
    });

    if (exampleErrors.length) {
      errors.examples = exampleErrors;
    }

    if (!_.isEmpty(errors)) {
      throw new SubmissionError(errors);
    } else {
      vocabulary.pos = this.state.pos;
      this.props.saveVocabulary(vocabulary);
    }
  }

  _renderField = ({ input, label, type, meta: { touched, error } }) => {
    const groupClassnames = classnames(
      'form-group',
      { 'form-error': touched && error }
    );

    return (
      <div className={groupClassnames}>
        <label htmlFor={input.name}>{label}</label>
        <div>
          <input {...input} placeholder={label} type={type} />
          {touched && error && <span>{error}</span>}
        </div>
      </div>
    );
  }

  _renderFieldArrays = (fields, bntText, lable) => {
    return (
      <div>
        {fields.map((field, index) =>
          <div key={index} className="form-group-wrapper">
            <Field
              name={field}
              type="text"
              component={this._renderField}
              label={`${lable} #${index + 1}`}
            />
            { index !== 0 ?
              <span className="CancelIcon" onClick={() => fields.remove(index)}>
                <i className="fa fa-times" /></span> : null
            }
          </div>
        )}
        <div>
          <button type="button" className="btn-info" onClick={() => fields.push()}>{bntText}</button>
        </div>
      </div>
    );
  }

  _renderDefinitions = ({ fields }) => {
    return this._renderFieldArrays(fields, '+', 'Definition');
  }

  _renderExamples = ({ fields }) => {
    return this._renderFieldArrays(fields, '+', 'Example');
  }

  _posChanged = (values) => {
    if (values.length) {
      this.setState({
        pos: values
      });
    }
  }

  render() {
    const { POS, handleSubmit, submitting, initialValues } = this.props;
    const { _id } = initialValues;

    const { pos } = this.state;

    const posContent = (
      <CheckboxGroup
        name="pos"
        value={pos}
        onChange={this._posChanged}>
        {
          POS.map((item, index) => {
            return (
              <div key={index}><Checkbox value={item} /> {item}</div>
            );
          })
        }
      </CheckboxGroup>
    );

    return (
      <form className="VocabularyForm" onSubmit={handleSubmit(this._validate)}>
        <div className="form-body">
          {_id && <input name="_id" type="hidden" value={_id} />}
          <Field name="word" type="text" component={this._renderField} label="Word" />
          <Field name="audio" type="url" component={this._renderField} label="Audio" />
          <Field name="pronunciation" type="text" component={this._renderField} label="Pronunciation" />
          <div>
            <label htmlFor="pos">P.O.S</label>
            <div className="form-group">
              {posContent}
            </div>
          </div>
          <FieldArray name="definitions" component={this._renderDefinitions} />
          <FieldArray name="examples" component={this._renderExamples} />
        </div>
        <div className="form-footer form-footer--right">
          <button type="submit" disabled={submitting} className="btn-success">SAVE</button>
        </div>
      </form>
    );
  }
}

class VocabularyFormWrapper extends Component {
  static propTypes = {
    POS: PropTypes.array,
    vocabulary: PropTypes.object,
    saveVocabulary: PropTypes.func.isRequired
  }

  render() {
    const { vocabulary, saveVocabulary, POS } = this.props;

    const newVocabulary = {
      pos: [POS[0]],
      definitions: [null],
      examples: [null]
    };

    let initialVocabulary = newVocabulary;

    if (vocabulary) {
      initialVocabulary = vocabulary;
    }

    const VocabularyFormContainer = reduxForm({
      form: 'vocabularyForm',  // a unique identifier for this form
      initialValues: initialVocabulary,
      saveVocabulary,
      POS
    })(VocabularyForm);

    return (
      <VocabularyFormContainer />
    );
  }
}

export default VocabularyFormWrapper;
