import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'

import { API_URL } from '../reusable/urls'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import HeroVideo from '../components/HeroVideo'

import user, { loginRegister } from '../reducers/user'

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('') 
  const [password, setPassword] = useState('')
  // const [mode, setMode] = useState(null)

  const accessToken = useSelector(store => store.user.accessToken)
  const errors = useSelector(store => store.user.errors)

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (accessToken) {
      history.push('/bathmap')
    }
  }, [accessToken, history])

  const onUsernameOrEmailChange = (event) => {
    setUsernameOrEmail(event.target.value)
  }

  const onPasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const onFormSubmit = (event) => {
    event.preventDefault()

    // dispatch(loginRegister(usernameOrEmail, password))

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ usernameOrEmail, password })
    }

    fetch(API_URL('login'), options)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          batch(() => {
            // dispatch(user.actions.setUserId(data.userId))
            dispatch(user.actions.setUsername(data.username))
            dispatch(user.actions.setAccessToken(data.accessToken))
            dispatch(user.actions.setErrors(null))

            localStorage.setItem('user', JSON.stringify({
              username: data.username,
              accessToken: data.accessToken
            }))
          })
        } else {
          dispatch(user.actions.setErrors(data))
          setUsernameOrEmail("")
          setPassword("")
        }
      })
  }



  return (
    <section className="login-container">
      <Header />
      <Navbar />
      <HeroVideo /> 
      {/* //Header containing navbar, hamburger? drawer navigation? */}
      <h1>Do you wanna dive in?</h1>
      <form className="login-form" onSubmit={onFormSubmit}>
        <h1 className="form-header">login</h1>
       
        <label htmlFor="nameInput" className="input-wrapper">
          <p className="input-label">Username</p>
          <input
            id="nameInput"
            className="input-field"
            type="text"
            value={usernameOrEmail}
            onChange={onUsernameOrEmailChange}
            placeholder="Username or email"
            required
          />
        </label>
        <label htmlFor="passwordInput" className="input-wrapper">
          <p className="input-label">Password</p>
          <input
            id="passwordInput"
            className="input-box"
            type="password"
            value={password}
            onChange={onPasswordChange}
            placeholder="Password"
            required
          />
        </label>
        <div className="button-container">
          <button type="submit" className="form-button">Login</button>
        </div>
      </form>
      {/* <LogIn /> //create login form here */} 
      <p>Don't have an account yet?</p>
      <Link to='/register'>
        <p>Create account</p>
      </Link>
    </section>
  )
}

export default Login