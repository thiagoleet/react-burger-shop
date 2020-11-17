import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter } from 'react-router-dom'
import burgerBuilderReducer from './store/reducers/burgerBuilder'
import App from './App'
import './index.css'

// REDUX DEVTOOLS
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  burgerBuilderReducer,
  composeEnhancers(applyMiddleware(thunk))
)

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'))
registerServiceWorker()
