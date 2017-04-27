import classnames from 'classnames';
import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { reduxForm, propTypes as reduxFormPropTypes, Field } from 'redux-form';
import { updateProfile } from '../utils/api';
import Spinner from './icons/Spinner';

const GENDER = ['male', 'female'];

const validate = (account) => {
  const errors = {};

  if (!account.firstname) {
    errors.firstname = 'Required';
  } else if (account.firstname.length > 15) {
    errors.firstname = 'Must be 15 characters or less';
  }

  if (!account.lastname) {
    errors.lastname = 'Required';
  } else if (account.lastname.length > 15) {
    errors.lastname = 'Must be 15 characters or less';
  }

  if (!moment().subtract('years', 13).isAfter(moment(account.dob))) {
    errors.dob = 'Date of birth must be greater than 13';
  }

  console.log(account);

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
    user: PropTypes.object
  }

  state = {
    isWaiting: true,
    message: ''
  }

  _change = (user) => {
    updateProfile(user).then(() => {
      this.setState({ user, message: 'Your profile changed success', isWaiting: false });
    })
    .catch(() => {
      this.setState({ message: 'Error! Something is wrong', isWaiting: false });
    });

    this.setState({ isWaiting: true });
  }

  render() {
    const {
      user
    } = this.props;

    const {
      isWaiting,
      message
    } = this.state;

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

const mapStateToProps = ({ vocabulary, user }) => {
  return { ...vocabulary, user };
};

export default connect(mapStateToProps)(ProfileWrapper);
