import React, { Component, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import './index.css'
import Layout from './containers/Layout/Layout'
import Spinner from './components/UI/Spinner/Spinner'

const BurgerBuilder = React.lazy(() =>
  import('./containers/BurgerBuilder/BurgerBuilder')
)
const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'))

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Suspense fallback={<Spinner />}>
            <Switch>
              <Route path="/" exact component={BurgerBuilder} />
              <Route path="/checkout" component={Checkout} />
            </Switch>
          </Suspense>
        </Layout>
      </div>
    )
  }
}

export default App
