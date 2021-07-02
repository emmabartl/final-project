import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'

import { API_URL } from '../reusable/urls'
import HeroVideo from '../components/HeroVideo'

import user from '../reducers/user'

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('') 
  const [password, setPassword] = useState('')

  const accessToken = useSelector(store => store.user.accessToken)

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
    <>
      <HeroVideo /> 
      {!accessToken && <section className="login-container">
        <h1 className="login-form-header">Login to your account</h1>
        <form className="login-form-container" onSubmit={onFormSubmit}>
          <label htmlFor="nameInput" className="input-label">Username  
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
          <label htmlFor="passwordInput" className="input-label">Password
            <input
              id="passwordInput"
              className="input-field"
              type="password"
              value={password}
              onChange={onPasswordChange}
              placeholder="Password"
              required
            />
          </label>
          <div className="button-container">
            <button type="submit" className="login-form-button">Login</button>
          </div>
        </form>
        <div className="create-account-text">
          <p>Don't have an account yet?</p>
          <Link to='/register'>
            <p>Create account</p>
          </Link>
        </div>
      </section>}
    </>
  )
}

export default Login
