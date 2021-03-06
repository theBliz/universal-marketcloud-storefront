import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import TextInput from './TextInput';
import CircularProgress from 'material-ui/CircularProgress';

import registrationValidation from './registrationValidation';
import * as registerActions from 'redux/modules/register';
// import styles from './RegistrationForm.scss';

// function asyncValidate(data, dispatch, { isValidEmail }) {
//   if (!data.email) {
//     return Promise.resolve({});
//   }
//   return isValidEmail(data.email);
// }
@connect(state => ({ state: state.register }),
  dispatch => bindActionCreators(registerActions, dispatch)
)
@reduxForm({
  form: 'registration',
  fields: ['firstName', 'lastName', 'email', 'password', 'passwordRepeat'],
  validate: registrationValidation
  // asyncValidate,
  // asyncBlurFields: ['email']
})
export default class RegistrationForm extends Component {
  static propTypes = {
    state: PropTypes.object,
    active: PropTypes.string,
    asyncValidating: PropTypes.bool.isRequired,
    fields: PropTypes.object.isRequired,
    dirty: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired
  }

  render() {
    const {
      asyncValidating,
      fields: { firstName, lastName, email, password, passwordRepeat },
      handleSubmit,
      resetForm,
      state
    } = this.props;

    // TODO API is still not so clear about the errors, so this needs more work
    const emailError = (state.errors.some(error => error.type === 'BadRequest')) ? 'Email is already in use.' : '';

    return (
      <form>
        <TextInput id="first-name" hintText="First name" field={firstName} /><br />
        <TextInput id="last-name" hintText="Last name" field={lastName} />
        <br />
        <TextInput id="email" hintText="E-Mail" field={email} errorText={emailError} />
        {asyncValidating ? <CircularProgress size={0.5} /> : null}
        <br />
        <TextInput id="password" hintText="Password" field={password} type="password" /><br />
        <TextInput id="password-again" hintText="Repeat password" field={passwordRepeat} type="password" />
        <br />
        <RaisedButton label="Register" primary onTouchTap={handleSubmit} />
        <RaisedButton label="Clear form" secondary onTouchTap={resetForm} />
      </form>
    );
  }
}
