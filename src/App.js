import React, { Component, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import './index.css'
import Layout from './containers/Layout/Layout'
import Spinner from './components/UI/Spinner/Spinner'

const BurgerBuilder = React.lazy(() =>
  import('./containers/BurgerBuilder/BurgerBuilder')
)
const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'))
const Orders = React.lazy(() => import('./containers/Orders/Orders'))

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Suspense fallback={<Spinner />}>
            <Switch>
              <Route path="/checkout" component={Checkout} />
              <Route path="/orders" component={Orders} />
              <Route path="/" exact component={BurgerBuilder} />
            </Switch>
          </Suspense>
        </Layout>
      </div>
    )
  }
}

export default App
