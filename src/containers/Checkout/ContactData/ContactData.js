import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import classes from './ContactData.css'
import service from '../../../services'
import { elementType } from 'prop-types'

class FormElement {
  constructor(
    name = '',
    value = '',
    type = 'text',
    elementType = 'input',
    placeholder = '',
    options = null
  ) {
    this.elementType = elementType
    this.value = value
    this.elementConfig = {
      type,
      placeholder,
      name,
      options,
    }
  }
}

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
      loading: false,
      orderForm: {
        deliveryMethod: new FormElement(
          'deliveryMethod',
          'fastest',
          '',
          'select',
          'Delivery Method',
          [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ]
        ),
        email: new FormElement('email', '', 'email', 'input', 'Your E-mail'),
        name: new FormElement('name', '', 'text', 'input', 'Your Name'),
        street: new FormElement('street', '', 'text', 'input', 'Street'),
        zipCode: new FormElement(
          'postal',
          '',
          'number',
          'input',
          'Postal Code'
        ),
      },
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
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData,
    }

    service
      .createOrder(order)
      .then((response) => {
        console.log(response)
        this.props.history.push('/')
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        this.setState({ loading: false })
      })
  }

  inputChangedHandler = (event, formElementKey) => {
    const updatedOrderForm = { ...this.state.orderForm }
    const updatedFormElement = { ...updatedOrderForm[formElementKey] }
    updatedFormElement.value = event.target.value
    updatedOrderForm[formElementKey] = updatedFormElement
    this.setState({ orderForm: updatedOrderForm })
  }

  render() {
    const formElements = []
    for (let key in this.state.orderForm) {
      formElements.push({
        id: key,
        config: this.state.orderForm[key],
      })
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElements.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
          />
        ))}

        <Button btnType="Success">ORDER</Button>
      </form>
    )
    if (this.state.loading) {
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

export default ContactData
