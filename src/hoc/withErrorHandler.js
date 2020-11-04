import React, { Component } from 'react'
import Modal from '../components/UI/Modal/Modal'
import Aux from './aux-hoc'

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    constructor(props) {
      super(props)
      this.state = {
        error: null,
      }
      axios.interceptors.request.use((req) => {
        this.setState({ error: null })
        return req
      })

      axios.interceptors.response.use(
        (res) => res,
        (err) => {
          this.setState({ error: err })
        }
      )
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null })
    }

    render() {
      return (
        <Aux>
          <Modal
            modalClosed={this.errorConfirmedHandler}
            show={this.state.error}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      )
    }
  }
}

export default withErrorHandler
