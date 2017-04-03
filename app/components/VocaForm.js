import React, { Component } from 'react';
import { reduxForm, propTypes as reduxFormPropTypes, Field, FieldArray } from 'redux-form';
import { saveVoca } from '../utils/api';

const validate = (voca) => {
  const {
    word,
    pronunciation,
    definitions,
    examples
  } = voca;

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

  return errors;
};

class VocaForm extends Component {
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
    const { handleSubmit, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <Field name="word" type="text" component={this._renderField} label="Word" />
        <Field name="pronunciation" type="text" component={this._renderField} label="Pronunciation" />
        <div>
          <label htmlFor="pos">P O S</label>
          <div>
            <Field name="pos" component="select">
              <option value="noun">Noun</option>
              <option value="verb">Verd</option>
              <option value="adjective">Adjective</option>
            </Field>
          </div>
          <FieldArray name="definitions" component={this._renderDefinitions} />
          <FieldArray name="examples" component={this._renderExamples} />
        </div>
        <div>
          <button type="submit" disabled={submitting}>Add new</button>
        </div>
      </form>
    );
  }
}

const ComponentContainer = reduxForm({
  form: 'vocaForm',  // a unique identifier for this form
  initialValues: {
    pos: 'noun',
    definitions: [null],
    examples: [null]
  },
  validate
})(VocaForm);

class VocaFormWrapper extends Component {
  _submit = (voca) => {
    saveVoca({ voca });
  }

  render() {
    return (
      <ComponentContainer onSubmit={this._submit} />
    );
  }
}

export default VocaFormWrapper;