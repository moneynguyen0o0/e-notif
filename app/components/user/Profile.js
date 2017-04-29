import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { reduxForm, propTypes as reduxFormPropTypes, Field } from 'redux-form';
import { update as updateProfile } from '../../actions/users';
import Spinner from '../icons/Spinner';

const GENDER = ['male', 'female'];

const validate = (user) => {
  const errors = {};

  if (!user.firstname) {
    errors.firstname = 'Required';
  } else if (user.firstname.length > 15) {
    errors.firstname = 'Must be 15 characters or less';
  }

  if (!user.lastname) {
    errors.lastname = 'Required';
  } else if (user.lastname.length > 15) {
    errors.lastname = 'Must be 15 characters or less';
  }

  if (!moment().subtract('years', 13).isAfter(moment(user.dob))) {
    errors.dob = 'Date of birth must be greater than 13';
  }

  return errors;
};

class ProfileForm extends Component {
  static propTypes = {
    ...reduxFormPropTypes
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

    return (
      <form onSubmit={handleSubmit}>
        <input name="_id" type="hidden" value={initialValues._id} />
        <Field name="firstname" type="text" component={this._renderField} label="First name" />
        <Field name="lastname" type="text" component={this._renderField} label="Last name" />
        <Field name="dob" type="date" component={this._renderField} label="Date of birth" />
        <div>
          <label htmlFor="pos">Gender</label>
          <div className="form-group">
            <Field name="gender" component="select">
              {
                GENDER.map((item, index) => {
                  return <option key={index} value={item}>{item}</option>;
                })
              }
            </Field>
          </div>
        </div>
        <div className="Profile-footer">
          <button type="submit" className="btn-info" disabled={submitting}>Save changes</button>
        </div>
      </form>
    );
  }
}

class ProfileWrapper extends Component {
  static propTypes = {
    user: PropTypes.object,
    updateProfile: PropTypes.func.isRequired
  }

  _change = (user) => {
    this.props.updateProfile(user);
  }

  render() {
    const {
      user: {
        data: user,
        isWaiting,
        message
      }
    } = this.props;

    if (isWaiting) {
      return <Spinner />;
    }

    const {
      gender,
      dob
    } = user;

    if (!gender) {
      user.gender = GENDER[0];
    }

    if (dob) {
      user.dob = moment(dob).format('YYYY-MM-DD');
    }

    const ProfileContainer = reduxForm({
      form: 'profileForm',
      validate,
      initialValues: user
    })(ProfileForm);

    return (
      <div className="Profile">
        <h3 className="Profile-message">{message}</h3>
        <ProfileContainer onSubmit={this._change} />
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return { user };
};

export default connect(mapStateToProps, { updateProfile })(ProfileWrapper);
