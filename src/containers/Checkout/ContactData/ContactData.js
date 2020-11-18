import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import axios from '../../../axios-orders'
import {
  FormElementBuilder,
  setupForm,
  inputChangedHelper,
} from '../../../helpers/form'
import withErrorHandler from '../../../hoc/withErrorHandler'
import * as actions from '../../../store/actions'
import classes from './ContactData.css'

class ContactData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      address: {
        street: '',
        postalCode: '',
      },
      orderForm: {
        deliveryMethod: new FormElementBuilder()
          .setElementType('select')
          .addConfig({
            name: 'deliveryMethod',
            options: [
              { value: 'fastest', displayValue: 'Fastest' },
              { value: 'cheapest', displayValue: 'Cheapest' },
            ],
          })
          .addValue('fastest')
          .build(),

        email: new FormElementBuilder()
          .addConfig({
            type: 'email',
            name: 'email',
            placeholder: 'Your E-mail',
          })
          .addValidation({ required: true })
          .build(),

        name: new FormElementBuilder()
          .addConfig({
            name: 'name',
            type: 'text',
            placeholder: 'Your Name',
          })
          .addValidation({ required: true })
          .build(),

        street: new FormElementBuilder()
          .addConfig({
            name: 'street',
            type: 'text',
            placeholder: 'Street',
          })
          .addValidation({ required: true })
          .build(),
        zipCode: new FormElementBuilder()
          .addConfig({
            name: 'postal',
            type: 'number',
            placeholder: 'Postal Code',
          })
          .addValidation({ required: true, minLength: 5, maxLength: 5 })
          .build(),
      },
      formIsValid: false,
    }
  }

  orderHandler = (event) => {
    event.preventDefault()
    const formData = {}
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
    }

    this.props.onOrderBurger(order)
  }

  inputChangedHandler = (event, formElementKey) => {
    const { updatedOrderForm, formIsValid } = inputChangedHelper(
      event,
      formElementKey,
      this.state.orderForm
    )
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid })
  }

  render() {
    const formElements = setupForm([], this.state.order)

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElements.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
          />
        ))}

        <Button btnType="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    )
    if (this.props.loading) {
      form = <Spinner />
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios))
