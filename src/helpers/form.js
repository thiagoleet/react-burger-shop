export class FormElement {
  constructor() {
    this.elementType = 'input'
    this.value = ''
    this.elementConfig = {
      type: 'text',
      placeholder: undefined,
      name: undefined,
      options: [],
    }
    this.validation = null
    this.valid = false
    this.touched = false
    this.errorMessage = ''
  }
}

export class FormElementBuilder {
  constructor() {
    this.formElement = new FormElement()
  }

  setElementType(elementType) {
    this.formElement.elementType = elementType
    return this
  }

  addValue(value) {
    this.formElement.value = value
    return this
  }

  addConfig({ type, placeholder, name, options }) {
    this.formElement.elementConfig = { type, placeholder, name, options }
    return this
  }

  addValidation(validation) {
    this.formElement.validation = validation
    return this
  }

  isValid() {
    this.formElement.valid = true
    return this
  }

  isTouched() {
    this.formElement.touched = true
    return this
  }

  build() {
    return this.formElement
  }
}

export const setupForm = (formElements, controls) => {
  for (let key in controls) {
    formElements.push({
      id: key,
      config: controls[key],
    })
  }
  return formElements
}

export const checkValidity = (value, rules) => {
  let isValid = true
  if (rules && rules.required) {
    isValid = value.trim() !== '' && isValid
  }
  if (rules && rules.minLength) {
    isValid = value.length >= rules.minLength && isValid
  }
  if (rules && rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid
  }
  return isValid
}

export const inputChangedHelper = (event, formElementKey, controls) => {
  const updatedOrderForm = { ...controls }
  const updatedFormElement = { ...updatedOrderForm[formElementKey] }
  updatedFormElement.value = event.target.value
  updatedFormElement.valid = checkValidity(
    event.target.value,
    updatedFormElement.validation
  )
  updatedFormElement.touched = true
  updatedOrderForm[formElementKey] = updatedFormElement

  let formIsValid = true
  for (let inputIdentifier in updatedOrderForm) {
    formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
  }

  return { updatedOrderForm, formIsValid }
}
