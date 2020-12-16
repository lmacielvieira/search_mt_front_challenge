import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {KEYS} from '../../settings'
import Error from '../ErrorPage'
import KeywordPage from '../KeywordPage'
import NotFound from '../NotFoundPage'

import './style.less'

export default class Manager extends React.Component {
  _pageName = 'router-page'

  constructor(props) {
    super(props)

    this.route = null
    this.state = {
      error: false
    }

    window.onbeforeunload = () => {
      window.scrollTo(0, 0)
    }
  }

  componentDidCatch() {
    this.setState({error: true})
  }

  // -------------------------------------------------------------------------//
  // Requests
  // -------------------------------------------------------------------------//

  // -------------------------------------------------------------------------//
  // Event Handlers
  // -------------------------------------------------------------------------//

  // -------------------------------------------------------------------------//
  // Render
  // -------------------------------------------------------------------------//

  render() {
    const {error} = this.state

    return (
      <Router
        ref={(input) => {
          this.route = input
        }}>
        <div className={`${this._pageName}`}>
          {error ? (
            <Route component={Error} />
          ) : (
            <Switch>
              <Route exact path={KEYS.pageKeys.index} component={KeywordPage} />
              <Route component={NotFound} />
            </Switch>
          )}
        </div>
      </Router>
    )
  }
}
