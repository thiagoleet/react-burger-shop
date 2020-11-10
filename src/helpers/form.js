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

  build() {
    return this.formElement
  }
}
