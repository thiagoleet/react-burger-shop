import React, { Component } from 'react'
import {
  FormElementBuilder,
  setupForm,
  inputChangedHelper,
} from '../../helpers/form'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.css'

class Auth extends Component {
  constructor(props) {
    super(props)

    this.state = {
      formIsValid: false,
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
        <form>
          {form}
          <Button btnType="Success" disabled={!this.state.formIsValid}>
            SUBMIT
          </Button>
        </form>
      </div>
    )
  }
}

export default Auth
