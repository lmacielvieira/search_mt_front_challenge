import React from 'react'
import ReactDOM from 'react-dom'
import {ConnectedRouter} from 'connected-react-router'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import moment from 'moment'
import {Spin} from 'antd'
import * as Sentry from '@sentry/react'
import {Integrations} from '@sentry/tracing'
import {store, persistor, history} from './redux/store'
import * as serviceWorker from './serviceWorker'
import Manager from './pages/Manager'
import './styles/globalStyle.less'
import 'moment/locale/pt-br'

Sentry.init({
  dsn:
    'https://c2d400bf88d04e92ab234bf70ec71e82@o466555.ingest.sentry.io/5480963',
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0
})

moment.locale('en-us')

const reduxLoading = (
  <div>
    <Spin size="large" />
  </div>
)

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={reduxLoading} persistor={persistor}>
      <ConnectedRouter history={history}>
        <Manager />
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)

// expose store when run in Cypress
if (window.Cypress) {
  window.store = store
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
