import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'

import Signup from './pages/SignUp'
import BathMap from './pages/BathMap'
import Profile from './pages/Profile'

import user from './reducers/user'
import bath from './reducers/bath'

const reducer = combineReducers({
  user: user.reducer,
  bath: bath.reducer
})

const store = configureStore({ reducer })

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store} >
        <Switch>
          <Route exact path='/signup'>
            <Signup />
          </Route>
          <Route exact path='/bathmap'>
            <BathMap />
          </Route>
          <Route exact path='/profile'>
            <Profile />
          </Route>
        </Switch>
      </Provider>
    </BrowserRouter>
  );
}

export default App;

