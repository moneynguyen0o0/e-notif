import _ from 'lodash';
import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { reduxForm, propTypes as reduxFormPropTypes, Field, SubmissionError } from 'redux-form';

class PhraseForm extends Component {
  static propTypes = {
    savePhrase: PropTypes.func.isRequired,
    ...reduxFormPropTypes
  }

  _validate = (phrase) => {
    const {
      content
    } = phrase;

    const errors = {};

    if (!content) {
      errors.content = 'Required';
    }

    if (!_.isEmpty(errors)) {
      throw new SubmissionError(errors);
    } else {
      this.props.savePhrase(phrase);
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

  render() {
    const { handleSubmit, submitting, initialValues } = this.props;
    const { _id } = initialValues;

    return (
      <form onSubmit={handleSubmit(this._validate)}>
        <div className="form-body">
          {_id && <input name="_id" type="hidden" value={_id} />}
          <Field name="content" type="text" component={this._renderField} label="Content" />
          <div>
            <label htmlFor="note">Notes</label>
            <div>
              <Field name="note" component="textarea" />
            </div>
          </div>
        </div>
        <div className="form-footer form-footer--right">
          <button type="submit" disabled={submitting} className="btn-success">SAVE</button>
        </div>
      </form>
    );
  }
}

class PhraseFormWrapper extends Component {
  static propTypes = {
    phrase: PropTypes.object,
    savePhrase: PropTypes.func.isRequired
  }

  render() {
    const { phrase = {}, savePhrase } = this.props;

    const PhraseFormContainer = reduxForm({
      form: 'phraseForm',  // a unique identifier for this form
      initialValues: phrase,
      savePhrase
    })(PhraseForm);

    return (
      <PhraseFormContainer />
    );
  }
}

export default PhraseFormWrapper;
