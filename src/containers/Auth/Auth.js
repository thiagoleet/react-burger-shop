import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  FormElementBuilder,
  setupForm,
  inputChangedHelper,
} from '../../helpers/form'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.css'
import * as actions from '../../store/actions'

class Auth extends Component {
  constructor(props) {
    super(props)

    this.state = {
      formIsValid: false,
      isSignUp: true,
      controls: {
        email: new FormElementBuilder()
          .addConfig({
            type: 'email',
            name: 'email',
            placeholder: 'Mail Address',
          })
          .addValidation({ required: true, isEmail: true })
          .build(),
        password: new FormElementBuilder()
          .addConfig({
            type: 'password',
            name: 'password',
            placeholder: 'Password',
          })
          .addValidation({ required: true, minLength: 6 })
          .build(),
      },
    }
  }

  inputChangedHandler = (event, controlName) => {
    const { updatedOrderForm, formIsValid } = inputChangedHelper(
      event,
      controlName,
      this.state.controls
    )
    this.setState({ controls: updatedOrderForm, formIsValid: formIsValid })
  }

  submitHandler = (event) => {
    event.preventDefault()
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    )
  }

  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return { isSignUp: !prevState.isSignUp }
    })
  }

  render() {
    const formElementsArray = setupForm([], this.state.controls)
    const form = formElementsArray.map((formElement) => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        errorMessage={formElement.errorMessage}
      />
    ))

    return (
      <div className={classes.Auth}>
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success" disabled={!this.state.formIsValid}>
            SUBMIT
          </Button>
        </form>
        <Button clicked={this.switchAuthModeHandler} btnType="Danger">
          SWITCH TO {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}
        </Button>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
  }
}

export default connect(null, mapDispatchToProps)(Auth)
