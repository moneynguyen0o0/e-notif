import _ from 'lodash';
import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { reduxForm, propTypes as reduxFormPropTypes, Field, FieldArray, SubmissionError } from 'redux-form';

// TODO: fetch from db
const POS = {
  noun: 'Noun',
  verb: 'Verd',
  adjective: 'Adjective'
};

class VocabularyForm extends Component {
  static propTypes = {
    saveVocabulary: PropTypes.func.isRequired,
    ...reduxFormPropTypes
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
          <div key={index}>
            <Field
              name={field}
              type="text"
              component={this._renderField}
              label={`${lable} #${index + 1}`}
            />
            { index !== 0 ?
              <button
                type="button"
                className="btn-danger"
                onClick={() => fields.remove(index)}
              >x</button> : null
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

  render() {
    const { handleSubmit, submitting, initialValues } = this.props;
    const { id, pos } = initialValues;

    const posContent = Object.keys(POS).map((item, index) => {
      return (
        <div key={index}>
          <span>{POS[item]}</span><Field name="pos" component="input" type="checkbox" selected={item === pos} />
        </div>
      );
    });

    return (
      <form onSubmit={handleSubmit(this._validate)}>
        <div className="form-body">
          {id && <input name="id" type="hidden" value={initialValues.id} />}
          <Field name="word" type="text" component={this._renderField} label="Word" />
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
    vocabulary: PropTypes.object,
    saveVocabulary: PropTypes.func.isRequired,
  }

  render() {
    const { vocabulary, saveVocabulary } = this.props;

    const newVocabulary = {
      pos: 'noun',
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
      saveVocabulary
    })(VocabularyForm);

    return (
      <VocabularyFormContainer />
    );
  }
}

export default VocabularyFormWrapper;
