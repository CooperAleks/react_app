import 'babel-polyfill'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/app'
import allReducers from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const middleware = []
const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
)
const store = createStore(allReducers, enhancer)
const root = document.getElementById('root')

ReactDOM.render(
  <Provider store={store}>
	<App />
  </Provider>,
  root
);