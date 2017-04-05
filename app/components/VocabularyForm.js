import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { reduxForm, propTypes as reduxFormPropTypes, Field, FieldArray, SubmissionError } from 'redux-form';
import { saveVoca } from '../utils/api';

// TODO: fetch from db
const POS = {
  noun: 'Noun',
  verb: 'Verd',
  adjective: 'Adjective'
};

const validate = (vocabulary) => {
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
    saveVoca({ vocabulary });
  }
};

class VocabularyForm extends Component {
  static propTypes = {
    ...reduxFormPropTypes
  }

  _renderField = ({ input, label, type, meta: { touched, error } }) => {
    return (
      <div>
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
        <div>
          <button type="button" onClick={() => fields.push()}>{bntText}</button>
        </div>
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
                onClick={() => fields.remove(index)}
              >x</button> : null
            }
          </div>
        )}
      </div>
    );
  }

  _renderDefinitions = ({ fields }) => {
    return this._renderFieldArrays(fields, 'Add definition', 'Definition');
  }

  _renderExamples = ({ fields }) => {
    return this._renderFieldArrays(fields, 'Add example', 'Example');
  }

  render() {
    const { handleSubmit, submitting, initialValues } = this.props;
    const { id, pos } = initialValues;

    const posPptions = Object.keys(POS).map((item, index) => {
      return (
        <option key={index} value={item} selected={item === pos}>{POS[item]}</option>
      );
    });

    return (
      <form onSubmit={handleSubmit(validate)}>
        {id && <input name="id" type="hidden" value={initialValues.id} />}
        <Field name="word" type="text" component={this._renderField} label="Word" />
        <Field name="pronunciation" type="text" component={this._renderField} label="Pronunciation" />
        <div>
          <label htmlFor="pos">P O S</label>
          <div>
            <Field name="pos" component="select">
              {posPptions}
            </Field>
          </div>
          <FieldArray name="definitions" component={this._renderDefinitions} />
          <FieldArray name="examples" component={this._renderExamples} />
        </div>
        <div>
          <button type="submit" disabled={submitting}>Save</button>
        </div>
      </form>
    );
  }
}

class VocabularyFormWrapper extends Component {
  static propTypes = {
    data: PropTypes.object
  }

  render() {
    const { data } = this.props;

    const newVocabulary = {
      pos: 'noun',
      definitions: [null],
      examples: [null]
    };

    let initialVocabulary = newVocabulary;

    if (data) {
      initialVocabulary = data;
    }

    const VocabularyFormContainer = reduxForm({
      form: 'vocabularyForm',  // a unique identifier for this form
      initialValues: initialVocabulary
    })(VocabularyForm);

    return (
      <VocabularyFormContainer />
    );
  }
}

export default VocabularyFormWrapper;
