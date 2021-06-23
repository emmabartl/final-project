import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'

import Header from './components/Header'
import Navbar from './components/Navbar'
import Register from './pages/Register'
import Login from './pages/Login'
import BathMap from './pages/BathMap'
import Profile from './pages/Profile'
import Footer from './components/Footer'

import user from './reducers/user'
import bath from './reducers/bath'

const reducer = combineReducers({
  user: user.reducer,
  bath: bath.reducer
})

const store = configureStore({ reducer })

// store.subscribe(() => {
//   localStorage.setItem(
//     'user',
//     JSON.stringify({
//       username: store.getState().user.username,
//       userId: store.getState().user.userId,
//       accessToken: store.getState().user.accessToken
//     })
//   )
// })

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store} >
        <Header />
        <Navbar />
        <Switch>
          <Route exact path='/'>
            <Login />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/bathmap'>
            <BathMap />
          </Route>
          <Route path='/profile'>
            <Profile />
          </Route>
        </Switch>
        <Footer />
      </Provider>
    </BrowserRouter>
  );
}

export default App

